import classNames from "classnames"

import { CategoryItem } from "@/src/entities"
import { ICategory } from "@/src/shared/types"

interface Props {
	categories: ICategory[]
	className?: string
}

export const ItemCategoriesList = ({ categories, className }: Props) => {
	return (
		<div
			className={classNames(
				"flex flex-wrap items-center gap-2",
				className
			)}
		>
			{categories.map(cat => (
				<CategoryItem category={cat} key={cat.id} />
			))}
		</div>
	)
}
