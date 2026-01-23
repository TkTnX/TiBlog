import { User } from "lucide-react"

import { IComment } from "@/src/shared/types"

interface Props {
	comment: IComment
}

export const CommentItem = ({ comment }: Props) => {
	return (
		<div className=''>
			<div className='mt-2 flex items-center gap-2'>
				<User size={24} className='rounded-2xl border' />
				<h5>{comment.user?.username || "Аноним"}</h5>
			</div>
			<p className='pl-8 text-sm text-gray-400'>{comment.text}</p>
		</div>
	)
}
