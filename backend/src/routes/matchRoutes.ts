import express from "express";
import { protectRoute } from "../middleware/auth";
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from "../controller/matchController";

const router = express.Router();

router.post('/swipe-right/:likeUserId', protectRoute, swipeRight);
router.post('/swipe-left/:disLikeUserId', protectRoute, swipeLeft);

router.get('/', protectRoute, getMatches)
router.get('/user-profiles', protectRoute, getUserProfiles)

export default router;