"use client"
import { useRouter, useSearchParams } from "next/navigation"

import { POST_SORT_ITEMS } from "@/src/shared/constants/post-sort-items"

export const PostsSort = () => {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const router = useRouter()
	const onChange = (value: string) => {
		params.set("sortBy", value)
		router.replace(`?${params.toString()}`)
	}

	return (
		<div className='container mt-10'>
			<select
				onChange={e => onChange(e.target.value)}
				className='rounded-2xl border p-2'
			>
				{POST_SORT_ITEMS.map(item => (
					<option key={item.value} value={item.value}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	)
}
