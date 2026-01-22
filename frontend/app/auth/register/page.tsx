import { Metadata } from "next"

import { AuthForm } from "@/src/widgets"

export const metadata: Metadata = {
	title: "TiBlog | Регистрация аккаунта",
	description: "Регистрация аккаунта на сайте TiBlog"
}

const RegisterPage = () => {
	return <AuthForm type='register' />
}

export default RegisterPage
