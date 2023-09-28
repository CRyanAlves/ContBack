import { Router } from "express";
import DiaryController from "../controller/DiaryController";

const diaryRouter = Router();

diaryRouter.post('/createDiary', new DiaryController().createDiary)

export default diaryRouter