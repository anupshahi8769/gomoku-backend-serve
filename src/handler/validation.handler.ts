import express, { Request, Response } from "express";

const validationHandler = express.Router();

validationHandler.get("/", (req: Request, res: Response) => {
    try{
        return res.status(200).send([
            {
                "_id": 1,
                "username": "ashahi",
                "password": "1234"
            }
        ]);
    } catch(err){
        return res.status(500).send(err);
    }
    
})


export default validationHandler;