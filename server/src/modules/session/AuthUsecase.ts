import { PrismaClient } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

import { hash } from "bcrypt"
import { encodeSession } from "./token"

import { Result } from "../../lib/result"
import { logger } from "../../logger"

export class AuthUsecase {
    constructor(
        private prismaClient: PrismaClient
    ) {}

    public async authenticate(username: string, password: string): Promise<Result<string>> {
        try {
            const isUsernameTaken = await this.prismaClient.user.findUnique({
                where: { username },
                select: { id: true }
            })

            if (isUsernameTaken) {
                return { error: "occupied" }
            }

            const hashedPassword = await hash(password, 10)
            const user = await this.prismaClient.user.create({
                data: {
                    username,
                    password: hashedPassword,
                }
            })

            const token = encodeSession({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt.getTime(),
                updatedAt: user.updatedAt.getTime(),
            })

            return token
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                logger.error(`Failed to create the user due to ${err.code} - ${err.message}`)
                return { error: "database_error" }
            }
        
            return { error: "unhandled" }
        }
    }

    public async register(username: string, password: string): Promise<Result<string>> {
        return { error: "unhandled" }
    }
}
