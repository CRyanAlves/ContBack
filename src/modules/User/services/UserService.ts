import { v4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import * as jwt from 'jsonwebtoken';

import userRepository from '../models/user.repository';

import User from '../models/user';
import logger from '@config/logger';
import { SECRET } from '@shared/constants';
import { OAuth2Client } from 'google-auth-library';

class UserService {
  getUserFromData(email: string, name: string, password: string): User {
    const newUser = new User();
    newUser.id = v4();
    newUser.email = email;
    newUser.name = name;
    const hashDigest = sha256(password);
    logger.debug('HashAntes: ', hashDigest);
    const privateKey = 'FIEC2023';
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
    logger.debug('HashDepos: ', hashDigest);
    newUser.password = hmacDigest;
    return newUser;
  }

  async loginUser(email: string, password: string): Promise<string> {
    const hashDigest = sha256(password);
    logger.debug('HashAntes: ', hashDigest);
    const privateKey = 'FIEC2023';
    const passwordHashed = Base64.stringify(hmacSHA512(hashDigest, privateKey));
    const foundUser = await userRepository.findOneBy({
      email,
      password: passwordHashed,
    });
    if (foundUser) {
      const jwtToken = jwt.sign(
        { email: foundUser?.email, id: foundUser?.id},
        SECRET,
        // { expiresIn: 5 * 60 * 60},
      );
      return jwtToken;
    }
    throw new Error('User not found');
  }

  async loginGoogle(req:any, res:any){
    try{
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: req.body.token
    });
    const payload = ticket.getPayload();
    const googleId = payload?.sub;
    const email = payload?.email;
    // const password = req.body.password;

    if(!email) {
      res.status(401).send();
      return;
  }
  const foundUser = await userRepository.findOneBy({ email });
  if (foundUser) {
    //foundUser.auth = req.body.fcmToken;
    foundUser.googleId = googleId || '';
    await userRepository.save(foundUser);
     }
      
      if(foundUser){
        const token = jwt.sign({email:foundUser.email,password:foundUser.password,id:foundUser.id},'pao')
        const user = {
          token:token,
        }
        console.log(user)
        return user
      }
      else{
        return {erro:"Conta inexistente"}
      }
        
}catch(error){
    console.log(error)
    return {error:"Não foi possivel logar "}
   }}
  
  async signUpUser(email: string, name: string, password: string) {
    const existEmail = await userRepository.findOne({ where: { email } });
    if (!!existEmail) {
      throw new Error('Email já utilizado');
    }
    const newUser = this.getUserFromData(email, name, password);
    await userRepository.save(newUser);
    return 'Bem Criado';
  }

  async getByUser(id_user: string) {
    const getUser = await userRepository.findOneBy({ id: id_user });
    return getUser;
  }

  async listUser(id_user: string) {
    const getAdm = await userRepository.findOneBy({ id: id_user });

    if (getAdm?.isAdmin === true) {
      const getUser = await userRepository.find();
      return getUser;
    }
    throw new Error('User is not ADM');
  }

  async deleteUser(id_user: string) {
    await userRepository.delete(id_user);
  }

  async updateUser(id_user: string, user: string, senha_user: string) {
    const getUser = await userRepository.findOneBy({ id: id_user });
    const updateUser = new User();
    if (getUser) {
      updateUser.name = !user ? getUser?.name : user;

      if (senha_user) {
        const hashDigest = sha256(senha_user);
        logger.debug('HashAntes: ', hashDigest);
        const privateKey = 'FIEC2023';
        const passwordHashed = Base64.stringify(hmacSHA512(hashDigest, privateKey));
        updateUser.password = !user ? getUser?.password : passwordHashed;
      }

      const savedUpdate = await userRepository.update(id_user, updateUser);
      return savedUpdate;
    } else {
      throw new Error('User not found');
    }
  }
}

export default UserService;
