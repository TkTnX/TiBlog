"use client"
import DOMPurify from "dompurify"
import Image from "next/image"

import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { useProjects } from "@/src/shared/hooks"

interface Props {
	id: string
}

export const BigProjectItem = ({ id }: Props) => {
	const { getProjectByIdQuery } = useProjects()
	const { data, isPending, error } = getProjectByIdQuery(id)
	if (error) return showErrorMessage(error)
	if (isPending) return <Skeleton className='h-screen flex-1' />
	return (
		<section className='flex-1'>
			<p className='text-violet text-xs font-semibold sm:text-sm'>
				{new Date(data.createdAt)
					.toLocaleDateString("ru-RU", {
						weekday: "long",
						day: "numeric",
						month: "short",
						year: "numeric"
					})
					.toUpperCase()}
			</p>
			<h1 className='mt-8 text-2xl font-bold sm:text-4xl'>
				{data.title}
			</h1>
			<div className='relative mt-8 h-50 w-full sm:h-100'>
				<Image
					className='object-cover'
					src={`${data.preview}`}
					alt={data.title}
					fill
					unoptimized
				/>
			</div>
			<div
				className='tiptap-editor mt-8'
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(data.content)
				}}
			/>
		</section>
	)
}
