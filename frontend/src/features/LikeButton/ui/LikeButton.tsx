"use client"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { useLikes } from "@/src/shared/hooks"

interface Props {
	id: string
	likes: number
}

export const LikeButton = ({ id, likes }: Props) => {
	const queryClient = useQueryClient()
	const { likeMutation } = useLikes()
	const router = useRouter()
	const { mutate, isPending } = likeMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["post", id] })
		},
		onError: () => {
			router.push("/auth/login")
		}
	})

	return (
		<button
			onClick={() => mutate(id)}
			disabled={isPending}
			className='hover:bg-violet hover:text-background flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 md:flex-0'
		>
			<span>{likes}</span> | <span>Понравилось</span>
		</button>
	)
}
