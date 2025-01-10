export type Message = {
    id: number
    content: string
    authorId: number
    author?: {
        username: string,
        password: string
    }

    createdAt: Date
    updatedAt: Date
}