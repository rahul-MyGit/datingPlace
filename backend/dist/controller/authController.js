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
exports.getme = exports.logout = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '7d'
    });
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, age, gender, genderPreference } = req.body;
    try {
        if (!name || !email || !password || !age || !gender || !genderPreference) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        if (age < 18) {
            res.status(400).json({
                success: false,
                message: "Age must be above 18"
            });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password much be more than 6 character"
            });
            return;
        }
        const newUser = yield User_1.default.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference
        });
        const token = signToken(newUser._id);
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7days in milisec
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
        });
        res.status(201).json({
            success: true,
            user: newUser,
        });
    }
    catch (error) {
        console.log('Error while signup', error);
        res.status(500).json({
            success: false,
            message: 'Error in signup'
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'All field are necessary'
            });
            return;
        }
        const user = yield User_1.default.findOne({ email }).select("+password");
        // @ts-ignore
        if (!user || !(yield user.matchPassword(password))) {
            res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = signToken(user._id);
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
        });
        res.status(201).json({
            success: true,
            user
        });
        return;
    }
    catch (error) {
        console.log('Error while logging', error);
        res.status(500).json({
            status: false,
            message: 'Error while logginging'
        });
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('jwt');
    res.status(200).json({
        success: true,
        message: "logged out successfully"
    });
    return;
});
exports.logout = logout;
const getme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({
            succes0s: true,
            user: req.user
        });
        return;
    }
    catch (error) {
        console.log('Error in server');
        res.send({
            success: false,
            message: "Error in server"
        });
        return;
    }
});
exports.getme = getme;
