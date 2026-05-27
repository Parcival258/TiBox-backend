import Equipment from '#models/equipment'
import EquipmentAssignment from '#models/equipment_assignment'
import User from '#models/user'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type AssignEquipmentPayload = {
  userId: string
  assignedAt?: DateTime
  assignedBy?: string | null
  audit?: AuditContext
  notes?: string
}

type ReturnEquipmentPayload = {
  audit?: AuditContext
  returnedAt?: DateTime
  notes?: string
}

export class EquipmentAssignmentError extends Error {
  constructor(
    message: string,
    public status = 422
  ) {
    super(message)
  }
}

export default class EquipmentAssignmentService {
  private auditService = new AuditService()

  listByEquipment(equipmentId: string) {
    return this.ensureEquipmentExists(equipmentId).then(() => {
      return EquipmentAssignment.query()
        .where('equipment_id', equipmentId)
        .preload('user')
        .preload('assigner')
        .orderBy('assigned_at', 'desc')
    })
  }

  async assign(equipmentId: string, payload: AssignEquipmentPayload) {
    return db.transaction(async (trx) => {
      const equipment = await Equipment.query({ client: trx })
        .where('id', equipmentId)
        .whereNull('deleted_at')
        .first()

      if (!equipment) {
        throw new EquipmentAssignmentError('Equipment not found', 404)
      }

      const user = await User.query({ client: trx })
        .where('id', payload.userId)
        .where('is_active', true)
        .whereNull('deleted_at')
        .first()

      if (!user) {
        throw new EquipmentAssignmentError('User not found or inactive')
      }

      const currentAssignment = await EquipmentAssignment.query({ client: trx })
        .where('equipment_id', equipment.id)
        .whereNull('returned_at')
        .first()

      if (currentAssignment) {
        throw new EquipmentAssignmentError('Equipment already has an active assignment', 409)
      }

      const previousResponsibleId = equipment.currentResponsibleId
      const assignment = await EquipmentAssignment.create(
        {
          equipmentId: equipment.id,
          userId: user.id,
          assignedBy: payload.assignedBy ?? null,
          assignedAt: payload.assignedAt ?? DateTime.local(),
          notes: payload.notes ?? null,
        },
        { client: trx }
      )

      equipment.useTransaction(trx)
      equipment.currentResponsibleId = user.id
      await equipment.save()

      assignment.useTransaction(trx)
      await assignment.load('user')
      await assignment.load('assigner')

      await this.auditService.record({
        ...payload.audit,
        action: 'equipment.assigned',
        entityType: 'equipment_assignment',
        entityId: assignment.id,
        oldValues: {
          equipmentId: equipment.id,
          currentResponsibleId: previousResponsibleId,
        },
        newValues: assignment.$attributes,
      })

      return assignment
    })
  }

  async returnCurrent(equipmentId: string, payload: ReturnEquipmentPayload) {
    return db.transaction(async (trx) => {
      const equipment = await Equipment.query({ client: trx })
        .where('id', equipmentId)
        .whereNull('deleted_at')
        .first()

      if (!equipment) {
        throw new EquipmentAssignmentError('Equipment not found', 404)
      }

      const assignment = await EquipmentAssignment.query({ client: trx })
        .where('equipment_id', equipment.id)
        .whereNull('returned_at')
        .first()

      if (!assignment) {
        throw new EquipmentAssignmentError('Equipment has no active assignment', 404)
      }

      const oldValues = {
        assignment: { ...assignment.$attributes },
        equipment: { currentResponsibleId: equipment.currentResponsibleId },
      }

      assignment.useTransaction(trx)
      assignment.returnedAt = payload.returnedAt ?? DateTime.local()

      if (payload.notes) {
        assignment.notes = assignment.notes
          ? `${assignment.notes}\n${payload.notes}`
          : payload.notes
      }

      await assignment.save()

      equipment.useTransaction(trx)
      equipment.currentResponsibleId = null
      await equipment.save()

      assignment.useTransaction(trx)
      await assignment.load('user')
      await assignment.load('assigner')

      await this.auditService.record({
        ...payload.audit,
        action: 'equipment.returned',
        entityType: 'equipment_assignment',
        entityId: assignment.id,
        oldValues,
        newValues: {
          assignment: assignment.$attributes,
          equipment: { currentResponsibleId: equipment.currentResponsibleId },
        },
      })

      return assignment
    })
  }

  private async ensureEquipmentExists(equipmentId: string) {
    const equipment = await Equipment.query()
      .where('id', equipmentId)
      .whereNull('deleted_at')
      .first()

    if (!equipment) {
      throw new EquipmentAssignmentError('Equipment not found', 404)
    }
  }
}
