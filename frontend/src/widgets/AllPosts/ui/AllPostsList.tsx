import { PostItem } from "@/src/entities"
import { PaginationButtons } from "@/src/features"

export const AllPostsList = () => {
	return (
		<section className='container mt-15'>
			<h2 className='text-2xl font-semibold'>Все посты</h2>
			<div className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-12 border-b border-gray/30 pb-7.5'>
				<PostItem />
				<PostItem />
				<PostItem />
				<PostItem />
				<PostItem />
				<PostItem />
			</div>
			<PaginationButtons />
		</section>
	)
}
