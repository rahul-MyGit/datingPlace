import moongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from "../model/User";
import dotenv from "dotenv";

dotenv.config();

const maleNames = ["Rahul", "Yash", "Kartik", "Harkirat", "Nimit", "Sargham", "Ankit", "Ankur", "Yuvi", "Sam", "Anmol", "Anup", "Yogi"];

const femaleNames = ["Kajal", "Aditi", "Abhilasha", "Siddhi", "Kajol", "Poonam", "Khushi", "Swaralli", "Raksh", "Bani", "Priyanka", "Moti", "Urvashi"];

const genderPreferences = ["male", "female", "both"];

const bioDescriptors = ["Coffee addict", "Cat lover", "Dog person", "Foodie", "Gym rat", "Bookworm", "Movie buff", "Music lover", "Travel junkie", "Beach bum", "City slicker", "Outdoor enthusiast", "Netflix binger", "Yoga enthusiast", "Craft beer connoisseur", "Sushi fanatic", "Adventure seeker", "Night owl", "Early bird", "Aspiring chef"]

const generateBio = () => {
    const descriptors = bioDescriptors.sort(() => 0.5 - Math.random()).slice(0, 3);
    return descriptors.join(" | ");
}

const generateRandomUser = (gender: string, index: number) => {
    const names = gender === "male" ? maleNames : femaleNames;
    const name = names[index];
    const age = Math.floor(Math.random() * (45 - 21 + 1) + 21);
    return {
        name,
        email: `${name.toLowerCase()}${age}@gmail.com`,
        password: bcrypt.hashSync("code123", 10),
        age,
        gender,
        genderPreference: genderPreferences[Math.floor(Math.random() * genderPreferences.length)],
        bio: generateBio(),
        image: `/${gender}/${index + 1}.jpg`
    };
};

const seedUsers = async () => {
    try {
        await moongoose.connect(process.env.MONGO_URI || "");

        await User.deleteMany({});

        const maleUsers = maleNames.map((_, i) => generateRandomUser("male", i));
        const femaleUsers = femaleNames.map((_, i) => generateRandomUser("female", i));

        const allUsers = [...maleUsers , ...femaleUsers];

        await User.insertMany(allUsers);

        console.log("Database seeded successfully");
        
    } catch (error) {
        console.error('Error seeding data', error);
    } finally {
        moongoose.disconnect();
    }
};

seedUsers();