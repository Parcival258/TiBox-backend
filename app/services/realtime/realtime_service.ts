import Alert from '#models/alert'
import RealtimeTokenService from '#services/realtime/realtime_token_service'
import env from '#start/env'
import type { Server as NodeHttpServer } from 'node:http'
import { Server, type Socket } from 'socket.io'

type AlertEvent =
  | 'alerts:assigned'
  | 'alerts:created'
  | 'alerts:dismissed'
  | 'alerts:note_added'
  | 'alerts:resolved'
  | 'alerts:updated'

type RealtimeUser = {
  canManageAlerts: boolean
  permissions: string[]
  roleSlug?: string | null
  userId: string
}

type AlertPayload = {
  alert: Alert
  event: AlertEvent
}

const userRoom = (userId: string) => `user:${userId}`
const alertsManagersRoom = 'alerts:managers'
const alertsTechniciansRoom = 'alerts:technicians'

class RealtimeService {
  private io: Server | null = null
  private tokenService = new RealtimeTokenService()

  boot(server: NodeHttpServer) {
    if (this.io) {
      return this.io
    }

    this.io = new Server(server, {
      cors: {
        credentials: true,
        origin: this.allowedOrigins(),
      },
      path: '/realtime',
    })

    this.io.use((socket, next) => {
      const payload = this.tokenService.verify(this.handshakeToken(socket))

      if (
        !payload ||
        (!payload.permissions.includes('alerts.view') &&
          !payload.permissions.includes('failure_reports.view'))
      ) {
        next(new Error('Unauthorized realtime connection'))
        return
      }

      socket.data.user = {
        canManageAlerts: payload.permissions.includes('alerts.manage'),
        permissions: payload.permissions,
        roleSlug: payload.roleSlug,
        userId: payload.userId,
      } satisfies RealtimeUser

      next()
    })

    this.io.on('connection', (socket) => {
      const user = socket.data.user as RealtimeUser
      socket.join(userRoom(user.userId))

      if (user.canManageAlerts) {
        socket.join(alertsManagersRoom)
      }

      if (user.roleSlug === 'maintenance_technician') {
        socket.join(alertsTechniciansRoom)
      }
    })

    return this.io
  }

  emitAlert(event: AlertEvent, alert: Alert) {
    if (!this.io || !alert.channels.includes('internal')) {
      return
    }

    const payload: AlertPayload = { alert, event }
    this.io.to(alertsManagersRoom).emit(event, payload)

    const reportedBy = alert.metadata?.reportedBy
    if (typeof reportedBy === 'string') {
      this.io.to(userRoom(reportedBy)).emit(event, payload)
    }

    if (alert.assignedTo) {
      this.io.to(userRoom(alert.assignedTo)).emit(event, payload)
      return
    }

    if (alert.type === 'damaged_equipment_reported') {
      this.io.to(alertsTechniciansRoom).emit(event, payload)
    }
  }

  private handshakeToken(socket: Socket) {
    const token = socket.handshake.auth?.token
    return typeof token === 'string' ? token : undefined
  }

  private allowedOrigins() {
    const configuredOrigins = env
      .get('CORS_ORIGIN')
      ?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)

    return configuredOrigins?.length ? configuredOrigins : true
  }
}

export default new RealtimeService()
