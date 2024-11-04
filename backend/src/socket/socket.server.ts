import { Server } from "socket.io";
import * as http from "http";

declare module "socket.io" {
    interface Socket {
        userId?: string;
    }
}

let io : Server | undefined;

const connectedUser = new Map();

export const initializeSocket = (httpServer: http.Server) => {

    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    });

    io.use((socket, next) => {
        const userId = socket.handshake.auth.userId
        if(!userId) {
            return next(new Error('Invalid User')) 
        }

        socket.userId = userId;
        next();
    })


    io.on('connections', (socket) => {
        console.log(`User is connected to socket Id of :  ${socket.id}`);
        connectedUser.set(socket.userId, socket.id);

        socket.on('disconnect' , () => {
            console.log(`User is disconnected on : ${socket.id}`);
            
        })
    });
}


export const getIO = () => {
    if(!io) {
        return new Error('socket io is not properly initialize')
    }
}

export const getConnectedUsers = () => {
    return connectedUser;
}