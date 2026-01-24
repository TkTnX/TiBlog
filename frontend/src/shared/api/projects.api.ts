import { axiosInstance } from "@/src/shared/libs"

export async function getProjects(query?: Record<string, string>) {
	const { data } = await axiosInstance.get("projects", { params: query })
	return data
}
