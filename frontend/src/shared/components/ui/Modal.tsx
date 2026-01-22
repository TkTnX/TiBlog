"use client"
import classNames from "classnames"
import { X } from "lucide-react"
import { useEffect } from "react"

interface Props {
	children: React.ReactNode
	open: boolean
	setOpen: (bool: boolean) => void
	className?: string
	title: string
}

export const Modal = ({ children, open, setOpen, className, title }: Props) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden"
		}

		return () => {
			document.body.style.overflow = "visible"
		}
	}, [open])

	return (
		<div className='fixed inset-0 z-20 flex items-center justify-center bg-gray-500/40'>
			<div
				className={classNames(
					"bg-background mx-auto min-w-100 rounded-2xl p-4",
					className
				)}
			>
				<div className='flex items-center justify-between gap-5'>
					<h3 className='text-2xl font-semibold'>{title}</h3>
					<button onClick={() => setOpen(false)}>
						<X />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}
