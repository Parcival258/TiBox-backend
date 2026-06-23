import User from '#models/user'
import SystemErrorLogService from '#services/system/system_error_log_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class SystemLogsController {
  private systemErrorLogService = new SystemErrorLogService()

  async errors({ auth, request, response, serialize }: HttpContext) {
    const isAllowed = await this.isAdmin(auth.user?.id)

    if (!isAllowed) {
      return response.forbidden({ message: 'Solo administradores pueden consultar logs del sistema' })
    }

    const limit = Number(request.input('limit', 200))
    const result = await this.systemErrorLogService.read(Number.isFinite(limit) ? limit : 200)

    return serialize(result)
  }

  async settings({ auth, response, serialize }: HttpContext) {
    const isAllowed = await this.isAdmin(auth.user?.id)

    if (!isAllowed) {
      return response.forbidden({ message: 'Solo administradores pueden consultar esta configuracion' })
    }

    return serialize(await this.systemErrorLogService.settings())
  }

  async updateSettings({ auth, request, response, serialize }: HttpContext) {
    const isAllowed = await this.isAdmin(auth.user?.id)

    if (!isAllowed) {
      return response.forbidden({ message: 'Solo administradores pueden cambiar esta configuracion' })
    }

    const enabled = request.input('enabled')

    if (typeof enabled !== 'boolean') {
      return response.badRequest({ message: 'El campo enabled debe ser booleano' })
    }

    return serialize(await this.systemErrorLogService.updateSettings({ enabled }))
  }

  async clearErrors({ auth, response, serialize }: HttpContext) {
    const isAllowed = await this.isAdmin(auth.user?.id)

    if (!isAllowed) {
      return response.forbidden({ message: 'Solo administradores pueden limpiar logs del sistema' })
    }

    const file = await this.systemErrorLogService.clear()

    return serialize({
      file,
      message: 'Logs del sistema limpiados correctamente',
    })
  }

  private async isAdmin(userId?: string) {
    if (!userId) {
      return false
    }

    const user = await User.query().where('id', userId).preload('role').first()

    return user?.role?.slug === 'admin'
  }
}
