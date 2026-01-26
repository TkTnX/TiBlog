"use client"
import { Trash } from "lucide-react"

import { useDelete } from "@/src/shared/hooks"
import { EModels } from "@/src/shared/types"

interface Props {
	children: React.ReactNode
	model: EModels
	id: string
	onSuccess: () => void
}

export const DeleteButton = ({ children, model, id, onSuccess }: Props) => {
	const { deleteItemMutation } = useDelete()
	const { mutate, isPending } = deleteItemMutation(model, id, {
		onSuccess
	})

	const onClick = async () => {
		const res = confirm("Вы уверены?")
		if (res) {
			mutate("")
		}
	}

	return (
		<div className='group relative overflow-hidden rounded-lg'>
			<button
				onClick={onClick}
				disabled={isPending}
				className='absolute inset-0 z-10 flex items-center justify-center bg-red-500/40 text-red-500 opacity-0 group-hover:opacity-100'
			>
				<Trash />
			</button>
			{children}
		</div>
	)
}
