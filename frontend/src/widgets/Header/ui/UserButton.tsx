import { User } from "lucide-react"
import Link from "next/link"

export const UserButton = () => {
	return (
		<Link href={"/auth/login"}>
			<User />
		</Link>
	)
}
