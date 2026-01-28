import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



import { createCategory, getCategories, getCategoryByPostId } from "@/src/shared/api";
import { AddCategoryVariables } from "@/src/shared/schemas";
import { CategoryResponse } from "@/src/shared/types";











export function useCategories() {
	const queryClient = useQueryClient()

	const getCategoriesQuery = () =>
		useQuery({
			queryKey: ["get categories"],
			queryFn: (): Promise<CategoryResponse[]> => getCategories()
		})

	const getCategoryByPostIdQuery = (id: string) =>
		useQuery({
			queryKey: ["get category by post id", id],
			queryFn: (): Promise<CategoryResponse> => getCategoryByPostId(id)
		})

	const createCategoryMutation = () =>
		useMutation({
			mutationFn: (body: AddCategoryVariables) => createCategory(body),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["get categories"] })
		})

	return {
		getCategoryByPostIdQuery,
		getCategoriesQuery,
		createCategoryMutation
	}
}
