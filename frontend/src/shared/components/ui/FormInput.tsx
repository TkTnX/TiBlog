/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";









interface Props<T extends Record<string, any>> extends InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegister<T>
    name: keyof T & string
}

export const FormInput = <T extends FieldValues>({ register, name, ...props }: Props<T>) => {
	return (
		<input
			{...register(name as any)}
			{...props}
			className={classNames("flex-1 px-2 py-4", props.className)}
		/>
	)
}
