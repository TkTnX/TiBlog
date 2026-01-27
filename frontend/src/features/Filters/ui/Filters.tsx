/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { CategorySelect } from "@/src/features/CategorySelect"

interface Props {
	className?:string
}

export const Filters = ({className}: Props) => {
	const [categories, setCategories] = useState<string[]>([])
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		if (!categories.length) {
			params.delete("categories")
			router.push(`${pathname}`, { scroll: false })
			return
		}
		const nextQuery = categories.join(",")
		const currQuery = searchParams.get("categories")

		if (currQuery === nextQuery) return

		params.set("categories", nextQuery)
		router.replace(`?${params.toString()}`, { scroll: false })
	}, [categories])

	return (
		<div className={className}>
			<CategorySelect
				className='-mt-4 [&_.title]:hidden'
				categories={categories}
				setCategories={setCategories}
			/>
		</div>
	)
}
