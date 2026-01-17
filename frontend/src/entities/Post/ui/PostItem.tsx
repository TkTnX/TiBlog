import classNames from "classnames"
import { ArrowUpRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { CategoryItem } from "@/src/entities/Category"
import { IPost } from "@/src/shared/types"

interface Props {
	post: IPost
	className?: string
}

export const PostItem = ({ className, post }: Props) => {
	return (
		<Link
			href={`/blog/${post.id}`}
			className={classNames("group flex flex-col gap-8", className)}
		>
			<div className='relative h-50 w-full lg:max-w-xl'>
				<Image
					className='object-cover'
					src={post.preview}
					fill
					alt={post.title}
				/>
			</div>
			<div>
				<p className='text-sm text-[#6941c6]'>
					{new Date(post.createdAt).toLocaleDateString("ru-RU", {
						day: "2-digit",
						month: "short",
						year: "numeric"
					})}
				</p>
				<div className='mt-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-2xl font-semibold'>{post.title}</h4>
						<ArrowUpRightIcon className='transition group-hover:scale-120' />
					</div>
					<p className='text-gray mt-3'>{post.content}</p>
				</div>
				<div className='mt-6 flex flex-wrap items-center gap-2'>
					{post.categories.map(category => (
						<CategoryItem key={category.id} category={category} />
					))}
				</div>
			</div>
		</Link>
	)
}
