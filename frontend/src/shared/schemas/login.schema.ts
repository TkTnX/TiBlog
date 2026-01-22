import z from "zod";

export const loginSchema = z.object({
    password: z.string().min(8).max(100),
        email: z.email()
})

export type LoginType = z.infer<typeof loginSchema>
