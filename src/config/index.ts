import express, { Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { validator } from '@modules/User/controller/auth.validator';
import userRouter from '@modules/User/routes/user.router';
import authRouter from '@modules/User/routes/auth.router';

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan('combined'));

app.use('/users', validator);
app.use('/users', userRouter);
app.use('/auth', authRouter);

export default app;
