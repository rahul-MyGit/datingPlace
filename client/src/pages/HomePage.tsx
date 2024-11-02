import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useMatchStore } from "../store/useMatchStore";

const HomePage = () => {

    const {isLoadingProfile, getUserProfiles, userProfiles} = useMatchStore();

    useEffect(() => {
        getUserProfiles();
    }, [getUserProfiles]);

    console.log('users profile is : ', userProfiles);
    

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purpe-100 overflow-hidden">
            <Sidebar />
        </div>
    )
}

export default HomePage;