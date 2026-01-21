import { Metadata } from "next"

import { PostsSort } from "@/src/features"
import { AllPostsList } from "@/src/widgets"

export const metadata: Metadata = {
	title: "TiBlog | Все посты"
}

const BlogPage = async () => {
	return (
		<>
			<PostsSort />
			<AllPostsList limit={9} />
		</>
	)
}

export default BlogPage
