import { Op } from "sequelize";
import User from "../database/models/user.model";
import bcrypt from 'bcrypt';
import Session from "../database/models/session.model";
import jwt from 'jsonwebtoken';
import client from "../database/redis_db";

export  const verifyUserExist = async (username: string, email: string)=>{
    const checkUser = await User.findOne({where:{[Op.or]:[{username: username},{email: email}]}})
    return checkUser;
}

export  const userEntry = async (name: string,username: string, email: string, password: string)=>{
    const hashPwd = await bcrypt.hash(password,3);
    const createUser = await User.create({name: name, username: username, email:email, password:hashPwd});
    return createUser;
}

export  const verifyUsersEmail = async (email: string)=>{
    const checkEmail = await User.findOne({where:{email: email}})
    return checkEmail;
}

export  const matchPwd = async (password: string, bcryptPwd:string)=>{
    const checkPwd =bcrypt.compare(password, bcryptPwd)
    return checkPwd;
}

export  const sessionCreation = async (user_id: number)=>{
    let session_payload={
        user_id: user_id,
        device_id:"1234",
        device_type:"google chrome",
        isActive: true
    } 
    await Session.create(session_payload)
    const lastSessionId: number= await Session.max('id'); 
    return lastSessionId;
}

export  const tokenGenration = (user_id: number,session_id: number)=>{
    const token: string = jwt.sign({id:user_id,session_id: session_id},'appinventiv',{expiresIn: '24h'});
    return token;
}

export  const redisSessionCreation = async (user_id: number,session_id: number)=>{
    let session_payload={
        user_id: user_id,
        device_id:"1234",
        device_type:"google chrome",
        isActive: true
    }
    const a =await client.set(`${user_id}_${session_id}`,JSON.stringify(session_payload))
    
}

export  const userLogout = async(user_id: number,session_id: number)=>{
    const result = await Session.update({isActive: false,},{where: {id:session_id}});
    await client.del(`${user_id}_${session_id}`)
    return result;
}

export  const forgetPwdToken = async(user_id: number)=>{
    const token:string = jwt.sign({id:user_id},'appinventiv',{expiresIn: "1h"});
    return token;
}

export  const setPwd = async(token: string,newPassword: string)=>{
    const decoded: any = jwt.verify(token,'appinventiv');
    const user_id = decoded.id
    const hashPwd = await bcrypt.hash(newPassword,3);
    const result = await User.update({password: hashPwd,},{where: {id:user_id}});
    return result;
}