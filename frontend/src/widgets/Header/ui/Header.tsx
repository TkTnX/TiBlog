import { Navbar } from "."
import { Menu } from "lucide-react"
import Link from "next/link"

export const Header = () => {
	return (
		<header className='container mt-7.5 h-15 flex items-center justify-between'>
			<Link href={"/"} className='text-lg xl:text-xl font-semibold'>
				TiBlog
			</Link>

			<div>
				<button className='block vsm:hidden'>
					<Menu />
				</button>
			</div>
			<Navbar />
		</header>
	)
}
