import { IUser } from "."

export interface IComment {
    id: string
    text: string
    post?: string
    postId: string
    user?: IUser
    userId?: string
}