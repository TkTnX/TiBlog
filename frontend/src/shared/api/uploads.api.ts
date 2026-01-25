import { axiosInstance } from "@/src/shared/libs"

export async function upload(formData: FormData) {
	const { data } = await axiosInstance.post("uploads", formData, {
		headers: { "Content-Type": "multipart/form-data" }
	})

	return data
}
