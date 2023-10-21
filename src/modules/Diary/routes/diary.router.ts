import { Router } from 'express';
import DiaryController from '../controller/DiaryController';

const diaryRouter = Router();

diaryRouter.post('/createDiary', new DiaryController().createDiary);

diaryRouter.get('/listDiary', new DiaryController().getDiary);

diaryRouter.get('/listDiaryByUserId', new DiaryController().getDiaryByUser);

diaryRouter.get('/findDiary/:id', new DiaryController().getDiaryById)

diaryRouter.put('/updateDiary/:id', new DiaryController().updateDiary);

diaryRouter.delete('/deleteDiary/:id', new DiaryController().deleteDiary);

export default diaryRouter;
