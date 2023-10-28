import { Request, Response } from 'express';
import BriefService from '../service/BriefService';

export default class BriefController {
  async createBrief(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found 2' });
      }
      const { description } = req.body;
      const resCreate = await new BriefService().createBrief(id, description);
      res.json(resCreate);
    } catch (error) {
      return res.status(400).send(`erro no controller CreateBrief ${error}`);
    }
  }

  async listByTrueBrief(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found' });
      }
      const { status } = req.body;
      const saveBrief = await new BriefService().listByTrueBrief();
      return res.send({ res: saveBrief });
    } catch (err) {
      res.status(401).send('Get Brief Failed');
    }
  }

  async listByFalseBrief(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found' });
      }
      const { status } = req.body;
      const saveBrief = await new BriefService().listByFalseBrief(status, id);
      return res.send({ res: saveBrief });
    } catch (err) {
      res.status(401).send('Get Brief Failed');
    }
  }

  async updateBrief(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const id_brief = req.params.id;
      // const { id } = (req as any).authUser;
      const resUpdate = await new BriefService().updateBrief(id_brief, status);
      return res.json(resUpdate);
    } catch (err) {
      res.status(401).send('Get Brief Failed');
    }
  }
}
