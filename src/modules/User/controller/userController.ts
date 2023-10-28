import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      if(!email || !password) {
        return res.status(406).json({ error: 'Password/email not received' });
      }
      const token = await new UserService().loginUser(email, password);
      res.json({ token });
    } catch (error) {
      return res.status(404).json(`Login Failed: ${error}`);
    }
  }

  async signUpUser(req: Request, res: Response) {
    try {
      const { email_user, nome_user, senha_user } =
        req.body;
      const createUser = await new UserService().signUpUser(
        email_user,
        nome_user,
        senha_user
      );
      return res.json({ res: createUser });
    } catch (error) {
      return res.status(400).json(`Error: ${error}`);
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      const saveUser = await new UserService().getByUser(id.id);
      return res.json({ res: saveUser });
    } catch (error) {
      return res.status(401).json(`Get User Failed: ${error}`);
    }
  }

  async listUser(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      const listUser = await new UserService().listUser(id.id);
      return res.json({ res: listUser });
    } catch (error) {
      return res.status(401).json(`Get User Failed: ${error}`);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      await new UserService().deleteUser(id);
      return res.json({ res: 'Usuário Deletado' });
    } catch (error) {
      return res.status(401).json(`Get User Failed: ${error}`);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { nome, senha_user } = req.body;
      const { id } = (req as any).authUser;
      if (!id) {
        return res.status(404).json({ error: 'User not found' });
      }
      const response = await new UserService().updateUser(id, nome, senha_user);
      return res.json({ res: response });
    } catch (error) {
      return res.status(401).json(`Get User Failed: ${error}`);
    }
  }
}

export default UserController;
