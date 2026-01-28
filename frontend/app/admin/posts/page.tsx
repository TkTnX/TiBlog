import { Metadata } from "next"
import { AddPost, AllPostsList } from "@/src/widgets"

export const metadata: Metadata = {
	title: "TiBlog | Админ-панель",
	description: "TiBlog | Управление сайтом",
	robots: {
		index: false,
		follow: false
	}
}

const AdminPostsPage = () => {
	return (
		<section className='container mt-10 flex items-start gap-10'>
			<AllPostsList isAdminPage={true} className='flex! flex-col' />
			<AddPost />
		</section>
	)
}

export default AdminPostsPage
