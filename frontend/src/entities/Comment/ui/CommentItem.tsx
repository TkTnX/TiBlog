import { User } from "lucide-react"
import Image from "next/image"

import { IComment } from "@/src/shared/types"

interface Props {
	comment: IComment
}

export const CommentItem = ({ comment }: Props) => {
	return (
		<div className=''>
			<div className='mt-2 flex items-center gap-2'>
				{comment.user?.avatar ? (
					<Image
						src={comment.user.avatar}
						alt={comment.user.name}
						width={24}
						height={24}
						className='rounded-full'
					/>
				) : (
					<User size={24} className='rounded-2xl border' />
				)}
				<h5>{comment.user?.name || "Аноним"}</h5>
			</div>
			<p className='pl-8 text-sm text-gray-400'>{comment.text}</p>
		</div>
	)
}
