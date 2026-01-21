import { BigPostItem } from "@/src/entities"
import { SimillarPostsList } from "@/src/widgets"

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id

	return (
		<div className='container mt-15 flex items-start gap-8'>
			<SimillarPostsList postId={id} />
			<BigPostItem id={id} />
		</div>
	)
}

export default PostPage
