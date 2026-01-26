import { axiosInstance } from "@/src/shared/libs";
import { AddCategoryVariables } from "@/src/shared/schemas";

export async function getCategories() {
    const { data } = await axiosInstance.get('categories')
    return data
}

export async function getCategoryByPostId(postId :string) {
    const { data } = await axiosInstance.get(`categories/by-postId/${postId}`)
    return data
}

export async function createCategory(body: AddCategoryVariables) {
    const { data } = await axiosInstance.post('categories', body)
    return data
}