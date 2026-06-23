import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'
import { constants } from 'node:fs'
import { access, mkdir, open, readFile, stat, appendFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

const logFilePath = app.makePath('storage/logs/system-errors.log')
const settingsFilePath = app.makePath('storage/logs/system-errors.settings.json')
const maxReadBytes = 512 * 1024

type ErrorLogEntry = {
  id: string
  level: 'error'
  method?: string
  message: string
  name?: string
  path?: string
  stack?: string
  status?: number
  timestamp: string
  userId?: string | null
}

function errorValue(error: unknown, key: string) {
  if (!error || typeof error !== 'object') {
    return undefined
  }

  return (error as Record<string, unknown>)[key]
}

export default class SystemErrorLogService {
  async record(error: unknown, ctx?: HttpContext) {
    const settings = await this.settings()

    if (!settings.enabled) {
      return
    }

    const entry: ErrorLogEntry = {
      id: randomUUID(),
      level: 'error',
      message:
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : 'Unknown system error',
      method: ctx?.request.method(),
      name: error instanceof Error ? error.name : undefined,
      path: ctx?.request.url(true),
      stack: error instanceof Error ? error.stack : undefined,
      status: typeof errorValue(error, 'status') === 'number'
        ? errorValue(error, 'status') as number
        : undefined,
      timestamp: new Date().toISOString(),
      userId: ctx?.auth.user?.id ?? null,
    }

    await this.ensureDirectory()
    await appendFile(logFilePath, `${JSON.stringify(entry)}\n`, 'utf8')
  }

  async read(limit = 200) {
    const safeLimit = Math.max(10, Math.min(limit, 500))
    const file = await this.fileInfo()
    const settings = await this.settings()

    if (!file.exists) {
      return {
        entries: [],
        file,
        settings,
      }
    }

    const content = await this.readTail()
    const entries = content
      .split(/\r?\n/)
      .filter(Boolean)
      .slice(-safeLimit)
      .reverse()
      .map((line) => {
        try {
          return JSON.parse(line) as ErrorLogEntry
        } catch {
          return {
            id: randomUUID(),
            level: 'error' as const,
            message: line,
            timestamp: new Date().toISOString(),
          }
        }
      })

    return {
      entries,
      file,
      settings,
    }
  }

  async clear() {
    await this.ensureDirectory()
    await writeFile(logFilePath, '', 'utf8')

    return this.fileInfo()
  }

  async fileInfo() {
    try {
      const details = await stat(logFilePath)

      return {
        exists: true,
        path: logFilePath,
        size: details.size,
        updatedAt: details.mtime.toISOString(),
      }
    } catch {
      return {
        exists: false,
        path: logFilePath,
        size: 0,
        updatedAt: null,
      }
    }
  }

  async settings() {
    try {
      const content = await readFile(settingsFilePath, 'utf8')
      const settings = JSON.parse(content) as { enabled?: unknown }

      return {
        enabled: settings.enabled !== false,
      }
    } catch {
      return {
        enabled: true,
      }
    }
  }

  async updateSettings(settings: { enabled: boolean }) {
    await this.ensureDirectory()
    await writeFile(settingsFilePath, JSON.stringify({ enabled: settings.enabled }, null, 2), 'utf8')

    return this.settings()
  }

  private async readTail() {
    await access(logFilePath, constants.R_OK)

    const details = await stat(logFilePath)
    const start = Math.max(0, details.size - maxReadBytes)
    const length = details.size - start
    const buffer = Buffer.alloc(length)
    const file = await open(logFilePath, 'r')

    try {
      await file.read(buffer, 0, length, start)

      const content = buffer.toString('utf8')
      const firstLineBreak = content.indexOf('\n')

      return start > 0 && firstLineBreak >= 0
        ? content.slice(firstLineBreak + 1)
        : content
    } finally {
      await file.close()
    }
  }

  private ensureDirectory() {
    return mkdir(dirname(logFilePath), { recursive: true })
  }
}
