import { axiosInstance } from "@/src/shared/libs";
import { PostRequest } from "@/src/shared/types";







export async function getPosts(query?: Record<string, string>) {
	const { data } = await axiosInstance.get("posts", { params: query })
	return data
}

export async function getPostById(id: string) {
	const { data } = await axiosInstance.get(`posts/${id}`)
	return data
}

export async function createPost(body: PostRequest) {
	const { data } = await axiosInstance.post("posts", body)
	return data
}