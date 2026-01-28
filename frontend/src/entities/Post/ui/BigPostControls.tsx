import { Eye } from "lucide-react"
import { useState } from "react"

import { LikeButton } from "@/src/features"
import { CommentsModal } from "@/src/shared/components/modals"
import { PostResponse } from "@/src/shared/types"

interface Props {
	post: PostResponse
}

export const BigPostControls = ({ post }: Props) => {
	const [openComments, setOpenComments] = useState(false)
	return (
		<>
			<div className='mt-8 flex flex-wrap items-center gap-4'>
				<div className='flex items-center gap-1 text-sm text-gray-500'>
					<Eye />
					<p>{post.views}</p>
				</div>

				<LikeButton id={post.id} likes={post._count.likes} />
				<button
					onClick={() => setOpenComments(true)}
					className='hover:bg-violet hover:text-background flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 md:flex-0'
				>
					<span>{post.comments.length}</span> |{" "}
					<span>Комментарии</span>
				</button>
			</div>
			{openComments && (
				<CommentsModal
					postId={post.id}
					comments={post.comments}
					open={openComments}
					setOpen={setOpenComments}
				/>
			)}
		</>
	)
}
