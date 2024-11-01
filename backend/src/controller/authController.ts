import { Request, Response } from "express";
import User from "../model/User";
import  jwt  from "jsonwebtoken"

const signToken = (id: any) => {
    
    return jwt.sign({id}, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '7d'
    })
}

export const signup = async (req : Request, res: Response) => {

    const {name, email, password, age, gender, genderPreference} = req.body
    try {
        if(!name || !email || !password || !age || !gender || !genderPreference){
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }

        if(age < 18){
            res.status(400).json({
                success: false,
                message: "Age must be above 18"
            });
            return;
        }

        if(password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password much be more than 6 character"
            });
            return;
        }

        const newUser = await User.create({
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
        })

        res.status(201).json({
            success: true,
            user: newUser,
        })
        
    } catch (error) {
        console.log('Error while signup', error);
        res.status(500).json({
            success: false,
            message: 'Error in signup'
        })
        
    }
};

export const login = async (req : Request, res: Response) => {
    const {email , password} = req.body;

    try {

        if(!email || !password){
            res.status(400).json({
                success: false,
                message: 'All field are necessary'
            });
            return;
        }

        const user = await User.findOne({email}).select("+password");

        // @ts-ignore
        if(!user || !(await user.matchPassword(password))) {
            res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = signToken(user!._id);

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
        
    } catch (error) {
        console.log('Error while logging', error);
        res.status(500).json({
            status: false,
            message: 'Error while logginging'
        });
        return;
    }
};

export const logout = async (req : Request, res: Response) => {
    res.clearCookie('jwt');
    res.status(200).json({
        success: true,
        message: "logged out successfully"
    });
    return;
};

export const getme = async (req: Request , res : Response) => {
    try {
        res.send({
            succes0s: true,
            user: req.user
        })
        return;
    } catch (error) {
        console.log('Error in server');
        res.send({
            success: false,
            message: "Error in server"
        })
        return;
    }
}
