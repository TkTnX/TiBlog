"use client"
import { PostItem } from "@/src/entities"
import { Skeleton } from "@/src/shared/components"
import { useCategories } from "@/src/shared/hooks"

interface Props {
	postId: string
}

export const SimillarPostsList = ({ postId }: Props) => {
	const { getCategoryByPostIdQuery } = useCategories()
	const { data, isPending, error } = getCategoryByPostIdQuery(postId)

	if ((!isPending && !data?.posts) || error) return null
	return (
		<div className='hidden max-w-60 md:block lg:w-85'>
			<h5 className='text-2xl font-semibold'>Похожие посты</h5>
			<div className='mt-8 flex w-full flex-col gap-8'>
				{isPending
					? [...new Array(5)].map((_, index) => (
							<Skeleton key={index} className='h-110 w-full' />
						))
					: data.posts!.map(post => (
							<PostItem post={post} key={post.id} />
						))}
			</div>
		</div>
	)
}
