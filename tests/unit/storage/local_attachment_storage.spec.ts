import LocalAttachmentStorage from '#services/storage/local_attachment_storage'
import { AttachmentStorageError } from '#services/storage/attachment_storage'
import app from '@adonisjs/core/services/app'
import type { MultipartFile } from '@adonisjs/bodyparser'
import { test } from '@japa/runner'
import { isAbsolute, resolve } from 'node:path'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'

test.group('Local attachment storage', () => {
  test('resolves relative storage keys below the configured root', ({ assert }) => {
    const root = app.tmpPath('attachment-storage-test')
    const storage = new LocalAttachmentStorage(root)
    const path = storage.resolvePath('equipment/equipment-id/document.pdf')

    assert.equal(path, resolve(root, 'equipment/equipment-id/document.pdf'))
  })

  test('rejects path traversal and untrusted absolute paths', ({ assert }) => {
    const storage = new LocalAttachmentStorage(app.tmpPath('attachment-storage-test'))

    assert.throws(() => storage.resolvePath('../outside.txt'), AttachmentStorageError)
    assert.throws(
      () => storage.resolvePath(resolve(app.appRoot.pathname, '..', 'outside.txt')),
      AttachmentStorageError
    )
  })

  test('accepts absolute paths only for legacy tmp uploads', ({ assert }) => {
    const storage = new LocalAttachmentStorage(app.tmpPath('attachment-storage-test'))
    const legacyPath = app.tmpPath('uploads', 'equipment', 'legacy.pdf')

    assert.isTrue(isAbsolute(legacyPath))
    assert.equal(storage.resolvePath(legacyPath), resolve(legacyPath))
  })

  test('stores and deletes files below the persistent root', async ({ assert }) => {
    const root = app.tmpPath('attachment-storage-write-test')
    const storage = new LocalAttachmentStorage(root)
    const key = 'equipment/equipment-id/document.pdf'
    const fakeFile = {
      filePath: null as string | null,
      move: async (directory: string, options: { name?: string }) => {
        await mkdir(directory, { recursive: true })
        fakeFile.filePath = resolve(directory, options.name ?? 'document.pdf')
        await writeFile(fakeFile.filePath, 'persistent attachment')
      },
    }

    try {
      await storage.save(fakeFile as unknown as MultipartFile, key)
      assert.equal(await readFile(storage.resolvePath(key), 'utf8'), 'persistent attachment')

      await storage.delete(key)
      await assert.rejects(() => readFile(storage.resolvePath(key)), /ENOENT/)
    } finally {
      await rm(root, { force: true, recursive: true })
    }
  })
})
