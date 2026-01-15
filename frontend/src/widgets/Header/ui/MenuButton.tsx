"use client"

import { Navbar } from "."
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure
} from "@chakra-ui/react"
import { Menu, X } from "lucide-react"
import { useRef } from "react"

export const MenuButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef(null)
	return (
		<>
			<button
				ref={btnRef}
				onClick={onOpen}
				className='vsm:hidden relative block'
			>
				<Menu />
			</button>
			<Drawer
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent className='h-screen'>
					<DrawerHeader className='relative'>
						<button
							onClick={onClose}
							className='absolute top-12 right-6'
						>
							<X />
						</button>
					</DrawerHeader>
					<DrawerBody>
						<Navbar className='flex! h-screen flex-col items-center justify-center bg-white' />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}
