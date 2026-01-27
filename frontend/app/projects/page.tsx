import { Metadata } from "next"

import { Filters } from "@/src/features"
import { ProjectsList } from "@/src/widgets"

export const metadata: Metadata = {
	title: "TiBlog | Список проектов",
	description: "Список проектов Тимура"
}

const ProjectsPage = () => {
	return (
		<section className='mt-8'>
			<h1 className='vsm:text-7xl border-y border-y-[#a8a8a8] py-8 text-center text-6xl font-bold sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[240px]'>
				Проекты
			</h1>
			<Filters className='container mt-10' />
			<ProjectsList />
		</section>
	)
}

export default ProjectsPage
