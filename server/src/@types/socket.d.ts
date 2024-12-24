import "socket.io"

import { Session } from "../modules/session/Session"

declare module "socket.io" {
    interface Socket {
        session?: Session 
    }
}