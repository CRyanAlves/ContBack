import { Router } from 'express';
import UserController from '../controller/userController';

const authRouter = Router();
const google_login = Router();

authRouter.post('/login', new UserController().loginUser);
authRouter.post('/sign-up', new UserController().signUpUser);
google_login.post('/login/google', new UserController().loginGoogle)

export default authRouter;
