import { PrismaClient } from "@prisma/client"
import { isPrismaError } from "../prisma"

import { hash, compare } from "bcrypt"
import { encodeSession, EncodedSession } from "./token"

import { Result } from "../../lib/result"
import { User } from "./User"

import environment from "../../env"

export class AuthUsecase {
    constructor(
        private prismaClient: PrismaClient
    ) {}

    private createSession({ id, username, createdAt, updatedAt }: Omit<User, "updatedAt" | "createdAt"> & {
        createdAt: Date,
        updatedAt: Date
    }): Result<EncodedSession> {
        return encodeSession({
            createdAt: createdAt.getTime(),
            updatedAt: updatedAt.getTime(),
            id, username,
        })
    }

    public async register(username: string, password: string): Promise<Result<EncodedSession>> {
        try {
            const isUsernameTaken = await this.prismaClient.user.findUnique({
                where: { username },
                select: { id: true }
            })

            if (isUsernameTaken) {
                return { error: "occupied" }
            }

            const hashedPassword = await hash(password, environment.BCRYPT_SALT_ROUNDS)
            const user = await this.prismaClient.user.create({
                data: {
                    username,
                    password: hashedPassword,
                }
            })

            return this.createSession(user)
        } catch (err) {
            if (isPrismaError(err)) {
                return { error: "database_error" }
            }
        
            return { error: "unhandled" }
        }
    }

    public async authenticate(username: string, password: string): Promise<Result<EncodedSession>> {
        try {
            const user = await this.prismaClient.user.findUnique({
                where: { username }
            })

            if (!user) {
                return { error: "invalid_username" }
            }

            if (!(await compare(password, user.password))) {
                return { error: "invalid_password" }
            }

            return this.createSession(user)
        } catch (err) {
            if (isPrismaError(err)) {
                return { error: "database_error" }
            }

            return { error: "unhandled" }
        }
    }
}
