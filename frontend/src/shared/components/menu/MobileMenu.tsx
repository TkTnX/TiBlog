import classNames from "classnames"
import { X } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

import { Navbar } from "@/src/widgets"

interface Props {
	setOpen: (bool: boolean) => void
	open: boolean
}

export const MobileMenu = ({ setOpen, open }: Props) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden"
		}

		return () => {
			document.body.style.overflow = "visible"
		}
	}, [open])

	const onClose = () => setOpen(false)
	return (
		<div
			className={classNames(
				`bg-background fixed inset-0 z-10 -translate-x-full transition-transform duration-300 ease-in-out will-change-transform`,
				{ "translate-x-0": open }
			)}
		>
			<button
				onClick={onClose}
				className='absolute bottom-5 left-1/2 -translate-x-1/2'
			>
				<X />
			</button>
			<div className='flex h-screen flex-col items-center justify-center gap-10'>
				<Link
					onClick={onClose}
					href={"/"}
					className='text-lg font-semibold'
				>
					TiBlog
				</Link>
				<Navbar onClose={onClose} className='flex! flex-col gap-10' />
			</div>
		</div>
	)
}
