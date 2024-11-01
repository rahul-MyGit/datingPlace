import express from "express";
import { protectRoute } from "../middleware/auth";
import { updateProfile } from "../controller/userController";

const router = express.Router();

router.put('/update', protectRoute, updateProfile)

export default router;