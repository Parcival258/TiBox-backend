import app from '@adonisjs/core/services/app'
import type { MultipartFile } from '@adonisjs/bodyparser'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { unlink } from 'node:fs/promises'
import {
  AttachmentStorageError,
  type AttachmentStorageDriver,
} from '#services/storage/attachment_storage'

export default class LocalAttachmentStorage implements AttachmentStorageDriver {
  private legacyRoot = resolve(app.tmpPath('uploads'))

  constructor(private root: string) {
    this.root = resolve(root)
  }

  async save(file: MultipartFile, key: string) {
    const destination = this.resolvePath(key)

    await file.move(dirname(destination), {
      name: destination.split(sep).at(-1),
      overwrite: false,
    })

    if (!file.filePath) {
      throw new AttachmentStorageError('Attachment could not be stored')
    }
  }

  async delete(key: string) {
    try {
      await unlink(this.resolvePath(key))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
    }
  }

  resolvePath(key: string) {
    if (isAbsolute(key)) {
      if (this.isInside(this.root, key) || this.isInside(this.legacyRoot, key)) {
        return resolve(key)
      }

      throw new AttachmentStorageError('Attachment storage key is invalid', 'invalid_key')
    }

    const normalizedKey = key.replace(/\\/g, '/')
    const destination = resolve(this.root, normalizedKey)

    if (!normalizedKey || normalizedKey.includes('../') || !this.isInside(this.root, destination)) {
      throw new AttachmentStorageError('Attachment storage key is invalid', 'invalid_key')
    }

    return destination
  }

  private isInside(root: string, candidate: string) {
    const pathFromRoot = relative(resolve(root), resolve(candidate))
    return (
      pathFromRoot !== '..' && !pathFromRoot.startsWith(`..${sep}`) && !isAbsolute(pathFromRoot)
    )
  }
}
