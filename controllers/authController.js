import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";

export const RegisterController = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        console.log(email, password);
    
        if(!email && !password){
            return res.status(400).json({
                status: "failed",
                message: "Email and password are required."
            })
        }
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            userId: uuidv4(),
            name: name,
            email: email,
            password: hashedPassword,
            availability: true
        })
        newUser.save();
        res.status(201).json({
            status: "success",
            message: "User is created successfully."
        })

    } catch (error) {
        console.error("Registration failed:", error);
        return res.status(500).json({
            status: "failed",
            message: "Failed to create a new user."
        })
    }
}

export const LoginController = async (req, res) => {
      try{
        const {email, password} = req.body;
        // console.log(email, password);
    
        if(!email && !password){
            return res.status(400).json({
                status: "failed",
                message: "Email and password are required."
            })
        }

        const existingUser = await User.findOne({email: email});
        const storedHashedPassword = existingUser.password;

        const isPasswordMatched = await bcrypt.compare(password, storedHashedPassword);

        if(isPasswordMatched){
            const token = jwt.sign({
                email: email,
                password: password
            }, process.env.JWT_SECRET_KEY,  { expiresIn: '3h' });
            return res.status(201).json({
                status: "success",
                message: "User is retrieved successfully.",
                accessToken: token
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: "Password doesn't matched."
            });
        }

    } catch (error) {
        console.error("Registration failed");
        return res.status(500).json({
            status: "failed",
            message: "Failed to create a new user."
        })
    }
}