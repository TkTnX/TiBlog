import classNames from "classnames"
import { ArrowUpRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Props {
	className?: string
}

export const PostItem = ({ className }: Props) => {
	const now = new Date()
	return (
		<Link
			href={"/blog/1"}
			className={classNames("flex flex-col gap-8 group", className)}
		>
			<div className='relative w-full h-50 lg:max-w-xl '>
				<Image
					className='object-cover'
					src={"/images/temp/post.jpg"}
					fill
					alt='Пост 1'
				/>
			</div>
			<div>
				<p className='text-[#6941c6] text-sm'>
					{now.toLocaleDateString("ru-RU", {
						day: "2-digit",
						month: "short",
						year: "numeric"
					})}
				</p>
				<div className='mt-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-2xl font-semibold'>
							UX review presentations
						</h4>
						<ArrowUpRightIcon className='group-hover:scale-120 transition' />
					</div>
					<p className='text-gray mt-3'>
						How do you create compelling presentations that wow your
						colleagues and impress your managers?
					</p>
				</div>
				<div className='flex flex-wrap items-center gap-2 mt-6'>
					<p className='rounded-2xl py-0.5 px-2.5 text-[#6941c6] bg-[#f9f5ff]'>
						Design
					</p>
					<p className='rounded-2xl py-0.5 px-2.5 text-[#3538cd] bg-[#eef4ff]'>
						Research
					</p>
					<p className='rounded-2xl py-0.5 px-2.5 text-[#c11574] bg-[#fdf2fa]'>
						Presentation
					</p>
				</div>
			</div>
		</Link>
	)
}
