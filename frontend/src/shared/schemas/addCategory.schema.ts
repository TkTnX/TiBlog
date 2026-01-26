import z from "zod"

export const addCategorySchema = z.object({
	name: z.string().nonempty(),
})

export type AddCategoryType = z.infer<typeof addCategorySchema>
export type AddCategoryVariables = AddCategoryType & {color: string}
