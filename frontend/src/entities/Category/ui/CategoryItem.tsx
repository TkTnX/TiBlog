import classNames from "classnames";



import { ICategory } from "@/src/shared/types";








interface Props {
  category: ICategory
}

export const CategoryItem = ({ category }: Props) => {
  return (
		<p
			className={classNames(
				`rounded-2xl bg-[${category.color}/40] px-2.5 py-0.5 text-[${category.color}]`
			)}
		>
			{category.name}
		</p>
  )
}
