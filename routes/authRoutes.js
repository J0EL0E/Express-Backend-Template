import express from "express";
import { isUserAuthorized, LoginController, logOutController, refreshTokenController, RegisterController, ResetPassword } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", LoginController);
authRouter.post("/register", RegisterController);
authRouter.post("/reset-password", ResetPassword);
authRouter.post("/refresh", refreshTokenController);
authRouter.post("/logout", logOutController);
authRouter.get("/dashboard", isUserAuthorized);

export default authRouter;