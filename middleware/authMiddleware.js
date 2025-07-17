import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        const token = authorization.split(" ")[1];

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log(decode);
            console.log("Token is verified successfully.")
            // return res.status(200).json({
            //     status: "success",
            //     message: "Token is verified successfully."
            // })
            next();

        } else {
            // res.status(401).json({
            //     status: "failed",
            //     message: "Invalid Token"
            // })
            console.log("Token is either expired or invalid");
        }
 
    } catch (error){
        console.log("Token couldn't be verified: ", error);
        return res.status(401).json({
            status: "failed",
            message: "Unathorized"
        })
    }







}