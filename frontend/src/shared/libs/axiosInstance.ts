/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import Cookies from "js-cookie"

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

axiosInstance.interceptors.request.use(config => {
	const token = Cookies.get("accessToken")

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(p => {
		if (error) p.reject(error)
		else p.resolve(token)
	})

	failedQueue = []
}

axiosInstance.interceptors.response.use(
	res => res,
	async error => {
		const originalRequest = error.config
		
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				}).then(token => {
					originalRequest.headers.Authorization = `Bearer ${token}`
					return axiosInstance(originalRequest)
				})
			}
			originalRequest._retry = true
			isRefreshing = true

			try {
				const { data } = await axiosInstance.post("auth/refresh")
				Cookies.set("accessToken", data.accessToken)
				processQueue(null, data.accessToken)

				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
				return axiosInstance(originalRequest)
			} catch (error) {
				Cookies.remove("accessToken")
				return Promise.reject(error)
			} finally {
				isRefreshing = false
			}
		}
		return Promise.reject(error)
	}
)
