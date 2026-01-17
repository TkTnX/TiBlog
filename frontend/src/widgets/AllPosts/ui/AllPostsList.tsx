"use client"

import { PostItem } from "@/src/entities"
import { PaginationButtons } from "@/src/features"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { usePosts } from "@/src/shared/hooks"

export const AllPostsList = () => {
	const { getPostsQuery } = usePosts()
	const { data, isPending, error } = getPostsQuery()

	if (error) return showErrorMessage(error)
	
	return (
		<section className='container mt-15'>
			<h2 className='text-2xl font-semibold'>Все посты</h2>
			<div className='border-gray/30 mt-8 grid gap-x-4 gap-y-6 border-b pb-7.5 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-12'>
				{isPending
					? [...new Array(6)].map((_, index) => (
							<Skeleton className='h-100 w-full' key={index} />
						))
					: data.items.map(post => <PostItem key={post.id} post={post} />)}
			</div>
			<PaginationButtons />
		</section>
	)
}
