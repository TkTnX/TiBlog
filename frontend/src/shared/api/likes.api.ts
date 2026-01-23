import { axiosInstance } from "@/src/shared/libs";

export async function like(postId: string) {
    const { data } = await axiosInstance.post(`likes/${postId}`)
    
    return data
}