import {  UserResponse } from "@/src/shared/types";
import { create } from "zustand";

interface IUserStore {
    user: null | UserResponse
    setUser: (user: UserResponse) => void
}

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => {
        set({user})
    }
}))