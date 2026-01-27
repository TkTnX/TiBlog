"use client"

import { useState } from "react"

import { CategorySelect, UploadFile } from "@/src/features"
import { FormInput } from "@/src/shared/components"
import { useProjects } from "@/src/shared/hooks"
import { TextEditor } from "@/src/widgets"

export const AddProject = () => {
	const { createProjectMutation } = useProjects()
	const { mutate, isPending } = createProjectMutation()
	const [title, setTitle] = useState("")
	const [content, setContent] = useState<string>("")
	const [previewUrl, setPreviewUrl] = useState("")
	// TODO: Фильтрация по категории
	const [categories, setCategories] = useState<string[]>([])
	const [stack, setStack] = useState("")
	const onSubmit = () => {
		mutate({
			content,
			preview: previewUrl,
			title,
			categories,
			stack: stack.split(",")
		})
	}

	return (
		<div className='mx-auto w-full max-w-2xl'>
			<h3 className='text-center text-4xl font-semibold'>
				Добавление проектов
			</h3>
			<div className='mt-10 space-y-4'>
				<UploadFile preview={previewUrl} setUrl={setPreviewUrl} />
				<FormInput
					disabled={isPending}
					minLength={3}
					placeholder='Заголовок'
					name='title'
					onChange={e => setTitle(e.target.value)}
					value={title}
				/>
				<FormInput
					disabled={isPending}
					minLength={3}
					placeholder='Стек технологий'
					name='stack'
					onChange={e => setStack(e.target.value)}
					value={stack}
				/>
				<CategorySelect
					categories={categories}
					setCategories={setCategories}
				/>
				{/* Editor */}
				<TextEditor setContent={setContent} />

				<button
					onClick={onSubmit}
					disabled={isPending}
					className='bg-violet text-background rounded-lg px-4 py-2 hover:opacity-80 disabled:pointer-events-none disabled:opacity-50'
				>
					Добавить проект
				</button>
			</div>
		</div>
	)
}
