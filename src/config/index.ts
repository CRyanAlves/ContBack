import express, { Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { validator } from '@modules/User/controller/auth.validator';
import userRouter from '@modules/User/routes/user.router';
import authRouter from '@modules/User/routes/auth.router';
import diaryRouter from '@modules/Diary/routes/diary.router';
import sosRouter from '@modules/SOS/routes/sosUpload.router';
import briefRouter from '@modules/Brief/routes/brief.router';
import * as path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'pictures')));

app.use(morgan('combined'));

app.use('/users', validator);
app.use('/diary', validator);
app.use('/sos', validator);
app.use('/brief', validator);
app.use('/brief', briefRouter);
app.use('/sos', sosRouter);
app.use('/users', userRouter);
app.use('/diary', diaryRouter);
app.use('/auth', authRouter);

export default app;
