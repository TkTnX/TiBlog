import { axiosInstance } from "@/src/shared/libs"
import { IProjectRequest } from "@/src/shared/types"

export async function getProjects(query?: Record<string, string>) {
	const { data } = await axiosInstance.get("projects", { params: query })
	return data
}

export async function createProject(body: IProjectRequest) {
	const { data } = await axiosInstance.post("projects", body)
	return data
}

export async function getProjectById(id: string) {
	const { data } = await axiosInstance.get(`projects/${id}`)
	return data
}