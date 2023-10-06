import { Router } from "express";
import DiaryController from "../controller/DiaryController";

const diaryRouter = Router();

diaryRouter.post('/createDiary', new DiaryController().createDiary)

diaryRouter.get('/listDiary', new DiaryController().getDiary)

diaryRouter.get('/findDiary', new DiaryController().getDiaryByUser)
export default diaryRouter