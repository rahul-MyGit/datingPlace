import { Request, Response } from "express";
import User from "../model/User";
import cloudinary from "../config/cloudinary";

export const updateProfile = async (req: Request, res : Response) => {
    try {
        const {image , ...otherData} = req.body;

        let updatedData = otherData;

        if(image){
            //base 64 format: 
            if(image.startsWith("data:image")){
                try {
                    const uploadRes = await cloudinary.uploader.upload(image)
                    updatedData.image = uploadRes.secure_url;
                } catch (error) {
                    res.status(400).json({
                        success: false,
                        message: 'Error uploading Image'
                    })
                    return;
                }
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, {new: true});

        res.status(200).json({
            success: true,
            user: updatedUser
        });
        return;
    } catch (error) {
        console.log('Error in userController', error);
        res.status(500).json({
            success: false,
            message: "Error in server"
        });
        return;
    }
}