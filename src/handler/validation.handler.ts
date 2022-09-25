import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import validateSchema from '../middleware/validateSchema';
import {createUser, getUserByUserName} from "../service/auth.service";
import { LoginInput, RegisterInput, registerSchema} from "../schema/validation.schema"
import { signJwt } from "../util/jwt";

const validationHandler = express.Router();

validationHandler.post("/signup", validateSchema(registerSchema) , async (req: Request<{}, {}, RegisterInput["body"]>, res: Response) => {
    try{
        const{username, password} = req.body;
        
        const existingUser = await getUserByUserName(username);
        if (existingUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const newUser = await createUser({
            username,
            password: encryptedPassword,
        });

        const token = signJwt({username, _id: newUser._id});

        res.status(200).json({_id: newUser._id,token});
    } catch (err){
        return res.status(500).send(err);
    }
})

validationHandler.post("/login", async (req: Request<{},{}, LoginInput["body"]>,res:Response) =>{
    try {
        const {username,password} = req.body;

        const user = await getUserByUserName(username);

        if (user && (await bcrypt.compare(password, user.password))){
            const token = signJwt({username, _id: user._id});

            return res.status(200).json({_id: user._id, token});
        }
        return res.status(400).send("Invalid Credentials");
    }catch(err){
        return res.status(500).send(err);

    }  
})



export default validationHandler;