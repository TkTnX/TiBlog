import classNames from "classnames";
import Link from "next/link";



import { UserButton } from "./UserButton";
import { ThemeChangeButton } from "@/src/features";
import { NAV_ITEMS } from "@/src/shared/constants";












interface Props {
	className?: string
	onClose?: () => void
}

export const Navbar = ({ className, onClose }: Props) => {
	return (
		<nav
			className={classNames(
				"vsm:flex hidden items-center gap-1 sm:gap-5.5",
				className
			)}
		>
			<ul className='vsm:flex-row flex flex-col items-center gap-3 sm:gap-5.5'>
				{NAV_ITEMS.map((item, index) => (
					<li key={index}>
						<Link
							onClick={onClose} 
							className='sm:text-lg xl:text-xl'
							href={item.href}
						>
							{item.name}
						</Link>
					</li>
				))}
				<li>
					<UserButton />
				</li>
			</ul>
			<ThemeChangeButton />
		</nav>
	)
}
