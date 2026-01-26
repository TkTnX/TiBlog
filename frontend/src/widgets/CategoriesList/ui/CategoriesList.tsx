"use client"

import { CategoryItem } from "@/src/entities"
import { DeleteButton } from "@/src/features"
import { Skeleton } from "@/src/shared/components"
import { showErrorMessage } from "@/src/shared/helpers"
import { useCategories } from "@/src/shared/hooks"
import { EModels } from "@/src/shared/types"
import { useQueryClient } from "@tanstack/react-query"

export const CategoriesList = () => {
	const queryClient = useQueryClient()
	const { getCategoriesQuery } = useCategories()
	const { data, isPending, error } = getCategoriesQuery()

	if (error) return showErrorMessage(error)

	return (
		<div className='flex-1'>
			<h4 className='text-xl'>Список категорий</h4>
			<div className='mt-5 flex flex-wrap items-center gap-5'>
				{isPending
					? [...new Array(5)].map((_, index) => (
							<Skeleton className='h-10 max-w-20' key={index} />
						))
					: data.map(cat => (
							<DeleteButton onSuccess={() => queryClient.invalidateQueries({queryKey: ["get categories"]})} key={cat.id} id={cat.id} model={EModels.categories}>
								<CategoryItem category={cat} key={cat.id} />
							</DeleteButton>
						))}
			</div>
		</div>
	)
}
