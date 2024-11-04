import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// type Match = {
//     id: string,
// }

type MatchStore = {
    isLoadingMatches: boolean,
    isLoadingProfile: boolean,
    swipeFeedback: any,
    matches: [],
    userProfiles: [],
    getMyMatches: () => void,
    getUserProfiles: () => void,
    swipeLeft: (user: any) => void,
    swipeRight: (user: any) => void
}

export const useMatchStore = create<MatchStore>((set) => ({
    isLoadingMatches: false,
    isLoadingProfile: false,
    swipeFeedback: null,
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
    },

    swipeLeft: async (user:any) => {
        try {
            set({ swipeFeedback: 'passed'});
            await axiosInstance.post('/matches/swipe-left/' + user._id)
        } catch (error) {
            console.log(error);
            toast.error("Failed to swipe left");
        }finally{
            setTimeout(() => set({swipeFeedback: null}) , 100);
        }
    },

    swipeRight: async (user: any) => {
        try {
            set({swipeFeedback: "liked"});
            await  axiosInstance.post('/matches/swipe-right/' + user._id)
        } catch (error) {
            console.log(error)
            toast.error('failed to swipe right')
        } finally {
            setTimeout(() => {
                set({swipeFeedback: null})
            }, 100);
        }
    }

    
}))