import classNames from "classnames"

import { PostItem } from "@/src/entities/Post/ui/PostItem"
import { DeleteButton } from "@/src/features"
import { EModels, PostResponse } from "@/src/shared/types"

interface Props {
	onSuccess: () => void
	model: EModels
	isAdminPage?: boolean
	item: PostResponse
}

export const PostItemWrapper = ({
	onSuccess,
	model,
	isAdminPage = false,
	item
}: Props) => {
	if (isAdminPage) {
		return (
			<DeleteButton onSuccess={onSuccess} id={item.id} model={model}>
				<PostItem post={item} />
			</DeleteButton>
		)
	} else {
		return (
			<PostItem
				className={classNames({
					"nth-[3n]:col-span-2": EModels.projects === model
				})}
				post={item}
			/>
		)
	}
}
