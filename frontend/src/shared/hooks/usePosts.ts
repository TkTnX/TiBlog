import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { createPost, getPostById, getPosts } from "@/src/shared/api"
import { PostRequest, PostResponse } from "@/src/shared/types"

export function usePosts() {
	const router = useRouter()
	const getPostsQuery = (query?: Record<string, string>) =>
		useQuery({
			queryKey: ["posts", query],
			queryFn: (): Promise<{
				items: PostResponse[]
				totalPages: number
				page: number
			}> => getPosts(query)
		})

	const getPostByIdQuery = (id: string) =>
		useQuery({
			queryKey: ["post", id],
			queryFn: (): Promise<PostResponse> => getPostById(id)
		})

	const createPostMutation = () =>
		useMutation({
			mutationKey: ["create post"],
			mutationFn: (data: PostRequest) => createPost(data),
			onSuccess: (post: PostResponse) => {
				router.push(`/blog/${post.id}`)
			}
		})

	return {
		getPostsQuery,
		getPostByIdQuery,
		createPostMutation
	}
}
