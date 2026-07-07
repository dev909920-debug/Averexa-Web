import { z } from 'zod'

// Blank .env.local values arrive as '' treat them the same as absent (undefined)
const e = (schema: z.ZodTypeAny) =>
  z.preprocess((v) => (v === '' ? undefined : v), schema)

const serverEnvSchema = z.object({
  GOOGLE_SHEETS_WEBHOOK_URL: e(z.string().url().optional()),
  CLOUDFLARE_TURNSTILE_SECRET_KEY: e(z.string().min(1).optional()),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APPS_SCRIPT_URL: e(z.string().url().optional()),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: e(z.string().optional()),
  NEXT_PUBLIC_GTM_ID: e(z.string().optional()),
  NEXT_PUBLIC_SITE_URL: e(z.string().url().default('https://averexa.com')),
})

function parseEnv() {
  const serverResult = serverEnvSchema.safeParse(process.env)
  const clientResult = clientEnvSchema.safeParse(process.env)

  const errors: string[] = []

  if (!serverResult.success) {
    errors.push(...serverResult.error.issues.map(i => `  Server: ${i.path.join('.')} ${i.message}`))
  }
  if (!clientResult.success) {
    errors.push(...clientResult.error.issues.map(i => `  Client: ${i.path.join('.')} ${i.message}`))
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`)
  }

  return {
    ...serverResult.data!,
    ...clientResult.data!,
  }
}

export const env = parseEnv()
