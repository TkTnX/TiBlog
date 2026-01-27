import { Metadata } from "next"

import { Filters, PostsSort } from "@/src/features"
import { AllPostsList } from "@/src/widgets"

export const metadata: Metadata = {
	title: "TiBlog | Все посты"
}

const BlogPage = async () => {
	return (
		<>
			<div className='container mt-10 flex items-center justify-between gap-2'>
				<PostsSort />
				<Filters />
			</div>
			<AllPostsList limit={9} />
		</>
	)
}

export default BlogPage
