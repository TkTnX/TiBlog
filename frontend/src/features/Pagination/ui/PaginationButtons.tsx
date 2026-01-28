"use client"
import classNames from "classnames"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface Props {
	page: number
	totalPages: number
}

export const PaginationButtons = ({ page, totalPages }: Props) => {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const router = useRouter()
	const onClick = (newValue: number) => {
		params.set("page", String(newValue))
		router.replace(`?${params}`, { scroll: false })
	}

	return (
		<div className='mt-5 flex flex-col items-center justify-between gap-5 sm:flex-row'>
			<button
				onClick={() => onClick(page - 1)}
				disabled={page === 1}
				className={classNames(
					"flex items-center gap-2 disabled:pointer-events-none disabled:opacity-50",
					[{ hidden: totalPages === 1 }]
				)}
			>
				<ArrowLeft className='text-gray' />
				<p className='text-gray text-sm'>Предыдущая</p>
			</button>
			<div className='flex items-center gap-0.5'>
				{[...new Array(totalPages)].map((_, index) => (
					<button
						onClick={() => onClick(index + 1)}
						key={index}
						className={classNames(
							"flex h-10 w-10 items-center justify-center rounded-lg transition",
							[
								{
									"bg-[#f9f5ff] text-[#7f56d9]":
										page === index + 1
								}
							]
						)}
					>
						{index + 1}
					</button>
				))}
			</div>
			<button
				onClick={() => onClick(page + 1)}
				disabled={page === totalPages}
				className={classNames(
					"flex items-center gap-2 disabled:pointer-events-none disabled:opacity-50",
					[{ hidden: totalPages === 1 }]
				)}
			>
				<p className='text-gray text-sm'>Следующая</p>
				<ArrowRight className='text-gray' />
			</button>
		</div>
	)
}
