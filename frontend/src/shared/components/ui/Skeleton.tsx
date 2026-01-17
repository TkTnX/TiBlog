import classNames from "classnames"

interface Props {
	className?: string
}

export const Skeleton = ({ className }: Props) => {
	return (
		<div
			className={classNames(
				"w-full animate-pulse bg-gray-500",
				className
			)}
		/>
	)
}
