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
      return res.json(saveBrief);
    } catch (err) {
      res.status(401).send('Get Brief Failed');
    }
  }

  async listByFalseBrief(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found' });
      }
      const saveBrief = await new BriefService().listByFalseBrief(id);
      return res.json(saveBrief);
    } catch (err) {
      res.status(401).send('Get Brief Failed');
    }
  }

  async updateBriefByAdm(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      const { status } = req.body;
      const id_brief = req.params.id;
      const resUpdate = await new BriefService().updateBriefByAdm(id_brief, status, id);
      return res.json(resUpdate);
    } catch (err) {
      res.status(401).send('Get Brief Failed');
    }
  }

  async deleteBriefByAdm(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      const id_brief = req.params.id;
      const resDelete = await new BriefService().deleteBriefByAdm(id_brief, id);
      return res.json(resDelete);
    } catch (err) {
      res.status(401).send('Get Brief Failed');
    }
  }
}
