import { Router } from 'express';
import BriefController from '../controller/BriefController';

const briefRouter = Router();

briefRouter.post('/createBrief', new BriefController().createBrief);

briefRouter.get('/listTrueBrief', new BriefController().listByTrueBrief);

briefRouter.get('/listFalseBrief', new BriefController().listByFalseBrief);

briefRouter.put('/updateBrief/:id', new BriefController().updateBrief);

// briefRouter.delete('/deletebrief/:id', new BriefController().deletebrief);

export default briefRouter;
