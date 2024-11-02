import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useMatchStore } from "../store/useMatchStore";
import { Header } from "../components/Header";
import NoMoreProfiles from "../components/NoMoreProfiles";
import LoadingUI from "../components/LoadingUI";

const HomePage = () => {

    const {isLoadingProfile, getUserProfiles, userProfiles} = useMatchStore();

    useEffect(() => {
        getUserProfiles();
    }, [getUserProfiles]);

    console.log('users profile is : ', userProfiles);
    

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purpe-100 overflow-hidden">
            <Sidebar />
            <div className="flex-grow flex flex-col overflow-hidden">
                <Header />
                <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
                    {userProfiles.length > 0 && !isLoadingProfile && (
                        <>
                        {/* swipe component */}
                        User Found
                        </>
                    )}

                    {userProfiles.length === 0 && !isLoadingProfile && (
                        <NoMoreProfiles />
                    )}

                    {isLoadingProfile && <LoadingUI />}
                </main>
            </div>
        </div>
    )
}

export default HomePage;