import { axiosInstance } from "@/src/shared/libs";

export async function getCategoryByPostId(postId :string) {
    const { data } = await axiosInstance.get(`categories/by-postId/${postId}`)
    return data
}