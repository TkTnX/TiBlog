import { ICategory } from "."

export interface IProject {
    id: string
    title: string
    preview: string
    stack: string[]
    content: string
    categories: ICategory[]
}