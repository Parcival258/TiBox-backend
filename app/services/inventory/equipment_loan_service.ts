import Equipment from '#models/equipment'
import EquipmentLoan from '#models/equipment_loan'
import User from '#models/user'
import AlertService from '#services/alerts/alert_service'
import AuditService, { type AuditContext } from '#services/audit/audit_service'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

type ListEquipmentLoanFilters = {
  equipmentId?: string
  page?: number
  perPage?: number
  status?: string
}

type CreateEquipmentLoanPayload = {
  borrowerName?: string
  createdBy?: string | null
  equipmentId: string
  estimatedReturnAt: DateTime
  loanedAt?: DateTime
  notes?: string
  receivedSignatureImage?: string
  requestedAt?: DateTime
  requestedItem: string
  requestMode?: string
  signatureImage?: string
  userId?: string
  audit?: AuditContext
}

type ReturnEquipmentLoanPayload = {
  audit?: AuditContext
  notes?: string
  receivedSignatureImage?: string
  returnedAt?: DateTime
  returnedBy?: string | null
}

export class EquipmentLoanError extends Error {
  constructor(
    message: string,
    public status = 422
  ) {
    super(message)
  }
}

export default class EquipmentLoanService {
  private alertService = new AlertService()
  private auditService = new AuditService()

  list(filters: ListEquipmentLoanFilters) {
    const query = EquipmentLoan.query()
      .preload('equipment')
      .preload('user')
      .preload('creator')
      .preload('returner')
      .orderByRaw("case status when 'overdue' then 1 when 'active' then 2 else 3 end")
      .orderBy('estimated_return_at', 'asc')
      .orderBy('created_at', 'desc')

    if (filters.equipmentId) {
      query.where('equipment_id', filters.equipmentId)
    }

    if (filters.status) {
      query.where('status', filters.status)
    }

    return query.paginate(filters.page ?? 1, filters.perPage ?? 50)
  }

  async create(payload: CreateEquipmentLoanPayload) {
    this.ensureBorrower(payload)

    return db.transaction(async (trx) => {
      const [equipment, user] = await Promise.all([
        Equipment.query({ client: trx })
          .where('id', payload.equipmentId)
          .whereNull('deleted_at')
          .first(),
        payload.userId
          ? User.query({ client: trx })
              .where('id', payload.userId)
              .where('is_active', true)
              .whereNull('deleted_at')
              .first()
          : Promise.resolve(null),
      ])

      if (!equipment) {
        throw new EquipmentLoanError('Equipment not found', 404)
      }

      if (payload.userId && !user) {
        throw new EquipmentLoanError('User not found or inactive')
      }

      const currentLoan = await EquipmentLoan.query({ client: trx })
        .where('equipment_id', equipment.id)
        .where('status', 'active')
        .whereNull('returned_at')
        .first()

      if (currentLoan) {
        throw new EquipmentLoanError('Equipment already has an active loan', 409)
      }

      const loan = await EquipmentLoan.create(
        {
          borrowerName: payload.borrowerName ?? null,
          createdBy: payload.createdBy ?? null,
          equipmentId: equipment.id,
          estimatedReturnAt: payload.estimatedReturnAt,
          loanedAt: payload.loanedAt ?? DateTime.local(),
          notes: payload.notes ?? null,
          receivedSignatureImage: payload.receivedSignatureImage ?? null,
          requestedAt: payload.requestedAt ?? DateTime.local(),
          requestedItem: payload.requestedItem,
          requestMode: payload.requestMode ?? null,
          signatureImage: payload.signatureImage ?? null,
          status: 'active',
          userId: user?.id ?? null,
        },
        { client: trx }
      )

      loan.useTransaction(trx)
      await loan.load('equipment')
      await loan.load('user')
      await loan.load('creator')

      await this.auditService.record({
        ...payload.audit,
        action: 'equipment.loaned',
        entityType: 'equipment_loan',
        entityId: loan.id,
        newValues: loan.$attributes,
      })

      return loan
    })
  }

  async returnLoan(id: string, payload: ReturnEquipmentLoanPayload) {
    return db.transaction(async (trx) => {
      const loan = await EquipmentLoan.query({ client: trx }).where('id', id).first()

      if (!loan) {
        throw new EquipmentLoanError('Loan not found', 404)
      }

      if (loan.returnedAt || loan.status === 'returned') {
        throw new EquipmentLoanError('Loan already returned', 409)
      }

      const oldValues = { ...loan.$attributes }

      loan.useTransaction(trx)
      loan.status = 'returned'
      loan.returnedAt = payload.returnedAt ?? DateTime.local()
      loan.returnedBy = payload.returnedBy ?? null
      loan.receivedSignatureImage = payload.receivedSignatureImage ?? loan.receivedSignatureImage

      if (payload.notes) {
        loan.notes = loan.notes ? `${loan.notes}\n${payload.notes}` : payload.notes
      }

      await loan.save()
      await loan.load('equipment')
      await loan.load('user')
      await loan.load('creator')
      await loan.load('returner')

      await this.alertService.resolveByKey(`equipment_loan_overdue:${loan.id}`, payload.audit)
      await this.auditService.record({
        ...payload.audit,
        action: 'equipment.loan_returned',
        entityType: 'equipment_loan',
        entityId: loan.id,
        oldValues,
        newValues: loan.$attributes,
      })

      return loan
    })
  }

  private ensureBorrower(payload: CreateEquipmentLoanPayload) {
    if (payload.userId || payload.borrowerName) {
      return
    }

    throw new EquipmentLoanError('A user or borrower name is required')
  }
}
