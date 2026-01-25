"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

import { MobileMenu } from "@/src/shared/components/menu"

export const MenuButton = () => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='vsm:hidden relative block'
			>
				<Menu />
			</button>
			<MobileMenu open={open} setOpen={setOpen} />
		</>
	)
}
