import { AddProject, ProjectsList } from "@/src/widgets"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "TiBlog | Админ-панель",
	description: "TiBlog | Управление сайтом",
	robots: {
		index: false,
		follow: false
	}
}

const AdminProjectsPage = () => {
	return (
		<section className='container mt-10 flex flex-col-reverse items-start gap-10 lg:flex-row'>
			<ProjectsList isAdminPage={true} className={"flex! flex-col"} />
			<AddProject />
		</section>
	)
}

export default AdminProjectsPage
