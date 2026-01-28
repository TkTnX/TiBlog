"use client"
import { User } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

import { useUsers } from "@/src/shared/hooks"
import { useUserStore } from "@/src/shared/stores/useUserStore"

export const UserButton = () => {
	const { getMeQuery } = useUsers()
	const { data } = getMeQuery()
	const { setUser, user } = useUserStore()
	useEffect(() => {
		setUser(data)
	}, [data, setUser])


	if (user && user.role === "ADMIN")
		return (
			<Link className='text-lg xl:text-xl' href={"/admin"}>
				Админ
			</Link>
		)

	if (user) return null
	return (
		<Link href={"/auth/login"}>
			<User />
		</Link>
	)
}
