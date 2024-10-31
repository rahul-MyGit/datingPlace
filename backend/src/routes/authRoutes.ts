import express from "express";
import { login, logout, signup } from "../controller/authController";

const router = express.Router();

router.post('/login', login);
router.get('/signup', signup);
router.post('/logout', logout);

export default router;