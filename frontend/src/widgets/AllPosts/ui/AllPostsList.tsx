"use client"

import { useQueryClient } from "@tanstack/react-query"
import classNames from "classnames"
import { useSearchParams } from "next/navigation"

import { PostItem, PostItemWrapper } from "@/src/entities"
import { DeleteButton, PaginationButtons } from "@/src/features"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { usePosts } from "@/src/shared/hooks"
import { EModels } from "@/src/shared/types"

interface Props {
	limit?: number
	className?: string
	isAdminPage?: boolean
}

export const AllPostsList = ({
	limit,
	className,
	isAdminPage = false
}: Props) => {
	const queryClient = useQueryClient()
	const searchParams = useSearchParams()
	const { getPostsQuery } = usePosts()
	const { data, isPending, error } = getPostsQuery({
		page: searchParams.get("page") || "1",
		limit: String(limit),
		...Object.fromEntries(searchParams)
	})

	if (error) return showErrorMessage(error)
	return (
		<section className='container mt-15'>
			<h2 className='text-2xl font-semibold'>Все посты</h2>
			<div
				className={classNames(
					"border-gray/30 mt-8 grid gap-x-4 gap-y-6 border-b pb-7.5 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-12",
					className
				)}
			>
				{isPending ? (
					[...new Array(6)].map((_, index) => (
						<Skeleton className='h-100 w-full' key={index} />
					))
				) : data.items.length > 0 ? (
					data.items.map(post => (
						<PostItemWrapper
							model={EModels.posts}
							key={post.id}
							onSuccess={() =>
								queryClient.invalidateQueries({
									queryKey: ["posts", searchParams]
								})
							}
							item={post}
							isAdminPage={isAdminPage}
						/>
					))
				) : (
					<p>Ничего не найдено!</p>
				)}
			</div>
			{data && (
				<PaginationButtons
					page={Number(data.page)}
					totalPages={data.totalPages}
				/>
			)}
		</section>
	)
}
