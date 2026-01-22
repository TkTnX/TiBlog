import z from "zod"

export const registerSchema = z.object({
	username: z.string().min(3).max(50),
	password: z.string().min(8).max(100),
	email: z.email()
})

export type RegisterType = z.infer<typeof registerSchema>
