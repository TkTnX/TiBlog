import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"

import { login, register } from "@/src/shared/api"
import {
	LoginType,
	RegisterType,
	loginSchema,
	registerSchema
} from "@/src/shared/schemas"

export function useAuth(isLogin: boolean) {
	type AuthType = LoginType | RegisterType

	const registerMutation = useMutation({
		mutationKey: ["register"],
		mutationFn: (values: RegisterType) => register(values)
	})

	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: (values: LoginType) => login(values)
	})

	const form = useForm<AuthType>({
		resolver: zodResolver(isLogin ? loginSchema : registerSchema)
	})

	const onSubmit = (values: AuthType) => {
		if (isLogin) {
			loginMutation.mutate(values as LoginType, {
				onSuccess: (token: string) => {
					Cookies.set("accessToken", token, {
						expires: new Date(Date.now() + 1000 * 60 * 60 * 2)
					})
				}
			})
		} else {
			registerMutation.mutate(values as RegisterType, {
				onSuccess: (token: string) => {
					Cookies.set("accessToken", token, {
						expires: new Date(Date.now() + 1000 * 60 * 60 * 2)
					})
				}
			})
		}
	}

	return {
		form, onSubmit, isPending: registerMutation.isPending || loginMutation.isPending
	}
}
