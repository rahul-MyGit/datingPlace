import { create } from "zustand";
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";

//TODO: check types again and remove any from res

type AuthStore = {
    loading: boolean;
    authUser: any;
    checkingAuth: boolean;
    signup: ({}: SignProp) => void;
    checkAuth: () => void;
}

type SignProp = {
    name: String,
    email: String,
    password: String,
    age: String,
    gender: String,
    genderPreference: String
}


export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    checkingAuth: true,
    loading: false,

    signup: async (signupData : SignProp) => {
        try {
            set({loading:true})
            console.log(signupData);
            const res : any = await axiosInstance.post('/auth/signup', signupData)
            set({authUser: res?.data!.user})
            toast.success('Account created successfully')
        } catch (error: any) {
            toast.error(error.res.data.messagge || 'Something went wrong')
        } finally{
            set({loading: false})
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/me')
            console.log(res.data);
        } catch (error) {
            console.log(error);
            
        }
    }
}))