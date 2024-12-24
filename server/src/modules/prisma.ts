import { PrismaClient } from "@prisma/client"
import { logger } from "../logger"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const UNIQUE_CONSTRAINT_VIOLATION = "P2002"

export function isPrismaError(err: any): err is PrismaClientKnownRequestError {
    return err instanceof PrismaClientKnownRequestError
}

export function createPrismaClient(): PrismaClient {
    const prisma = new PrismaClient({
        log: [
            { emit: "event", level: "error" },
            { emit: "event", level: "warn" },
        ]
    })

    prisma.$on("error", (e) => {
        logger.error(`[Prisma Error ${e.timestamp}] ${e.target} - ${e.message}`)
    })

    prisma.$on("warn", (e) => {
        logger.warn(`[Prisma Warn ${e.timestamp}] ${e.target} - ${e.message}`)
    })

    return prisma
}