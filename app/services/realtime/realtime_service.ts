import type Alert from '#models/alert'
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
  canManageLoanRequests: boolean
  permissions: string[]
  roleSlug?: string | null
  userId: string
}

type AlertPayload = {
  alert: Alert
  event: AlertEvent
}

type ChatMessagePayload = {
  conversation: Record<string, unknown>
  message: Record<string, unknown>
}

type ChatReadPayload = {
  conversationId: string
  readAt: string | null
  unreadCount: number
  userId: string
}

type EquipmentLoanPayload = {
  event: 'approved' | 'created' | 'rejected' | 'requested' | 'returned'
  loan: Record<string, unknown>
}

const userRoom = (userId: string) => `user:${userId}`
const alertsManagersRoom = 'alerts:managers'
const alertsTechniciansRoom = 'alerts:technicians'
const loanManagersRoom = 'loans:managers'

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

      if (!payload) {
        next(new Error('Unauthorized realtime connection'))
        return
      }

      socket.data.user = {
        canManageAlerts: payload.permissions.includes('alerts.manage'),
        canManageLoanRequests: payload.permissions.includes('equipment.assign'),
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

      if (user.canManageLoanRequests) {
        socket.join(loanManagersRoom)
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
    if (alert.type === 'equipment_loan_requested') {
      this.io.to(alertsManagersRoom).to(loanManagersRoom).emit(event, payload)
    } else {
      this.io.to(alertsManagersRoom).emit(event, payload)
    }

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

  emitChatConversationUpdated(conversation: Record<string, unknown>, participantIds: string[]) {
    if (!this.io) {
      return
    }

    const uniqueParticipantIds = [...new Set(participantIds)]
    uniqueParticipantIds.forEach((participantId) => {
      this.io?.to(userRoom(participantId)).emit('chat:conversation_updated', { conversation })
    })
  }

  emitChatMessageCreated(payload: ChatMessagePayload, participantIds: string[]) {
    if (!this.io) {
      return
    }

    const uniqueParticipantIds = [...new Set(participantIds)]
    uniqueParticipantIds.forEach((participantId) => {
      this.io?.to(userRoom(participantId)).emit('chat:message_created', payload)
    })
  }

  emitChatMessagesRead(payload: ChatReadPayload, participantIds: string[]) {
    if (!this.io) {
      return
    }

    const uniqueParticipantIds = [...new Set(participantIds)]
    uniqueParticipantIds.forEach((participantId) => {
      this.io?.to(userRoom(participantId)).emit('chat:messages_read', payload)
    })
  }

  emitEquipmentLoanUpdated(payload: EquipmentLoanPayload, participantIds: string[], notifyManagers = true) {
    if (!this.io) {
      return
    }

    if (notifyManagers) {
      this.io.to(loanManagersRoom).emit('equipment_loans:updated', payload)
    }

    const uniqueParticipantIds = [...new Set(participantIds)]
    uniqueParticipantIds.forEach((participantId) => {
      this.io?.to(userRoom(participantId)).emit('equipment_loans:updated', payload)
    })
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
