import { UseMutationOptions, useMutation } from "@tanstack/react-query"

import { addComment } from "@/src/shared/api"
import { AddCommentVariables } from "@/src/shared/schemas"

export function useComments() {
	const addCommentMutation = (
		options?: Omit<
			UseMutationOptions<unknown, unknown, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["create comment"],
			mutationFn: (values: AddCommentVariables) => addComment(values),
			...options
		})

	return { addCommentMutation }
}
