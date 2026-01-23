import { axiosInstance } from "@/src/shared/libs";

export async function getMe() {
    const { data } = await axiosInstance.get('users/@me')
    return data
}