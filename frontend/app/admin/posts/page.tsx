import { AddPost, AllPostsList } from "@/src/widgets"

const AdminPostsPage = () => {
	return (
		<section className='container mt-10 flex items-start gap-10'>
			<AllPostsList isAdminPage={true} className='flex! flex-col' />
			<AddPost />
		</section>
	)
}

export default AdminPostsPage
