import z from "zod"

export const addCommentSchema = z.object({
	text: z.string().nonempty(),

})

export type AddCommentType = z.infer<typeof addCommentSchema>
export type AddCommentVariables = AddCommentType & {postId: string, userId: string | null}