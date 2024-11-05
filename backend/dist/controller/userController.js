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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const User_1 = __importDefault(require("../model/User"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { image } = _a, otherData = __rest(_a, ["image"]);
        let updatedData = otherData;
        if (image) {
            //base 64 format: 
            if (image.startsWith("data:image")) {
                try {
                    const uploadRes = yield cloudinary_1.default.uploader.upload(image);
                    updatedData.image = uploadRes.secure_url;
                }
                catch (error) {
                    res.status(400).json({
                        success: false,
                        message: 'Error uploading Image'
                    });
                    return;
                }
            }
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.user._id, updatedData, { new: true });
        res.status(200).json({
            success: true,
            user: updatedUser
        });
        return;
    }
    catch (error) {
        console.log('Error in userController', error);
        res.status(500).json({
            success: false,
            message: "Error in server"
        });
        return;
    }
});
exports.updateProfile = updateProfile;
