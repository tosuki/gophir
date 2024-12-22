import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  TOKEN_EXPIRATION: z.number().default(72)
})

const environment = envSchema.parse(process.env)

export default environment
