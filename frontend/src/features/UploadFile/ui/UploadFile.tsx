import { Upload } from "lucide-react"

interface Props {
    title?: string
}

export const UploadFile = ({title = "Загрузить файл"}: Props) => {
	return (
		<label className='flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-500 p-10'>
			<Upload size={124} />
            <p className='text-4xl font-bold'>{title}</p>
			<input type='file' hidden />
		</label>
	)
}
