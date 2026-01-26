import { CandlestickChartIcon, Podcast, StickyNote } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "TiBlog | Админ-панель",
	description: "TiBlog | Управление сайтом",
	robots: {
		index: false,
		follow: false
	}
}

const AdminPage = () => {
	return (
		<section className='container mt-8'>
			<h1 className='vsm:text-7xl border-y border-y-[#a8a8a8] py-8 text-center text-6xl font-bold sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[240px]'>
				Админка
			</h1>
			<div className='mt-10 grid grid-cols-2 items-center gap-10'>
				<Link
					className='hover:text-background hover:bg-violet flex w-full flex-col items-center gap-2 rounded-4xl border p-10'
					href={"/admin/projects"}
				>
					<StickyNote size={120} />
					<p className='text-4xl font-bold'>Проекты</p>
				</Link>
				<Link
					className='hover:text-background hover:bg-violet flex w-full flex-col items-center gap-2 rounded-4xl border p-10'
					href={"/admin/posts"}
				>
					<Podcast size={120} />
					<p className='text-4xl font-bold'>Посты</p>
				</Link>
				<Link
					className='hover:text-background hover:bg-violet col-span-2 flex w-full items-center justify-center gap-2 rounded-4xl border p-10'
					href={"/admin/categories"}
				>
					<CandlestickChartIcon size={120} />
					<p className='text-4xl font-bold'>Категории</p>
				</Link>
			</div>
		</section>
	)
}

export default AdminPage
