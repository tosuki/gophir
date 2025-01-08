import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.string(),
  JWT_SECRET: z.string(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  PORT: z.string().default("3000")
})

const environment = envSchema.parse(process.env)

export default environment
