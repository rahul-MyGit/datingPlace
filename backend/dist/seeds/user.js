"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../model/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const maleNames = ["Rahul", "Yash", "Kartik", "Harkirat", "Nimit", "Sargham", "Ankit", "Ankur", "Yuvi", "Sam", "Anmol", "Anup", "Yogi"];
const femaleNames = ["Kajal", "Aditi", "Abhilasha", "Siddhi", "Kajol", "Poonam", "Khushi", "Swaralli", "Raksh", "Bani", "Priyanka", "Moti", "Urvashi"];
const genderPreferences = ["male", "female", "both"];
const bioDescriptors = ["Coffee addict", "Cat lover", "Dog person", "Foodie", "Gym rat", "Bookworm", "Movie buff", "Music lover", "Travel junkie", "Beach bum", "City slicker", "Outdoor enthusiast", "Netflix binger", "Yoga enthusiast", "Craft beer connoisseur", "Sushi fanatic", "Adventure seeker", "Night owl", "Early bird", "Aspiring chef"];
const generateBio = () => {
    const descriptors = bioDescriptors.sort(() => 0.5 - Math.random()).slice(0, 3);
    return descriptors.join(" | ");
};
const generateRandomUser = (gender, index) => {
    const names = gender === "male" ? maleNames : femaleNames;
    const name = names[index];
    const age = Math.floor(Math.random() * (45 - 21 + 1) + 21);
    return {
        name,
        email: `${name.toLowerCase()}${age}@gmail.com`,
        password: bcryptjs_1.default.hashSync("code123", 10),
        age,
        gender,
        genderPreference: genderPreferences[Math.floor(Math.random() * genderPreferences.length)],
        bio: generateBio(),
        image: `/${gender}/${index + 1}.jpg`
    };
};
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || "");
        yield User_1.default.deleteMany({});
        const maleUsers = maleNames.map((_, i) => generateRandomUser("male", i));
        const femaleUsers = femaleNames.map((_, i) => generateRandomUser("female", i));
        const allUsers = [...maleUsers, ...femaleUsers];
        yield User_1.default.insertMany(allUsers);
        console.log("Database seeded successfully");
    }
    catch (error) {
        console.error('Error seeding data', error);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
seedUsers();
