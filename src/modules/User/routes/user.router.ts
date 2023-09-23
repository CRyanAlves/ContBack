import { Router } from "express";
import UserController from "../controller/userController";

const userRouter = Router()

userRouter.get('/listUser', new UserController().listUser)

userRouter.get('/pegaPorId', new UserController().getByUser)

userRouter.delete('/deleteUser', new UserController().deleteUser)

userRouter.put('/updateUser', new UserController().updateUser)

export default userRouter