import uploadFile from '@config/multer';
import { Router } from 'express';
import SosConfigController from '../controller/SosConfigController';
import multer from 'multer';

const sosRouter = Router();

sosRouter.post('/uploadFile', uploadFile.single('file'), new SosConfigController().uploadFile);

sosRouter.get('/findFile', new SosConfigController().findFile);

sosRouter.get('/findFileById/:id', new SosConfigController().findFilesById);

sosRouter.delete('/deleteFile/:id', new SosConfigController().deleteFile);

sosRouter.put('/updateFile/:id', uploadFile.single('file'), new SosConfigController().updateFile);

export default sosRouter;
