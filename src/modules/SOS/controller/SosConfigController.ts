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
}
