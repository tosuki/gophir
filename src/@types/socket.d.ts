import "socket.io"

import { Session } from "../model/Session"
import type { ExtendedError } from "socket.io"

declare module "socket.io" {
    interface Socket {
        session?: Session
    }

    type NextFunction = (error?: ExtendedError) => unknown
}