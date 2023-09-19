import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await new UserService().loginUser(email, password);
      res.json({ token });
    } catch (err) {
      res.status(401).send('Login Failed');
    }
  }
  async signUpUser(req: Request, res: Response) {
    try {
      const { email_user, nome_user, senha_user, tel_user, tel_emg_user } =
        req.body;
      await new UserService().signUpUser(
        email_user,
        nome_user,
        senha_user,
        tel_user,
        tel_emg_user,
      );
      res.json('Bem criado!');
    } catch (error) {
      return res.status(400).send(`erro no controller signupuser ${error}`);
    }
  }

  async listUser(req: Request, res: Response) {
    try {
      const id = (req as any).authUser;
      if (!id) {
        return res.status(404).send({ error: 'User not found' });
      }
      const listUser = await new UserService().listUser();
      return res.send({ res: listUser });
    } catch (err) {
      res.status(401).send('Get User Failed');
    }
  }
}

export default UserController;