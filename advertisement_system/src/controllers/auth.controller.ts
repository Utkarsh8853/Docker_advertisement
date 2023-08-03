import { Request,Response } from "express";
import { forgetPwdToken, matchPwd, redisSessionCreation, sessionCreation, setPwd, tokenGenration, userEntry, userLogout, verifyUserExist, verifyUsersEmail } from "../services/auth.service";

class AuthController {

    async signup(req:Request, res:Response) {
        try {
            const {name, username, email, password } = req.body;
            const verifyUser = await verifyUserExist(username, email)
            
            if (!verifyUser){
                const result = await userEntry(name, username, email, password);
                console.log('Signup successfully',result);
                return res.status(200).json({message: "OK"});
            }
            else if (verifyUser){
                return res.status(400).json({message: "Username or email already exist"});
            }
        } catch(err) {
            console.error(err);
        }
    }

    async login(req:Request, res:Response) {
        try {
            const { email, password } = req.body;
            const verifyUser = await verifyUsersEmail(email);
            
            if(!verifyUser) {
                return res.status(200).json({message: "Wrong user"});
            }
            const pwdMatch = await matchPwd(password, verifyUser.password);
            if(pwdMatch) {
                const sessionId = await sessionCreation(verifyUser.id)
                console.log('Login result',verifyUser); 

                const token = tokenGenration(verifyUser.id,sessionId);
                console.log('token ',token);

                const a =await redisSessionCreation(verifyUser.id,sessionId)

                return res.send({message:"User Login Succesfully",token:token})
            }
            return res.status(400).json({message: "Incorrect Password"});
        } catch(err) {
            console.error(err);
        }
    }

    async logout(req:Request, res:Response) {
        try {
            const user_id = req.body.id;
            const session_id = req.body.session_id;

            const result = await userLogout(user_id,session_id)
            console.log('Logout',result);
            return res.status(200).send('Logout');
        } catch(err) {
            console.error(err);
        }
    }

    async forgetPassword(req:Request, res:Response) {
        try {
            const {email} = req.body;
            const userEmail = await verifyUsersEmail(email)
            if(!userEmail) {
                return res.status(200).json({message: "Wrong user"});
            }
            console.log('user id: ',userEmail.id);
            const token = await forgetPwdToken(userEmail.id)
            
            console.log('Set new password towen',token);
            return res.status(200).send(token);

        } catch(err) {
            console.error(err);
        }
    }

    async setNewPassword(req:Request, res:Response) {
        const token: any = req.headers.authorization;
        if(!token) return res.status(401).send("ACCESS_DENIED");
        try {
            const {newPassword} = req.body;
            const verifyUserSetPwd = await setPwd(token,newPassword)
            console.log('Password reset: ',verifyUserSetPwd);
            return res.status(200).send('Password reset');
            
        } catch(err) {
            console.error(err);
            res.status(400).send("Invalid token")
        }
    }
}

export const authController = new AuthController();