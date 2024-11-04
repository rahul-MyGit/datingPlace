import { io, Socket } from "socket.io-client";

let socket : Socket | null = null;

const SECURE_URL = 'http://localhost:5000'

export const initializeSocket = (userId : string) => {
    if(socket){
        socket.disconnect();
    }

    socket = io(SECURE_URL,{
        auth: {userId}
    })
}

export const getSocket = () => {
    if(!socket) {
        return new Error('Socket is not presnt/initialize');
    }
    return socket;
}

export const disconnectSocket = () => {
    if(socket){
        socket.disconnect();
        socket = null;
    }
}