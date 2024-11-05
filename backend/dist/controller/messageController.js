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
exports.getConversation = exports.sendMessage = void 0;
const Message_1 = __importDefault(require("../model/Message"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, receiverId } = req.body;
        const newMessage = yield Message_1.default.create({
            sender: req === null || req === void 0 ? void 0 : req.user.id,
            receiver: receiverId,
            content
        });
        //TODO: send message usin ws
        res.status(200).json({
            success: true,
            message: newMessage
        });
    }
    catch (error) {
        console.log('Error in sending message', error);
        res.status(400).json({
            success: false,
            message: 'Internal server Error'
        });
    }
});
exports.sendMessage = sendMessage;
const getConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const messages = yield Message_1.default.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id }
            ]
        }).sort('createdAt');
        res.status(200).json({
            success: true,
            messages
        });
        return;
    }
    catch (error) {
        console.log('Error in getting covo', error);
        res.status(400).json({
            success: false,
            message: "Internal server error"
        });
    }
});
exports.getConversation = getConversation;
