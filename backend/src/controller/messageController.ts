import { Request, Response } from "express";
import Message from "../model/Message";

export const sendMessage = async (req: Request, res: Response) => {
    
    try {
        const {content, receiverId} = req.body;

        const newMessage = await Message.create({
            sender: req?.user.id,
            receiver: receiverId,
            content
        })

        //TODO: send message usin ws
        res.status(200).json({
            success: true,
            message: newMessage
        });

    } catch (error) {
        console.log('Error in sending message', error);
        res.status(400).json({
            success: false,
            message: 'Internal server Error'
        })
        
    }
}

export const getConversation = async (req: Request, res: Response) => {
    
    const {userId} = req.params;

    try {
        const messages = await Message.find({
            $or : [
                {sender: req.user._id, receiver: userId},
                {sender: userId, receiver: req.user._id}
            ]
        }).sort('createdAt');

        res.status(200).json({
            success: true,
            messages
        });
        return;
    } catch (error) {
        console.log('Error in getting covo', error);
        res.status(400).json({
            success: false,
            message: "Internal server error"
        });
    }
}