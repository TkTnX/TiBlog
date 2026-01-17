import { IPost } from "@/src/shared/types/post.type"

export interface ICategory {
    id: string
    name: string
    color: string
    posts?: IPost[]
}