import EquipmentLoanService, {
  EquipmentLoanError,
} from '#services/inventory/equipment_loan_service'
import {
  approveEquipmentLoanValidator,
  createEquipmentLoanValidator,
  listEquipmentLoansValidator,
  rejectEquipmentLoanValidator,
  requestEquipmentLoanValidator,
  returnEquipmentLoanValidator,
} from '#validators/equipment_loan'
import AuthorizationService from '#services/auth/authorization_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentLoansController {
  private loanService = new EquipmentLoanService()
  private authorizationService = new AuthorizationService()

  async index({ auth, request }: HttpContext) {
    const filters = await request.validateUsing(listEquipmentLoansValidator)
    const user = auth.getUserOrFail()
    const canManage = await this.authorizationService.hasAnyPermission(user, [
      'equipment.assign',
      'equipment.return',
    ])

    return this.loanService.list({
      ...filters,
      visibleToUserId: canManage ? undefined : user.id,
    })
  }

  requestableEquipment() {
    return this.loanService.requestableEquipment()
  }

  async requestLoan({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(requestEquipmentLoanValidator)
    const user = auth.getUserOrFail()

    try {
      return response.created(
        await this.loanService.request({
          ...payload,
          audit: this.auditContext({ auth, request }),
          userId: user.id,
        })
      )
    } catch (error) {
      return this.handleLoanError(error, response)
    }
  }

  async approve({ auth, params, request, response }: HttpContext) {
    const { equipmentId } = await request.validateUsing(approveEquipmentLoanValidator)
    try {
      return await this.loanService.approve(
        params.id,
        equipmentId,
        auth.getUserOrFail().id,
        this.auditContext({ auth, request })
      )
    } catch (error) {
      return this.handleLoanError(error, response)
    }
  }

  async reject({ auth, params, request, response }: HttpContext) {
    const { reason } = await request.validateUsing(rejectEquipmentLoanValidator)

    try {
      return await this.loanService.reject(
        params.id,
        auth.getUserOrFail().id,
        reason,
        this.auditContext({ auth, request })
      )
    } catch (error) {
      return this.handleLoanError(error, response)
    }
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createEquipmentLoanValidator)
    const createdBy = auth.isAuthenticated ? auth.getUserOrFail().id : null

    try {
      const loan = await this.loanService.create({
        ...payload,
        audit: this.auditContext({ auth, request }),
        createdBy,
      })

      return response.created(loan)
    } catch (error) {
      if (error instanceof EquipmentLoanError) {
        return response.status(error.status).send({ message: error.message })
      }

      throw error
    }
  }

  async returnLoan({ auth, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(returnEquipmentLoanValidator)
    const returnedBy = auth.isAuthenticated ? auth.getUserOrFail().id : null

    try {
      return await this.loanService.returnLoan(params.id, {
        ...payload,
        audit: this.auditContext({ auth, request }),
        returnedBy,
      })
    } catch (error) {
      if (error instanceof EquipmentLoanError) {
        return response.status(error.status).send({ message: error.message })
      }

      throw error
    }
  }

  private auditContext({ auth, request }: Pick<HttpContext, 'auth' | 'request'>) {
    return {
      userId: auth.isAuthenticated ? auth.getUserOrFail().id : null,
      ipAddress: request.ip(),
      userAgent: request.header('user-agent') ?? null,
    }
  }

  private handleLoanError(error: unknown, response: HttpContext['response']) {
    if (error instanceof EquipmentLoanError) {
      return response.status(error.status).send({ message: error.message })
    }

    throw error
  }
}
