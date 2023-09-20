import { Router } from 'express';
import UserController from '../controller/userController';

const authRouter = Router();

authRouter.post('/login', new UserController().loginUser);
authRouter.post('/sign-up', new UserController().signUpUser);

export default authRouter;
