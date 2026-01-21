"use client"
import Image from "next/image"

import { BigPostControls } from "./BigPostControls"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { usePosts } from "@/src/shared/hooks"

interface Props {
	id: string
}

export const BigPostItem = ({ id }: Props) => {
	const { getPostByIdQuery } = usePosts()
	const { data, isPending, error } = getPostByIdQuery(id)

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
			<BigPostControls post={data} />
			<div className='relative mt-8 h-50 w-full sm:h-100'>
				<Image
					className='object-cover'
					src={data.preview}
					alt={data.title}
					fill
				/>
			</div>
			{/* У этого элемента отключить сброс стилей, чтобы всё отображалось верно */}
			<div className='post-content mt-8'>{data.content}</div>
		</section>
	)
}
