"use client"
import Link from "next/link"
import { UseFormRegister } from "react-hook-form"

import { FormInput } from "@/src/shared/components"
import { useAuth } from "@/src/shared/hooks"
import { RegisterType } from "@/src/shared/schemas"

interface Props<T extends "login" | "register"> {
	type: T
}

export const AuthForm = <T extends "login" | "register">({
	type
}: Props<T>) => {
	const isLogin = type === "login" ? true : false

	const { form, onSubmit, isPending } = useAuth(isLogin)
	const {
		handleSubmit,
		formState: { errors },
		register
	} = form

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='container mx-auto mt-20 flex max-w-100! flex-col items-center justify-center gap-4 rounded-lg border px-4 py-2'
		>
			<h3 className='text-2xl font-bold'>
				{isLogin ? "Вход в аккаунт" : "Регистрация"}
			</h3>
			{!isLogin && (
				<FormInput
					disabled={isPending}
					errors={errors}
					name='username'
					register={
						register as unknown as UseFormRegister<RegisterType>
					}
					placeholder='Имя пользователя'
				/>
			)}

			<FormInput
				disabled={isPending}
				errors={errors}
				register={register}
				name='email'
				placeholder='Почта'
			/>
			<FormInput
				disabled={isPending}
				errors={errors}
				register={register}
				name='password'
				placeholder='Пароль'
			/>
			<button
				disabled={isPending}
				className='bg-violet w-full rounded-2xl px-4 py-2 text-center text-white transition hover:opacity-80'
			>
				{isLogin ? "Войти" : "Регистрация"}
			</button>
			{isLogin ? (
				<p>
					Ещё нет аккаунта?{" "}
					<Link
						href={"/auth/register"}
						className='text-violet underline'
					>
						Регистрация
					</Link>
				</p>
			) : (
				<p>
					Уже есть аккаунт?{" "}
					<Link
						href={"/auth/login"}
						className='text-violet underline'
					>
						Войти
					</Link>
				</p>
			)}
		</form>
	)
}
