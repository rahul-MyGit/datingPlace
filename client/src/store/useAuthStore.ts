import { create } from "zustand";
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";

//TODO: check types again and remove any from res

type AuthStore = {
    loading: boolean;
    authUser: any;
    checkingAuth: boolean;
    signup: ({}: SignProp) => void;
    logout: () => void;
    checkAuth: () => void;
    login: ({}: loginProp) => void;
}

type SignProp = {
    name: String,
    email: String,
    password: String,
    age: String,
    gender: String,
    genderPreference: String
}

type loginProp = {
    email: String,
    password: String
}

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    checkingAuth: true,
    loading: false,

    signup: async (signupData : SignProp) => {
        try {
            set({loading:true})
            const res : any = await axiosInstance.post('/auth/signup', signupData)
            set({authUser: res.data?.user})
            toast.success('Account created successfully')
        } catch (error: any) {
            toast.error(error.res.data.message || 'Something went wrong')
        } finally{
            set({loading: false})
        }
    },

    checkAuth: async () => {
        try {
            const res: any = await axiosInstance.get('/auth/me')
            set({authUser: res?.data?.user});
        } catch (error) {
            set({authUser: null})
            console.log(error);
        } finally {
            set({checkingAuth: false})
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            if (res.status === 200) set({authUser: null})
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    },

    login: async (loginData: loginProp) => {
        try {            
            set({loading: true})            
            const res : any = await axiosInstance.post('/auth/login', loginData);
            set({authUser: res.data?.user});
            toast.success("Login successfully")
            toast.success
        } catch (error : any) {
            toast.error(error.response.data.message || "Something went wrong")
        } finally {
            set({loading: false})
        }
    }
}))