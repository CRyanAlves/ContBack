import { Request, Response } from 'express';
import SosConfigService from '../services/SosConfigService';

export default class SosConfigController {
  async uploadFile(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) {
        return res.send({ error: 'File not found' });
      }
      const { id } = (req as any).authUser;
      const saveFile = await new SosConfigService().uploadFile(id, file);
      return res.status(200).send({ res: saveFile });
    } catch (err) {
      res.status(401).send('Upload File Failed');
    }
  }

  async findFile(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found' });
      }

      const getSosFiles = await new SosConfigService().findFile(id.id);
      return res.send({ res: getSosFiles });
    } catch (err) {
      res.status(401).send('Get User Failed');
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      const  id_file   = req.params.id;

      if (!id_file) {
        return res.status(404).send({ error: 'File not exist' });
      }

      const resDelete = await new SosConfigService().deleteFile(id, id_file);
      return res.json(resDelete);
    } catch (err) {
      res.status(401).send('Get User Failed');
    }
  }
}
