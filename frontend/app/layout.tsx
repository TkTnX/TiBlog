import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { Providers } from "@/src/shared/components"
import { Footer } from "@/src/widgets"
import { Header } from "@/src/widgets/Header"

const font = Inter({
	variable: "--font-inter",
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "TiBlog | Личный блог",
	description: "Личный блог Тимура Галиакбарова"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning={true} lang='ru'>
			<Providers>
				<body
					className={`${font.variable} flex min-h-screen flex-col justify-between antialiased`}
				>
					<Header />
					<main>{children}</main>
					<Footer />
				</body>
			</Providers>
		</html>
	)
}
