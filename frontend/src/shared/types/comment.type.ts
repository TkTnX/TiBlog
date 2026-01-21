export interface IComment {
    id: string
    text: string
    post?: string
    postId: string
    // TODO: add user type
    // user?: IUser
    userId?: string
}