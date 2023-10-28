import { Request, Response } from 'express';
import DiaryService from '../services/DiaryService';

export default class DiaryController {
  async createDiary(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      const id_user = id;
      if (!id_user) {
        return res.status(404).json({ error: 'User not found 2' });
      }
      const { title, description, question1, question2, question3 } = req.body;
      await new DiaryService().createDiary(
        id_user,
        title,
        description,
        question1,
        question2,
        question3,
      );
      res.json('Bem criado!');
    } catch (error) {
      return res.status(400).json(`erro no controller CreateDiary ${error}`);
    }
  }

  async getDiary(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      const saveUser = await new DiaryService().getDiary();
      return res.json({ res: saveUser });
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }

  async getDiaryByUser(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }

      const getDiary = await new DiaryService().getDiaryByUser(id.id);
      return res.json({ res: getDiary });
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }

  async getDiaryById(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      const id_my_diary = req.params.id;

      if (!id_my_diary) {
        return res.status(404).json({ error: 'Diary not exist' });
      }
      const getDiary = await new DiaryService().getDiaryById(id, id_my_diary);
      return res.json(getDiary);
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }

  async updateDiary(req: Request, res: Response) {
    try {
      const { title, description, question1, question2, question3 } = req.body;
      const id_my_diary = req.params.id;
      const { id } = (req as any).authUser;
      const resUpdate = await new DiaryService().updateDiary(
        id,
        id_my_diary,
        title,
        description,
        question1,
        question2,
        question3,
      );
      return res.json(resUpdate);
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }

  async deleteDiary(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      const id_my_diary = req.params.id;

      if (!id_my_diary) {
        return res.status(404).json({ error: 'Diary not exist' });
      }

      const resDelete = await new DiaryService().deleteDiary(id, id_my_diary);
      return res.json(resDelete);
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }
}
