import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import matchRoutes from "./routes/matchRoutes"
import { connectToDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.Port || 5000

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);

app.listen(3000, ()=> {
    console.log(`Server as started at port ${3000}`);
    connectToDB();
});