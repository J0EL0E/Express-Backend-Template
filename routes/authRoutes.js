import express from "express";
import { LoginController, RegisterController, ResetPassword } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", LoginController);
authRouter.post("/register", RegisterController);
authRouter.post("/reset-password", ResetPassword);

export default authRouter;