import { useQuery } from "@tanstack/react-query"

import { getProjects } from "@/src/shared/api"
import { IProject } from "@/src/shared/types"

export function useProjects() {
	const getProjectsQuery = (query?: Record<string, string>) =>
		useQuery({
			queryKey: ["get projects", query],
			queryFn: (): Promise<{
				totalPages: number
				items: IProject[]
				totalProjects: number
			}> => getProjects(query)
		})

	return { getProjectsQuery }
}
