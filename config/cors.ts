import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { defineConfig } from '@adonisjs/cors'

const configuredOrigins = env
  .get('CORS_ORIGIN')
  ?.split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)

const mobileOrigins = new Set(['capacitor://localhost', 'http://localhost', 'https://localhost'])

function allowedOrigin(origin: string) {
  const normalizedOrigin = origin.replace(/\/$/, '')

  if (mobileOrigins.has(normalizedOrigin)) {
    return true
  }

  if (configuredOrigins?.includes(normalizedOrigin)) {
    return true
  }

  if (app.inDev && /^https:\/\/[a-z0-9-]+\.use2\.devtunnels\.ms$/i.test(normalizedOrigin)) {
    return true
  }

  return false
}

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  /**
   * Enable or disable CORS handling globally.
   */
  enabled: true,

  /**
   * In development, allow every origin to simplify local front/backend setup.
   * In production, keep an explicit allowlist (empty by default, so no
   * cross-origin browser access is allowed until configured).
   */
  origin: allowedOrigin,

  /**
   * HTTP methods accepted for cross-origin requests.
   */
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],

  /**
   * Reflect request headers by default. Use a string array to restrict
   * allowed headers.
   */
  headers: true,

  /**
   * Response headers exposed to the browser.
   */
  exposeHeaders: [],

  /**
   * Allow cookies/authorization headers on cross-origin requests.
   */
  credentials: true,

  /**
   * Cache CORS preflight response for N seconds.
   */
  maxAge: 90,
})

export default corsConfig
