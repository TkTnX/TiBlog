import { Modal } from "../ui/Modal"

import { CommentItem } from "@/src/entities"
import { AddCommentForm } from "@/src/features"
import { IComment } from "@/src/shared/types"

interface Props {
	open: boolean
	setOpen: (bool: boolean) => void
	comments: IComment[]
	postId: string
}

export const CommentsModal = ({ open, setOpen, comments, postId }: Props) => {
	return (
		<Modal
			title={`Комментарии (${comments.length})`}
			open={open}
			setOpen={setOpen}
			className='max-w-200'
		>
			<AddCommentForm postId={postId} />
			{comments.length === 0 ? (
				<p className='my-10 text-center text-gray-500'>
					Комментариев нет!
				</p>
			) : (
				<div className='mt-4 flex max-h-100 flex-col gap-2 overflow-y-auto'>
					{comments.map(comment => (
						<CommentItem key={comment.id} comment={comment} />
					))}
				</div>
			)}
		</Modal>
	)
}
