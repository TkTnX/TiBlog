import { Metadata } from "next"

import { PostItem } from "@/src/entities"

export const metadata: Metadata = {}

const ProjectsPage = () => {
	return (
		<section className='mt-8'>
			<h1 className='vsm:text-7xl border-y border-y-[#a8a8a8] py-8 text-center text-6xl font-bold sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[240px]'>
				Проекты
			</h1>
			<div className='container mt-15'>
				<h3 className='text-2xl font-semibold'>Список проектов</h3>
				<div className='mt-8 grid gap-8 nth-[3]:row-span-3 lg:grid-cols-2'>
					{[...new Array(8)].map((_, index) => (
						<PostItem
							className='lg:nth-[3n]:col-span-2'
							post={{
								title: "User Experience Design Dashboard Hotel Management",
								views: 0,
								createdAt: new Date(),
								updatedAt: new Date(),
								categories: [],
								comments: [],
								_count: { likes: 0 },
								content:
									"n the context of user experience (UX) design, a hotel management dashboard should be designed with the needs and goals of the hotel staff in mind. This means creating a clear and intuitive interface that allows staff to easily access and use the various tools and features of the dashboard.",
								id: "123",
								preview: "/images/temp/post.jpg"
							}}
							key={index}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default ProjectsPage
