import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.string().default("3000")
})

const environment = envSchema.parse(process.env)

export default environment
