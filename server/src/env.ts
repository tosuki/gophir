import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  BCRYPT_SALT_ROUNDS: z.string(),
  TOKEN_EXPIRATION: z.number().default(72),
  TOKEN_GRACE_PERIOD: z.number().default(3),
  RENEW_AUTHORIZATION_HEADER: z.string().default("Renew-Authorization")
})

const environment = envSchema.parse(process.env)

export default environment
