"use client"
import { Upload } from "lucide-react"

import { useUploads } from "@/src/shared/hooks"

interface Props {
	title?: string
	setUrl: (url: string) => void
	preview?: string
}

export const UploadFile = ({
	title = "Загрузить файл",
	setUrl,
	preview
}: Props) => {
	const { uploadMutation } = useUploads()
	const { mutate } = uploadMutation({
		onSuccess: (url: string) => {
			setUrl(url)
		}
	})
	const onChange = (file: File | undefined) => {
		if (!file) return
		mutate(file)
	}

	return (
		<label className='flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-500 p-10'>
			{preview && <img src={preview} className='max-w-100' />}
			<Upload size={124} />
			<p className='text-4xl font-bold'>{title}</p>
			<input
				onChange={e => onChange(e.target.files?.[0])}
				type='file'
				hidden
			/>
		</label>
	)
}
