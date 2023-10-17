import uploadFile from "@config/multer";
import { Router } from "express";
import SosConfigController from "../controller/SosConfigController";

const sosRouter = Router()

sosRouter.put('/uploadSos', uploadFile.single('file'), new SosConfigController().uploadFile )

export default sosRouter;