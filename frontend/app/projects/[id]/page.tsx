import { Metadata } from "next"

import { BigProjectItem } from "@/src/entities"

export const metadata: Metadata = {
	title: "TiBlog | Проект"
}

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id
	return (
		<div className='container mt-10'>
			<BigProjectItem id={id} />
		</div>
	)
}

export default ProjectPage
