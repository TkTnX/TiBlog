"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { useForm } from "react-hook-form"

import { FormInput } from "@/src/shared/components"
import { useCategories } from "@/src/shared/hooks"
import { AddCategoryType, addCategorySchema } from "@/src/shared/schemas"

export const AddCategoryForm = () => {
	const [color, setColor] = useState<null | string>(null)
	const { createCategoryMutation } = useCategories()
	const { mutate, isPending } = createCategoryMutation()
	const {
		handleSubmit,
		formState: { errors },
		register
	} = useForm({
		resolver: zodResolver(addCategorySchema)
	})

	const onSubmit = (values: AddCategoryType) => {
		if (!color) return
		mutate({ ...values, color })
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='mt-4 flex flex-col items-center justify-between gap-2 rounded-lg'
		>
			<FormInput
				errors={errors}
				name='name'
				disabled={isPending}
				register={register}
				type='text'
				placeholder='Название...'
				className='border-violet'
			/>
			<HexColorPicker className='w-full!' onChange={setColor} />
			<button
				className='bg-violet w-full rounded-xl py-4 hover:opacity-80'
				disabled={isPending}
			>
				Создать
			</button>
		</form>
	)
}
