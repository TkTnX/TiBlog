"use client"
import classNames from "classnames"
import Image from "next/image"
import { useEffect, useState } from "react"

export const ThemeChangeButton = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light")

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || theme
		if (storedTheme === "dark") {
			setTheme("dark")
			document.body.classList.add("dark")
		} else {
			document.body.classList.remove("dark")
		}
	}, [theme])

	const onClick = () => {
		const newValue = theme === "light" ? "dark" : "light"
		localStorage.setItem("theme", newValue)
		setTheme(newValue)
	}

	console.log(theme)

	return (
		<button
			onClick={onClick}
			className={classNames(
				"flex items-center gap-4 rounded-full px-4 py-2 transition",
				theme === "light" ? "bg-background-dark" : "bg-white"
			)}
		>
			<div
				className={classNames({
					["bg-background-dark rounded-full"]: theme === "dark"
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
					["rounded-full bg-white"]: theme === "light"
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
