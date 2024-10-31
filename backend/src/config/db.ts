import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const com = await mongoose.connect(process.env.MONGO_URI || "");
        console.log(`Database connected successfully ${com.connection.host}`);
        
    } catch (error) {
        console.log("Error connecting to DB");
        process.exit(1);
        
    }
} 