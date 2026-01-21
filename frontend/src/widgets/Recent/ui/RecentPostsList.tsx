"use client"
import { PostItem } from "@/src/entities"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { usePosts } from "@/src/shared/hooks"

export const RecentPostsList = () => {
	const { getPostsQuery } = usePosts()
	const { data, isPending, error } = getPostsQuery({ limit: "4" })

	if (error) return showErrorMessage(error)

	return (
		<section className='container mt-15'>
			<h2 className='text-2xl font-semibold'>Недавние посты</h2>
			<div className='mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2'>
				{isPending ? (
					<Skeleton className='row-span-3 h-108' />
				) : (
					<PostItem post={data.items[0]} className='row-span-3' />
				)}

				<div className='flex flex-col gap-8'>
					{isPending
						? [...new Array(2)].map((_, index) => (
								<Skeleton className='h-50' key={index} />
							))
						: data.items.length >= 2 && (
								<>
									<PostItem
										post={data.items[1]}
										className='gap-6 sm:flex-row'
									/>
									<PostItem
										post={data.items[2]}
										className='gap-6 sm:flex-row'
									/>
								</>
							)}
				</div>

				{isPending ? (
					<Skeleton className='h-75 lg:col-span-3' />
				) : (
					data.items.length >= 4 && (
						<PostItem
							post={data.items[3]}
							className='lg:col-span-3 lg:flex-row'
						/>
					)
				)}
			</div>
		</section>
	)
}
