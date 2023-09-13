import express, {Request, RequestHandler, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan'
import { validator } from '@modules/User/controller/auth.validator';
import authRouter from '@modules/User/routes/auth.router';


const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("combined"));

app.get('/dados-fake', (req: Request, res: Response) => {
    setTimeout(() => res.json([3,6,5,3,2,7,5]), 5000);
})

app.use('/users', validator);
app.use('/alunos', validator);
app.use('/auth', authRouter);
app.get('/alunos', (req: Request,res: Response) => {
    res.json([])
})

export default app;
