import { PostItem } from "@/src/entities"

export const RecentPostsList = () => {
	return (
		<section className='container mt-15'>
			<h2 className='text-2xl font-semibold'>Недавние посты</h2>
			<div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
				<PostItem className='row-span-3' />
				<div className='flex flex-col gap-8'>
					<PostItem className='sm:flex-row gap-6' />
					<PostItem className='sm:flex-row gap-6' />
				</div>
				<PostItem className='lg:col-span-3 lg:flex-row' />
			</div>
		</section>
	)
}
