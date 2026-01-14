"use client"
import classNames from "classnames"
import Image from "next/image"
import { useState } from "react"

export const ThemeChangeButton = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light")
	return (
		<button
			onClick={() =>
				setTheme(prev => (prev === "light" ? "dark" : "light"))
			}
			className={classNames(
				"flex items-center gap-4  py-2 px-4 rounded-full transition",
				theme === "light" ? "bg-background-dark" : "bg-background"
			)}
		>
			<div
				className={classNames({
					[" bg-background-dark rounded-full"]: theme === "dark"
				})}
			>
				<Image
					className={classNames("transition", {
						["opacity-0"]: theme === "dark"
					})}
					src={"/images/icons/sun.svg"}
					width={24}
					height={24}
					alt='Sun'
				/>
			</div>
			<div
				className={classNames({
					[" bg-white rounded-full"]: theme === "light"
				})}
			>
				<Image
					className={classNames("transition", {
						["opacity-0"]: theme === "light"
					})}
					src={"/images/icons/moon.svg"}
					width={24}
					height={24}
					alt='Moon'
				/>
			</div>
		</button>
	)
}
