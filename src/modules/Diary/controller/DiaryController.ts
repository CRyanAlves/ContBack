import { Request, Response } from 'express';
import DiaryService from '../services/DiaryService';
import diaryRepository from '../models/diary.repository';

export default class DiaryController {
  async createDiary(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      const id_user = id;
      if (!id_user) {
        return res.status(404).send({ error: 'User not found 2' });
      }
      const { title, description, question1, question2, question3, question4 } = req.body;
      await new DiaryService().createDiary(
        id_user,
        title,
        description,
        question1,
        question2,
        question3,
        question4,
      );
      res.json('Bem criado!');
      console.log(id_user);
    } catch (error) {
      return res.status(400).send(`erro no controller CreateDiary ${error}`);
    }
  }

  async getDiary(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found' });
      }
      const saveUser = await new DiaryService().getDiary();
      return res.send({ res: saveUser });
    } catch (err) {
      res.status(401).send('Get User Failed');
    }
  }

  async getDiaryByUser(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found' });
      }

      const saveUser = await new DiaryService().getDiaryByUser(id.id);
      return res.send({ res: saveUser });
    } catch (err) {
      res.status(401).send('Get User Failed');
    }
  }

  async updateDiary(req: Request, res: Response) {
    try {
      const { title, description, question1, question2, question3, question4 } = req.body; // aumente aqui e no "new" se precisar
      const  id_meu_diário  = req.params.id;
      const { id } = (req as any).authUser;
      const resUpdate = await new DiaryService().updateDiary(
        id,
        id_meu_diário,
        title,
        description,
        question1,
        question2,
        question3,
        question4,
      );
      return res.json(resUpdate);
    } catch (err) {
      res.status(401).send('Get User Failed');
    }
  }

  async deleteDiary(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      const   id_meu_diário   = req.params.id;

      if (!id_meu_diário) {
        return res.status(404).send({ error: 'Diary not exist' });
      }

      const resDelete = await new DiaryService().deleteDiary(id, id_meu_diário);
      return res.json(resDelete);
    } catch (err) {
      res.status(401).send('Get User Failed');
    }
  }
}
