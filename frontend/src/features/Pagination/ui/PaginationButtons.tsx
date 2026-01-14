import { ArrowLeft, ArrowRight } from "lucide-react"

export const PaginationButtons = () => {
	return (
		<div className='flex gap-5 items-center flex-col sm:flex-row justify-between mt-5'>
			<button className='flex  items-center gap-2'>
				<ArrowLeft className='text-gray' />
				<p className='text-sm text-gray'>Previous</p>
			</button>
			<div className='flex  items-center gap-0.5'>
				<button className='w-10 h-10 flex items-center justify-center text-[#7f56d9] bg-[#f9f5ff] rounded-lg'>
					1
				</button>
				<button className='w-10 h-10 flex items-center justify-center rounded-lg'>
					2
				</button>
				<button className='w-10 h-10 flex items-center justify-center rounded-lg'>
					3
				</button>
				<p className='w-10 h-10 flex items-center justify-center rounded-lg'>
					...
				</p>
				<button className='w-10 h-10 flex items-center justify-center rounded-lg'>
					8
				</button>
				<button className='w-10 h-10 flex items-center justify-center rounded-lg'>
					9
				</button>
				<button className='w-10 h-10 flex items-center justify-center rounded-lg'>
					10
				</button>
			</div>
			<button className='flex items-center gap-2'>
				<p className='text-sm text-gray'>Next</p>
				<ArrowRight className='text-gray' />
			</button>
		</div>
	)
}
