import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";
import { registationEmailNotification } from '../templates/userEmailNotifications.js';

export const RegisterController = async (req, res) => {
    try{
        console.log(req.body)
        const {name, email, password} = req.body;

        console.log(name,email, password);
        if(!email || !password ){
            return res.status(400).json({
                status: "error",
                message: "Email and password are required."
            })
        }
        
        const checkIfEmailIsExisting = User.find({email: email});
        if(checkIfEmailIsExisting.length > 0){
            return res.status(400).json({
                status: "error",
                message: "The email that the user has inputted is already used."
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

        await registationEmailNotification(email, name);

        res.status(201).json({
            status: "success",
            message: "User is created successfully."
        })

    } catch (error) {
        // console.error("Registration failed:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to create a new user.",
            // error: error
        })
    }
}

export const LoginController = async (req, res) => {
      try{
        const {email, password} = req.body;
    
        if(!email && !password){
            return res.status(400).json({
                status: "error",
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
                status: "error",
                message: "Password doesn't matched."
            });
        }

    } catch (error) {
        console.error("Registration failed");
        return res.status(500).json({
            status: "error",
            message: "Failed to create a new user.",
            error: error
        })
    }
}

export const ResetPassword = async (req, res) => {
    try {
        const {email, new_password} = req.body;
    
        //Encrypting the newPassword

        if(!email || !new_password){
            return res.status(400).json({
                status  : "error",
                message: "Email and password is required."
            });
        }
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(new_password, saltRounds);
        const userToUpdate = await User.findOneAndUpdate({email: email}, {password: hashedPassword});

        if(userToUpdate){
            return res.status(200).json({
                status: "success",
                message: "The password has been reset successfully"
            });
        } else {
            return res.status(400).send('Invalid or expired reset token');
        }

    } catch (error) {
        console.error("Unable to reset the password:", error);
        return res.status(500).json({
            status: "error",
            message: "Unable to reset the password",
            error: error
        }) 
    }
}

export const verifyResetToken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: new Date() } // Check expiry
  });

  if (!user) {
    return res.status(400).send('Invalid or expired token');
  }

  // Render password reset form (or send front-end signal)
//   res.send('Reset form goes here');
}