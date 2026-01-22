"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"

import { ErrorMessage, FormInput } from "@/src/shared/components"
import { useComments } from "@/src/shared/hooks"
import { AddCommentType, addCommentSchema } from "@/src/shared/schemas"

interface Props {
	postId: string
}

export const AddCommentForm = ({ postId }: Props) => {
	const queryClient = useQueryClient()
	const { addCommentMutation } = useComments()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: zodResolver(addCommentSchema)
	})

	const { mutate, isPending } = addCommentMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["post", postId] })
			reset()
		}
	})

	const onSubmit = (values: AddCommentType) => {
		mutate({ postId, ...values })
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='border-violet mt-4 flex items-center justify-between gap-2 rounded-lg border pr-4'
			>
				<FormInput
					errors={errors}
					name='text'
					disabled={isPending}
					register={register}
					type='text'
					placeholder='Сообщение...'
					className='border-none'
				/>
				<button disabled={isPending}>
					<Send />
				</button>
			</form>
		</>
	)
}
