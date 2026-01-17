import { useQuery } from "@tanstack/react-query"

import { getPosts } from "@/src/shared/api"
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

	return {
		getPostsQuery
	}
}
