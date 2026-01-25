import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { createPost, getPostById, getPosts } from "@/src/shared/api"
import { IPost, IPostRequest } from "@/src/shared/types"

// TODO: В будущем добавить авто типизацию через swagger
export function usePosts() {
	const router = useRouter()
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

	const createPostMutation = () =>
		useMutation({
			mutationKey: ["create post"],
			mutationFn: (data: IPostRequest) => createPost(data),
			onSuccess: (post: IPost) => {
				router.push(`/blog/${post.id}`)
			}
		})

	return {
		getPostsQuery,
		getPostByIdQuery,
		createPostMutation
	}
}
