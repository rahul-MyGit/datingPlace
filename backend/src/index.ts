import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from 'path'

import {createServer} from 'http'

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import matchRoutes from "./routes/matchRoutes"

import { connectToDB } from "./config/db";
import { initializeSocket } from "./socket/socket.server";

dotenv.config();

const app = express();

const httpServer = createServer(app);

const PORT = process.env.Port || 5000

// const __dirname = path.resolve();

initializeSocket(httpServer);

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);

// if(process.env.NODE_ENV?.trim() === "production"){
//     const parentDir = path.resolve(__dirname, '..');
//     app.use(express.static(path.join(parentDir, '/client/dist')));

//     app.get("*", (req,res) => {
//         res.sendFile(path.resolve(parentDir, 'client', 'dist', 'index.html'))
//     });
// }

httpServer.listen(PORT, ()=> {
    console.log(`Server as started at ports ${PORT}`);
    connectToDB();
});
