import { Router } from 'express';
import UserController from '../controller/userController';

const userRouter = Router();

userRouter.get('/pegarPorId', new UserController().listUser);

export default userRouter;
