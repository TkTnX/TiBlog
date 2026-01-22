import { axiosInstance } from "@/src/shared/libs"
import { LoginType, RegisterType } from "@/src/shared/schemas"

export async function register(values: RegisterType) {
	const { data } = await axiosInstance.post("auth/register", values)

	return data.access_token
}

export async function login(values: LoginType) {
	const { data } = await axiosInstance.post("auth/login", values)
	return data.access_token
}
