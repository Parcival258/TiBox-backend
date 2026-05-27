import AuditLog from '#models/audit_log'

export type AuditContext = {
  userId?: string | null
  ipAddress?: string | null
  userAgent?: string | null
}

type RecordAuditPayload = AuditContext & {
  action: string
  entityType: string
  entityId?: string | null
  oldValues?: unknown
  newValues?: unknown
}

export default class AuditService {
  record(payload: RecordAuditPayload) {
    return AuditLog.create({
      userId: payload.userId ?? null,
      action: payload.action,
      entityType: payload.entityType,
      entityId: payload.entityId ?? null,
      oldValues: this.serializeValues(payload.oldValues),
      newValues: this.serializeValues(payload.newValues),
      ipAddress: payload.ipAddress ?? null,
      userAgent: payload.userAgent ?? null,
    })
  }

  private serializeValues(value: unknown) {
    if (value === undefined || value === null) {
      return null
    }

    return JSON.parse(JSON.stringify(value)) as Record<string, unknown>
  }
}
