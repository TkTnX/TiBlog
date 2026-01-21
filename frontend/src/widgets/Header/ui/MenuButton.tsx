"use client"

import { Navbar } from "."
import { Menu, X } from "lucide-react"

// TODO: Сделать меню
export const MenuButton = () => {
	return (
		<>
			<button className='vsm:hidden relative block'>
				<Menu />
			</button>
		</>
	)
}
