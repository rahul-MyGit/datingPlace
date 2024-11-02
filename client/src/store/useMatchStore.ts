import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// type Match = {
//     id: string,
// }

type MatchStore = {
    isLoadingMatches: boolean,
    isLoadingProfile: boolean,
    matches: [],
    userProfiles: [],
    getMyMatches: () => void,
    getUserProfiles: () => void
}

export const useMatchStore = create<MatchStore>((set) => ({
    isLoadingMatches: false,
    isLoadingProfile: false,
    matches: [],
    userProfiles: [],

    getMyMatches: async () => {
        try {
            set({ isLoadingMatches: true });
            const res = await axiosInstance.get<any>('/matches')
            set({ matches: res.data?.matches })
        } catch (error: any) {
            set({ matches: [] })
            toast.error(error.response?.data?.message)
        } finally {
            set({ isLoadingMatches: false });
        }
    },

    getUserProfiles: async () => {
        try {
            set({ isLoadingProfile: true });
            const res = await axiosInstance.get<any>('/matches/user-profiles')
            set({ userProfiles: res.data?.users })
        } catch (error: any) {
            set({ userProfiles: [] })
            toast.error(error.response?.data?.message)
        } finally {
            set({ isLoadingProfile: false });
        }
    }

}))