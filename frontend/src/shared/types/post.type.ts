import { ICategory } from "."

export interface IPost {
	id: string
	title: string
	preview: string
	content: string
	views: number
	createdAt: Date
    updatedAt: Date
    categories: ICategory[]
}
