import { Router } from 'express';
import UserController from '../controller/userController';

const routes = Router();

routes.post('/signup', new UserController().signUpUser);

routes.post('/login', new UserController().loginUser);

export default routes;
