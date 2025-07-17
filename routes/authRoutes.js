import express from "express";
import { LoginController, RegisterController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", LoginController);
authRouter.post("/register", RegisterController);

export default authRouter;