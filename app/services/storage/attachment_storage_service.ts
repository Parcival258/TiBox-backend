import app from '@adonisjs/core/services/app'
import string from '@adonisjs/core/helpers/string'
import type { MultipartFile } from '@adonisjs/bodyparser'
import { isAbsolute } from 'node:path'
import env from '#start/env'
import type {
  AttachmentNamespace,
  AttachmentStorageDriver,
} from '#services/storage/attachment_storage'
import LocalAttachmentStorage from '#services/storage/local_attachment_storage'

export default class AttachmentStorageService {
  private driver: AttachmentStorageDriver

  constructor() {
    const configuredPath = env.get('UPLOADS_PATH')
    const rootPath = isAbsolute(configuredPath) ? configuredPath : app.makePath(configuredPath)

    switch (env.get('ATTACHMENT_DISK')) {
      case 'local':
        this.driver = new LocalAttachmentStorage(rootPath)
        break
    }
  }

  async save(file: MultipartFile, namespace: AttachmentNamespace, entityId: string) {
    const extension = file.extname?.replace(/[^a-z0-9]/gi, '').toLowerCase()
    const fileName = `${string.generateRandom(32)}${extension ? `.${extension}` : ''}`
    const key = `${namespace}/${entityId}/${fileName}`

    await this.driver.save(file, key)
    return key
  }

  delete(key: string) {
    return this.driver.delete(key)
  }

  resolvePath(key: string) {
    return this.driver.resolvePath(key)
  }
}
