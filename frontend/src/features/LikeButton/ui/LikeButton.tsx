"use client"
import { useLikes } from "@/src/shared/hooks"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
	id: string
	likes: number
}

export const LikeButton = ({ id, likes }: Props) => {
	const queryClient = useQueryClient()
	const { likeMutation } = useLikes()
	const { mutate, isPending } = likeMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['post', id]})
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
