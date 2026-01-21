import { Eye } from "lucide-react"

import { LikeButton } from "@/src/features"
import { IPost } from "@/src/shared/types"

interface Props {
	post: IPost
}

export const BigPostControls = ({ post }: Props) => {
	return (
		<div className='mt-8 flex flex-wrap items-center gap-4'>
			<div className='flex items-center gap-1 text-sm text-gray-500'>
				<Eye />
				<p>{post.views}</p>
			</div>

			<LikeButton id={post.id} likes={post._count.likes} />
			{/* TODO: При нажатии открывать модалку */}
			<button className='hover:bg-violet hover:text-background flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 md:flex-0'>
				<span>{post.comments.length}</span> | <span>Комментарии</span>
			</button>
		</div>
	)
}
