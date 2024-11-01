//TODO: remember to install react-router-dom, react-hot-toast, axios, zustand

import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import ProfilePage from "./pages/ProfilePage"
import ChatPage from "./pages/ChatPage"
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { Toaster } from "react-hot-toast"


function App() {

  const {checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  return (
    <>
    <div className="absolute insert-0 -z-10 h-full w-full bg-white bg-
    [linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient
    (to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/chat/:id" element={<ChatPage />}/>
      </Routes>

      <Toaster />
    </div>

    </>
  )
}

export default App
