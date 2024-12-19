import { PrismaClient } from "@prisma/client";
import { Result } from "src/lib/result";
import { Session } from "../model/Session";

export default class AuthUsecase {
    constructor(
        private prisma: PrismaClient, //orm
    ) {}
    
    public signup(username: string, password: string): Result<string> {
        return {
            error: "to-do"
        }
    }

    public signin(username: string, password: string): Result<string> {
        return { error: "to-do" }
    }

    public rewoke(token: string): Result<Session> {
        return { error: "invalid-token" }
    }
}
