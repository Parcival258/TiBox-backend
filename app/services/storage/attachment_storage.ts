import type { MultipartFile } from '@adonisjs/bodyparser'

export type AttachmentNamespace = 'equipment' | 'maintenance-records'

export interface AttachmentStorageDriver {
  delete(key: string): Promise<void>
  resolvePath(key: string): string
  save(file: MultipartFile, key: string): Promise<void>
}

export class AttachmentStorageError extends Error {
  constructor(
    message: string,
    public code: 'invalid_key' | 'save_failed' = 'save_failed'
  ) {
    super(message)
  }
}
