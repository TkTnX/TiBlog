import { axiosInstance } from "@/src/shared/libs"
import { AddCommentVariables } from "@/src/shared/schemas"

export async function addComment(values: AddCommentVariables) {
	const { postId, ...restValues } = values
	const { data } = await axiosInstance.post(`comments/${postId}`, restValues)

	return data
}
