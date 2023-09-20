import { v4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import * as jwt from 'jsonwebtoken';

import userRepository from '../models/user.repository';

import User from '../models/user';
import logger from '@config/logger';
import { SECRET } from '@shared/constants';

class UserService {
  getUserFromData(
    email: string,
    name: string,
    password: string,
    telUser: number,
    telEmgUser: number,
  ): User {
    const newUser = new User();
    newUser.id = v4();
    newUser.email = email;
    newUser.name = name;
    newUser.telUser = telUser;
    newUser.telEmgUser = telEmgUser;
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
        { email: foundUser?.email, id: foundUser?.id },
        SECRET,
        { expiresIn: 300 },
      );
      return jwtToken;
    }
    throw new Error('User not found');
  }

  async signUpUser(
    email: string,
    name: string,
    password: string,
    telUser: number,
    telEmgUser: number,
  ) {
    console.log(email);
    const newUser = this.getUserFromData(
      email,
      name,
      password,
      telUser,
      telEmgUser,
    );
    await userRepository.save(newUser);
  }

  async getByUser(id_user: string = '9c7dbdcd-bc4b-4c36-af93-fca4e4b0ea32') {
    console.log(typeof id_user);
    const getUser = await userRepository.findOne({ where: id_user });
    return getUser;
  }

  async listUser() {
    const getUser = await userRepository.find();
    return getUser;
  }

  //1b9f4cee-d5bb-4b09-851f-171595544fb6
}

export default UserService;
