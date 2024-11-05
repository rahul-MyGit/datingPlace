"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedUsers = exports.getIO = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const connectedUser = new Map();
const initializeSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    });
    io.use((socket, next) => {
        const userId = socket.handshake.auth.userId;
        if (!userId) {
            return next(new Error('Invalid User'));
        }
        socket.userId = userId;
        next();
    });
    io.on('connection', (socket) => {
        console.log(`User is connected to socket Id of :  ${socket.id}`);
        connectedUser.set(socket.userId, socket.id);
        socket.on('disconnect', () => {
            console.log(`User is disconnected on : ${socket.id}`);
            connectedUser.delete(socket.userId);
        });
    });
};
exports.initializeSocket = initializeSocket;
const getIO = () => {
    if (!io) {
        return new Error('socket io is not properly initialize');
    }
    return io;
};
exports.getIO = getIO;
const getConnectedUsers = () => {
    return connectedUser;
};
exports.getConnectedUsers = getConnectedUsers;
