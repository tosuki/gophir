import { PrismaClient } from "@prisma/client"
import { logger } from "../../logger"

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