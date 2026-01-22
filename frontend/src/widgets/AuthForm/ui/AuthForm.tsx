import { useForm } from "react-hook-form"

import { FormInput } from "@/src/shared/components"

interface Props {
	type: "login" | "register"
}

export const AuthForm = ({ type }: Props) => {
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm()

	const onSubmit = values => {
		console.log(values)
	}

	const isLogin = type === "login" ? true : false
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='container mx-auto mt-20 flex max-w-100! flex-col items-center justify-center gap-4 rounded-lg border px-4 py-2'
		>
			<h3 className='text-2xl font-bold'>
				{isLogin ? "Вход в аккаунт" : "Регистрация"}
			</h3>
			<FormInput register={register} name='' />
		</form>
	)
}
