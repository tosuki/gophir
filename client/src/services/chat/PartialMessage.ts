export type PartialMessage = {
    content: string
    author: {
        id: number
        username: string
    }
    authorId: number
}