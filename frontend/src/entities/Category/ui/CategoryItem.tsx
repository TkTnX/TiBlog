import classNames from "classnames"

import { ICategory } from "@/src/shared/types"

interface Props {
	category: ICategory
}

export const CategoryItem = ({ category }: Props) => {
	return (
		<p
			style={{
				backgroundColor: `${category.color}40`,

				color: category.color
			}}
			className={classNames(` rounded-2xl px-2.5 py-0.5`)}
		>
			{category.name}
		</p>
	)
}
