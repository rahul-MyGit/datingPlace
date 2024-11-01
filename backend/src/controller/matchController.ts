import { Request, Response } from "express";
import User from "../model/User";

export const swipeLeft = async (req: Request, res: Response) => {

}

export const swipeRight = async (req: Request, res: Response) => {

}

export const getMatches = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id).populate('matches', 'name image')

        res.status(200).json({
            success: true,
            matches: user?.matches
        });
        return;
    } catch (error) {
        console.log('Error in matchController', error);
        
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const getUserProfiles = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.user.id);
        // Not Show -> currentUser, leftSwipt, rightSwipte, alreadyMatches, preference diffe

        const users = await User.find({
            $and: [
                {_id: {$ne: currentUser?.id}},
                {_id: {$nin: currentUser?.likes}},
                {_id: {$nin: currentUser?.dislikes}},
                {_id: {$nin: currentUser?.matches}},
                {
                    //TODO:check types later
                    gender: currentUser?.genderPreference === 'both' ? { $in: ['male', 'female']} : currentUser?.genderPreference
                },
                {genderPreference: { $in: [currentUser?.gender, 'both']}}
            ]
        });

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        console.log('Error while getting the matches result', error);
        res.status(400).json({
            success: false,
            message: 'Internal server Error'
        })
        
    }
}