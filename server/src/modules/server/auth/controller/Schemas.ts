import { z, ZodError } from "zod"

export const AuthenticateSchema = z.object({
    username: z.string(),
    password: z.string()    
})

export const isZodError = (err: any): err is ZodError => {
    return err instanceof ZodError
}
