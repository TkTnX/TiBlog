import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { createProject, getProjects } from "@/src/shared/api"
import { IProject, IProjectRequest } from "@/src/shared/types"

export function useProjects() {
	const router = useRouter()
	const getProjectsQuery = (query?: Record<string, string>) =>
		useQuery({
			queryKey: ["get projects", query],
			queryFn: (): Promise<{
				totalPages: number
				items: IProject[]
				totalProjects: number
			}> => getProjects(query)
		})

	const createProjectMutation = () =>
		useMutation({
			mutationKey: ["create post"],
			mutationFn: (data: IProjectRequest) => createProject(data),
			onSuccess: (project: IProject) => {
				router.push(`/projects/${project.id}`)
			}
		})

	return { getProjectsQuery, createProjectMutation }
}
