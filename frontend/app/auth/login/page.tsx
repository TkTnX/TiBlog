import { AuthForm } from "@/src/widgets"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "TiBlog | Вход в аккаунт",
	description: "Вход в аккаунт на сайте TiBlog"
}

const LoginPage = () => {
	return <AuthForm type="login" />
}

export default LoginPage
