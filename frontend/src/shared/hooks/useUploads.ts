import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import { upload } from "@/src/shared/api"

export function useUploads() {
	const uploadMutation = (options?: Omit<UseMutationOptions<string, unknown, unknown>, "mutationKey" | "mutationFn">) =>
		useMutation({
			mutationKey: ["upload file"],
			mutationFn: async (file: File): Promise<string> => {
				const formData = new FormData()
				formData.append("file", file)

				const url = await upload(formData)

				if (!url) throw new Error("Ошибка при загрузке файла")
				return url
			},
			...options
		})

	return { uploadMutation }
}
