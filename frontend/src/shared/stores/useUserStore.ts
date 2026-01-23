import { IUser } from "@/src/shared/types";
import { create } from "zustand";

interface IUserStore {
    user: null | IUser
    setUser: (user: IUser) => void
}

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => {
        set({user})
    }
}))