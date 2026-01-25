"use client"

import { UploadFile } from "@/src/features"
import { TextEditor } from "@/src/widgets"

export const AddPost = () => {

	return (
		<div className='mx-auto w-full max-w-2xl'>
			<h3 className='text-center text-4xl font-semibold'>
				Добавление постов
			</h3>
			<div className='mt-10 space-y-4'>
				<UploadFile />

				{/* Editor */}
				<TextEditor />
				<button>Добавить пост</button>
			</div>
		</div>
	)
}
