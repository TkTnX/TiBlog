import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

axiosInstance.interceptors.response.use(
	res => res,
	async error => {
		const originalRequest = error.config


		if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("auth/refresh")) {
			originalRequest._retry = true

			try {
				await axiosInstance.post("auth/refresh")
				return axiosInstance(originalRequest)
			} catch {
				window.location.href = "/auth/login"
			}
		}

		return Promise.reject(error)
	}
)
