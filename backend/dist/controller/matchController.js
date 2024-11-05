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
exports.getUserProfiles = exports.getMatches = exports.swipeRight = exports.swipeLeft = void 0;
const User_1 = __importDefault(require("../model/User"));
const socket_server_1 = require("../socket/socket.server");
const swipeLeft = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { disLikeUserId } = req.params;
        const currentUser = yield User_1.default.findById(req === null || req === void 0 ? void 0 : req.user.id);
        //TODO: recheck this 
        if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.dislikes.includes(Object(disLikeUserId)))) {
            currentUser === null || currentUser === void 0 ? void 0 : currentUser.dislikes.push(Object(disLikeUserId));
            yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.save());
        }
        res.status(200).json({
            success: true,
            user: currentUser
        });
        return;
    }
    catch (error) {
        console.log('Error in swipe left', error);
        res.status(400).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.swipeLeft = swipeLeft;
const swipeRight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { likeUserId } = req.params;
        const currentUser = yield User_1.default.findById(req === null || req === void 0 ? void 0 : req.user.id);
        const likedUser = yield User_1.default.findById(Object(likeUserId));
        if (!likedUser) {
            res.status(400).json({
                success: true,
                message: 'User not found'
            });
            return;
        }
        if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.likes.includes(Object(likeUserId)))) {
            currentUser === null || currentUser === void 0 ? void 0 : currentUser.likes.push(Object(likeUserId));
            yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.save());
            if (likedUser === null || likedUser === void 0 ? void 0 : likedUser.likes.includes(currentUser === null || currentUser === void 0 ? void 0 : currentUser.id)) {
                currentUser === null || currentUser === void 0 ? void 0 : currentUser.matches.push(likedUser.id);
                likedUser.matches.push(currentUser === null || currentUser === void 0 ? void 0 : currentUser.id);
                Promise.all([
                    yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.save()),
                    yield (likedUser === null || likedUser === void 0 ? void 0 : likedUser.save())
                ]);
                const connectedUsers = (0, socket_server_1.getConnectedUsers)();
                const io = (0, socket_server_1.getIO)();
                const likedUserSocketId = connectedUsers.get(likeUserId);
                if (likedUserSocketId) {
                    io.to(likedUserSocketId).emit('newMatch', {
                        _id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id,
                        name: currentUser === null || currentUser === void 0 ? void 0 : currentUser.name,
                        Image: currentUser === null || currentUser === void 0 ? void 0 : currentUser.image
                    });
                }
                const currentSocketId = connectedUsers.get(currentUser === null || currentUser === void 0 ? void 0 : currentUser._id.toString());
                if (currentSocketId) {
                    io.to(currentSocketId).emit('newMatch', {
                        _id: likedUser._id,
                        name: likedUser.name,
                        image: likedUser.image
                    });
                }
            }
        }
        res.status(200).json({
            success: true,
            user: currentUser
        });
        return;
    }
    catch (error) {
        console.log('Error in  swipeRight', error);
        res.status(400).json({
            success: false,
            message: "Internal server Error"
        });
    }
});
exports.swipeRight = swipeRight;
const getMatches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user._id).populate('matches', 'name image');
        res.status(200).json({
            success: true,
            matches: user === null || user === void 0 ? void 0 : user.matches
        });
        return;
    }
    catch (error) {
        console.log('Error in matchController', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.getMatches = getMatches;
const getUserProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield User_1.default.findById(req.user._id);
        // Not Show -> currentUser, leftSwipt, rightSwipte, alreadyMatches, preference diffe
        const users = yield User_1.default.find({
            $and: [
                { _id: { $ne: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id } },
                { _id: { $nin: currentUser === null || currentUser === void 0 ? void 0 : currentUser.likes } },
                { _id: { $nin: currentUser === null || currentUser === void 0 ? void 0 : currentUser.dislikes } },
                { _id: { $nin: currentUser === null || currentUser === void 0 ? void 0 : currentUser.matches } },
                {
                    //TODO:check types later
                    //@ts-ignore
                    gender: (currentUser === null || currentUser === void 0 ? void 0 : currentUser.genderPreference) === 'both' ? { $in: ['male', 'female'] } : currentUser === null || currentUser === void 0 ? void 0 : currentUser.genderPreference
                },
                { genderPreference: { $in: [currentUser === null || currentUser === void 0 ? void 0 : currentUser.gender, 'both'] } }
            ]
        });
        res.status(200).json({
            success: true,
            users
        });
    }
    catch (error) {
        console.log('Error while getting the matches result', error);
        res.status(400).json({
            success: false,
            message: 'Internal server Error'
        });
    }
});
exports.getUserProfiles = getUserProfiles;
