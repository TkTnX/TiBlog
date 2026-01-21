import { useQuery } from "@tanstack/react-query"

import { getCategoryByPostId } from "@/src/shared/api"
import { ICategory } from "@/src/shared/types"

export function useCategories() {
	const getCategoryByPostIdQuery = (id: string) =>
		useQuery({
			queryKey: ["get category by post id", id],
			queryFn: (): Promise<ICategory> => getCategoryByPostId(id)
		})

	return {
		getCategoryByPostIdQuery
	}
}
