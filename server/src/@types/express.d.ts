import "express"

import { Session } from "../modules/session/Session"

declare module "express" {
    export interface Response {
        locals: {
            session?: Session
        }
    }
}