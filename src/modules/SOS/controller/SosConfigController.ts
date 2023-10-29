import { Request, Response } from 'express';
import SosConfigService from '../services/SosConfigService';

export default class SosConfigController {
  async uploadFile(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      const file = req.file;
      if (!file) {
        return res.json({ error: 'File not found' });
      }
      const { description } = req.body;
      const saveFile = await new SosConfigService().uploadFile(id, file, description);
      return res.status(200).json(saveFile);
    } catch (err) {
      res.status(401).json('Upload File Failed' + err);
    }
  }

  async findFile(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }

      const getSosFiles = await new SosConfigService().findFile(id.id);
      return res.json({ res: getSosFiles });
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }

  async findFilesById(req: Request, res: Response) {
    try {
      const {id} = (req as any).authUser;
      const id_file = req.params.id;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }

      const getSosFiles = await new SosConfigService().findFileById(id, id_file);
      return res.json(getSosFiles);
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const { id } = (req as any).authUser;
      const id_file = req.params.id;

      if (!id_file) {
        return res.status(404).json({ error: 'File not exist' });
      }

      const resDelete = await new SosConfigService().deleteFile(id, id_file);
      return res.json(resDelete);
    } catch (err) {
      res.status(401).json('Get User Failed' + err);
    }
  }

  // async updateFile(req: Request, res: Response) {
  //   try {
  //     const { id } = (req as any).authUser;
  //     const id_file = req.params.id;

  //     if (!id_file) {
  //       return res.status(404).json({ error: 'File not exist' });
  //     }
  //     const { description } = req.body;
  //     const file = req.file;

  //     const resDelete = await new SosConfigService().updateFile(
  //       id,
  //       id_file,
  //       file,
  //       description,
  //     );
  //     return res.json(resDelete);
  //   } catch (err) {
  //     res.status(401).json('Get User Failed' + err);
  //   }
  // }
}
