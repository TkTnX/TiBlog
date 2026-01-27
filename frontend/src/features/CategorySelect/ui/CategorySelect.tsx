"use client"

import { Dispatch, SetStateAction } from "react"

import { CategoryItem } from "@/src/entities"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { useCategories } from "@/src/shared/hooks"

interface Props {
	setCategories: Dispatch<SetStateAction<string[]>>
	categories: string[]
	className?: string
}
export const CategorySelect = ({ setCategories, className }: Props) => {
	const { getCategoriesQuery } = useCategories()
	const { data, isPending, error } = getCategoriesQuery()
	if (error) return showErrorMessage(error)

	const onClick = (id: string) => {
		setCategories((prev: string[]) => {
			if (prev.includes(id)) {
				return prev.filter((cat: string) => cat !== id)
			}
			return [...prev, id]
		})
	}

	return (
		<div className={className}>
			<p className='title'>Категории</p>
			<div className='mt-4 flex flex-wrap gap-2'>
				{isPending
					? [...new Array(5)].map((_, index) => (
							<Skeleton key={index} className='h-5 w-10' />
						))
					: data.map(category => (
							<label
								className='flex cursor-pointer items-center gap-1 rounded-2xl px-4 py-2'
								key={category.id}
							>
								<input
									type='checkbox'
									onChange={() => onClick(category.id)}
									value={category.id}
								/>
								<CategoryItem category={category} />
							</label>
						))}
			</div>
		</div>
	)
}
