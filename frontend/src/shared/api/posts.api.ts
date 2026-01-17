import { axiosInstance } from "@/src/shared/libs"

export async function getPosts(query?: Record<string, string>) {
	const { data } = await axiosInstance.get("posts", { params: query })
	return data
}
