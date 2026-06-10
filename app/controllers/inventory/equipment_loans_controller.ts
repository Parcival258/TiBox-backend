import EquipmentLoanService, {
  EquipmentLoanError,
} from '#services/inventory/equipment_loan_service'
import {
  createEquipmentLoanValidator,
  listEquipmentLoansValidator,
  returnEquipmentLoanValidator,
} from '#validators/equipment_loan'
import type { HttpContext } from '@adonisjs/core/http'

export default class EquipmentLoansController {
  private loanService = new EquipmentLoanService()

  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listEquipmentLoansValidator)

    return this.loanService.list(filters)
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
}
