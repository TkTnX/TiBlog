import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { getMe } from "@/src/shared/api"

export function useUser() {
    const token = Cookies.get('accessToken')
	const getMeQuery = () =>
		useQuery({
			queryKey: ["get me"],
            queryFn: () => getMe(),
            enabled: !!token
		})

	return {
		getMeQuery
	}
}
