import uploadFile from "@config/multer";
import { Router } from "express";

const sosRouter = Router()

sosRouter.put('/uploadSos', uploadFile.single('file'), )

export default sosRouter;