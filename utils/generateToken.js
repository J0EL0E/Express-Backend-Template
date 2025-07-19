import jwt from 'jsonwebtoken';
import "dotenv/config";
import User from "../models/userModel.js";

export const generateResetPasswordToken = async (email) => {

    const user = User.findOne({email: email});
    if(!user){
        throw new Error("User doesn't exist.");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const resetUrl = `${process.env.API_HOST}/reset-password/${token}`;
    return resetUrl;
} 