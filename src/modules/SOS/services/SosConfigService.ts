import { v4 } from 'uuid';
import SosConfig from '../models/SosConfig';
import sosRepository from '../models/sos.repository';
import User from '@modules/User/models/user';
import * as fs from 'fs';
import * as path from 'path';

export default class SosConfigService {
  getSosConfigFromData(UserUrl: string, id_user: string, description: string): SosConfig {
    const newUserUrl = new SosConfig();
    newUserUrl.id = v4();
    newUserUrl.user_url = UserUrl;
    newUserUrl.description = description;
    newUserUrl.user = new User();
    newUserUrl.user.id = id_user;
    return newUserUrl;
  }

  async uploadFile(id: string, file: any, description: string) {
    try {
      console.log(file);
      const uploadFile = new SosConfig();
      uploadFile.id = v4();
      uploadFile.user = new User();
      uploadFile.user.id = id;
      uploadFile.user_url = file.filename;
      uploadFile.description = description;
      const saveFile = await sosRepository.save(uploadFile);
      return saveFile;
    } catch (err) {
      throw new Error(`Upload error: ${err}`);
    }
  }

  async findFile(id_user: string) {
    const getUserFromDiary = await sosRepository.findBy({ user: { id: id_user } });
    return getUserFromDiary;
  }

  async findFileById(id_user: string, id_file: string) {
    const getFileById = await sosRepository.findOneBy({ id: id_file });
    if (id_user != getFileById?.user.id) {
      throw new Error('User not accessible this File');
    } else {
      return getFileById;
    }
  }

  async deleteFile(id_user: string, id_file: string) {
    const getFileById = await sosRepository.findOneBy({ id: id_file });

    if (id_user != getFileById?.user.id) {
      throw new Error('User does not have access to this file');
    }

    const filePath = path.resolve(__dirname, getFileById.user_url);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new Error(`Error deleting the file: ${error}`);
      }
    } else {
      throw new Error(`File not found at path: ${filePath}`);
    }

    await sosRepository.delete({ id: id_file });

    return 'File deleted';
  }

  async updateFile(id_user: string, id_file: string, file: any, description: string) {
    const fileToUpdate = await sosRepository.findOneBy({ id: id_file });
    console.log(fileToUpdate);
    console.log(description);
    console.log(file);
    if (id_user !== fileToUpdate?.user.id) {
      throw new Error('User does not have access to update this file');
    }

    if (!!file || description !== undefined) {
      const filePath = path.resolve(__dirname, fileToUpdate.user_url);
      if (fs.existsSync(filePath)) {
        if (!!file) {
          const updateFile = new SosConfig();
          updateFile.user_url = file.path;
          if (description !== undefined) {
            updateFile.description = description;
          } else {
            updateFile.description = fileToUpdate.description;
          }
          updateFile.id = id_file;

          await sosRepository.save(updateFile);

          try {
            return fs.unlinkSync(filePath);
          } catch (error) {
            throw new Error(`Error deleting the file: ${error}`);
          }
        } else {
          if (description !== undefined) {
            fileToUpdate.description = description;
            return await sosRepository.save(fileToUpdate);
          }

          return;
        }
      } else {
        throw new Error(`File not found at path: ${filePath}`);
      }
    }
    return 'failed';
  }
}
