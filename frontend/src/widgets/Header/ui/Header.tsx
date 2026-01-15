import { MenuButton, Navbar } from "."
import Link from "next/link"

export const Header = () => {
	return (
		<header className='container mt-7.5 flex h-15 items-center justify-between'>
			<Link href={"/"} className='text-lg font-semibold xl:text-xl'>
				TiBlog
			</Link>

			<MenuButton />
			<Navbar />
		</header>
	)
}
