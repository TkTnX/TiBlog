interface Props {
	id: string
	likes: number
}

export const LikeButton = ({ id, likes }: Props) => {
	// TODO: Возможность лайкать

	return (
		<button className='hover:bg-violet hover:text-background flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 md:flex-0'>
			<span>{likes}</span> | <span>Понравилось</span>
		</button>
	)
}
