import { Request, Response } from 'express';
import DiaryService from '../services/DiaryService';

export default class DiaryController {
  async createDiary(req: Request, res: Response) {
    try {
      const {id} = (req as any).authUser;
      const id_user = id
      console.log(id_user);
      if (!id_user) {
        return res.status(404).send({ error: 'User not found 2' });
      }
      const {  title, description, question1, question2, question3, question4 } =
        req.body;
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
}
