import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
    const { authUser } = useAuthStore();
    const [name, setName] = useState( authUser.name || "");
    const [age, setAge] = useState(authUser.age || "");
    const [bio, setBio] = useState(authUser.bio || "");
    const [gender, setGender] = useState(authUser.gender || "");
    const [genderPreference, setGenderPreference] = useState(authUser.genderPreference || []);
    const [image, setImage] = useState( authUser.image || null);

    const fileInputRef = useRef(null);

    const {loading, uploadProfile} = useUserStore();

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        uploadProfile({name, bio, age, gender, genderPreference, image})
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    }

    console.log(image);
    

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* FORM For User To Edit his details */}
        </div>
    )
}

export default ProfilePage;