import { ICategory, IComment } from "."

export interface IPost {
	id: string
	title: string
	preview: string
	content: string
	views: number
	createdAt: Date
    updatedAt: Date
	categories: ICategory[]
	comments: IComment[]
	_count: {
		likes: number
	}
}
