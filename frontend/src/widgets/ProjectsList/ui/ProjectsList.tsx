"use client"
import { useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { PostItemWrapper } from "@/src/entities"
import { PaginationButtons } from "@/src/features"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { useProjects } from "@/src/shared/hooks"
import { cn } from "@/src/shared/libs"
import { EModels, PostResponse } from "@/src/shared/types"

interface Props {
	className?: string
	isAdminPage?: boolean
}

export const ProjectsList = ({ className, isAdminPage = false }: Props) => {
	const queryClient = useQueryClient()
	const searchParams = useSearchParams()
	const pageQuery = searchParams.get("page")
	const [page, setPage] = useState(Number(pageQuery) || 1)
	const { getProjectsQuery } = useProjects()
	const { data, isPending, error } = getProjectsQuery({
		page: String(page),
		...Object.fromEntries(searchParams)
	})

	if (error) return showErrorMessage(error)

	useEffect(() => {
		setPage(Number(pageQuery))
	}, [pageQuery])

	return (
		<div className='container mt-15'>
			<h3 className='text-2xl font-semibold'>Список проектов</h3>
			<div
				className={cn(
					"mt-8 grid gap-8 nth-[3]:row-span-3 lg:grid-cols-2",
					className
				)}
			>
				{isPending ? (
					[...new Array(8)].map((_, index) => (
						<Skeleton key={index} className='h-100 w-full' />
					))
				) : data.items.length > 0 ? (
					data.items.map(project => (
						<PostItemWrapper
							
							key={project.id}
							item={project as unknown as PostResponse}
							model={EModels.projects}
							onSuccess={() =>
								queryClient.invalidateQueries({
									queryKey: ["get projects", searchParams]
								})
							}
							isAdminPage={isAdminPage}
						/>
					))
				) : (
					<p className='col-span-4 text-center text-gray-500'>
						Проекты не найдены!
					</p>
				)}
			</div>
			{data && (
				<PaginationButtons page={page} totalPages={data?.totalPages} />
			)}
		</div>
	)
}
