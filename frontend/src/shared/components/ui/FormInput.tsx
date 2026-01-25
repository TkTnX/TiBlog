/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames"
import { InputHTMLAttributes } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

import { ErrorMessage } from "../ErrorMessage"

interface Props<
	T extends Record<string, any>
> extends InputHTMLAttributes<HTMLInputElement> {
	register?: UseFormRegister<T>
	name: keyof T & string
	errors?: FieldErrors<FieldValues>
}

export const FormInput = <T extends FieldValues>({
	register,
	name,
	errors,
	...props
}: Props<T>) => {
	return (
		<div className='flex w-full flex-1 flex-col gap-1'>
			<input
				{...register?.(name as any)}
				{...props}
				className={classNames(
					"rounded-lg border px-2 py-4 disabled:opacity-50 disabled:pointer-events-none",
					props.className
				)}
			/>
			{errors && errors[name] && (
				<ErrorMessage
					className='my-0! p-4 text-xs'
					text={
						(errors[name]?.message as string) ||
						"Что-то пошло не так!"
					}
				/>
			)}
		</div>
	)
}
