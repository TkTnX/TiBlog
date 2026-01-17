import classNames from "classnames"

interface Props {
	text: string
	className?: string
}

export const ErrorMessage = ({ className, text }: Props) => {
	return (
		<p
			className={classNames(
				"my-10 text-center text-xl text-red-500",
				className
			)}
		>
			{text}
		</p>
	)
}
