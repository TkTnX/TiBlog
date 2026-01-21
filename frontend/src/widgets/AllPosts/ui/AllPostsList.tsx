"use client"

import { useSearchParams } from "next/navigation"

import { PostItem } from "@/src/entities"
import { PaginationButtons } from "@/src/features"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { usePosts } from "@/src/shared/hooks"

interface Props {
	limit: number
}

export const AllPostsList = ({ limit }: Props) => {
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
			<div className='border-gray/30 mt-8 grid gap-x-4 gap-y-6 border-b pb-7.5 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-12'>
				{isPending
					? [...new Array(6)].map((_, index) => (
							<Skeleton className='h-100 w-full' key={index} />
						))
					: data.items.map(post => (
							<PostItem key={post.id} post={post} />
						))}
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
