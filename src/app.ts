import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

import validationRouter from './router/validation.router';
import gameRouter from './router/game.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/games', gameRouter);
app.use('/validations', validationRouter)

// app.get('/', (req: Request, res: Response) =>{
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});