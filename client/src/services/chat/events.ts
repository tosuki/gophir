import { Session } from "../session/Session"
import { Message } from "./Message"

export type ConnectedEventParams = {
    session: Session
    messages: Message[]
}

export type MessageReceiveParams = Message