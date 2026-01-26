import { UseMutationOptions, useMutation } from "@tanstack/react-query"

import { axiosInstance } from "@/src/shared/libs"
import { EModels } from "@/src/shared/types"

export function useDelete() {
	const deleteItemMutation = (
		model: EModels,
		id: string,
		options?: Omit<
			UseMutationOptions<unknown, unknown, unknown>,
			"mutationKey" | "mutationFn"
		>
	) =>
		useMutation({
			mutationKey: ["delete"],
			mutationFn: async () => {
				const { data } = await axiosInstance.delete(
					`${EModels[model]}/${id}`
				)
				return data
			},
			...options
		})

	return { deleteItemMutation }
}
