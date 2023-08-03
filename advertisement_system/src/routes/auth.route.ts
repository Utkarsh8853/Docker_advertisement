import express from "express";
import { authController } from "../controllers/auth.controller";
import auth from "../middleware/auth.middleware";
import { forgetPasswordValidate, newUserValidate, setPasswordValidate, userLoginValidate } from "../middleware/joiValidate.middleware";

export const authRouter = express.Router();

authRouter.post('/signup', newUserValidate,authController.signup);
authRouter.post('/login', userLoginValidate,authController.login);
authRouter.get('/logout',auth, authController.logout );
authRouter.get('/forgetPassword', forgetPasswordValidate,authController.forgetPassword);
authRouter.put('/setPassword', setPasswordValidate,authController.setNewPassword);