import { useQuery } from "@tanstack/react-query"

import { getPostById, getPosts } from "@/src/shared/api"
import { IPost } from "@/src/shared/types"

// TODO: В будущем добавить авто типизацию через swagger
export function usePosts() {
	const getPostsQuery = (query?: Record<string, string>) =>
		useQuery({
			queryKey: ["posts", query],
			queryFn: (): Promise<{
				items: IPost[]
				totalPages: number
				page: number
			}> => getPosts(query)
		})

	const getPostByIdQuery = (id: string) =>
		useQuery({
			queryKey: ["post", id],
			queryFn: (): Promise<IPost> => getPostById(id)
		})

	return {
		getPostsQuery,
		getPostByIdQuery
	}
}
