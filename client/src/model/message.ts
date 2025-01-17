export type Message = {
    messageId: number
    content: string
    authorId: number
    author: {
        username: string,
        password: string
    }

    createdAt: Date
    updatedAt: Date
}