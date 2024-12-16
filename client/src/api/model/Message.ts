export type MessageRaw = {
    authorId: number,
    content: string,
    createdAt: number
}

export type Message = MessageRaw & {
    id: number
}
