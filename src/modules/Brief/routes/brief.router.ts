import { Router } from 'express';
import BriefController from '../controller/BriefController';

const briefRouter = Router();

briefRouter.post('/createBrief', new BriefController().createBrief);

briefRouter.get('/listTrueBrief', new BriefController().listByTrueBrief);

briefRouter.get('/listFalseBrief', new BriefController().listByFalseBrief);

briefRouter.put('/updateBriefByAdm/:id', new BriefController().updateBriefByAdm);

briefRouter.delete('/deleteBriefByAdm/:id', new BriefController().deleteBriefByAdm);

export default briefRouter;
