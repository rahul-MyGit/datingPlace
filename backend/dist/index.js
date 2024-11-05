"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const matchRoutes_1 = __importDefault(require("./routes/matchRoutes"));
const db_1 = require("./config/db");
const socket_server_1 = require("./socket/socket.server");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.Port || 5000;
(0, socket_server_1.initializeSocket)(httpServer);
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/matches', matchRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
httpServer.listen(PORT, () => {
    console.log(`Server as started at ports ${PORT}`);
    (0, db_1.connectToDB)();
});
