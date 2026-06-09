import env from '#start/env'
import { createHmac, timingSafeEqual } from 'node:crypto'

export type RealtimeTokenPayload = {
  exp: number
  permissions: string[]
  roleSlug?: string | null
  userId: string
}

export default class RealtimeTokenService {
  private ttlSeconds = 60 * 5

  create(payload: Omit<RealtimeTokenPayload, 'exp'>) {
    const tokenPayload: RealtimeTokenPayload = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + this.ttlSeconds,
    }
    const encodedPayload = this.base64UrlEncode(JSON.stringify(tokenPayload))
    const signature = this.sign(encodedPayload)

    return `${encodedPayload}.${signature}`
  }

  verify(token: string | undefined): RealtimeTokenPayload | null {
    if (!token) {
      return null
    }

    const [encodedPayload, signature] = token.split('.')
    if (!encodedPayload || !signature) {
      return null
    }

    const expectedSignature = this.sign(encodedPayload)
    if (!this.safeEqual(signature, expectedSignature)) {
      return null
    }

    try {
      const payload = JSON.parse(this.base64UrlDecode(encodedPayload)) as RealtimeTokenPayload
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return null
      }

      return payload
    } catch {
      return null
    }
  }

  private sign(payload: string) {
    return createHmac('sha256', env.get('APP_KEY').release()).update(payload).digest('base64url')
  }

  private safeEqual(value: string, expected: string) {
    const valueBuffer = Buffer.from(value)
    const expectedBuffer = Buffer.from(expected)

    return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer)
  }

  private base64UrlEncode(value: string) {
    return Buffer.from(value).toString('base64url')
  }

  private base64UrlDecode(value: string) {
    return Buffer.from(value, 'base64url').toString('utf8')
  }
}
