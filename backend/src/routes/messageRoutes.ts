import express from "express";
import { protectRoute } from "../middleware/auth";
import { getConversation, sendMessage } from "../controller/messageController";

const router = express.Router();

router.post('/send', protectRoute, sendMessage);
router.get('/conversation/:userId', protectRoute, getConversation);


export default router;