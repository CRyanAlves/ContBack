import { v4 } from 'uuid';
import SosConfig from '../models/SosConfig';
import sosRepository from '../models/sos.repository';
import User from '@modules/User/models/user';
import * as fs from 'fs';
import * as path from 'path';

export default class SosConfigService {
  getSosConfigFromData(
    UserUrl: string,
    id_user: string,
    description: string,
    title: string,
  ): SosConfig {
    const newUserUrl = new SosConfig();
    newUserUrl.id = v4();
    newUserUrl.user_url = UserUrl;
    newUserUrl.description = description;
    newUserUrl.title = title;
    newUserUrl.user = new User();
    newUserUrl.user.id = id_user;
    return newUserUrl;
  }

  async uploadFile(id: string, file: any, description: string, title: string) {
    try {
      const uploadFile = new SosConfig();
      uploadFile.id = v4();
      uploadFile.user = new User();
      uploadFile.user.id = id;
      uploadFile.user_url = file.filename;
      uploadFile.description = description;
      uploadFile.title = title;
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

    const fileName = getFileById.user_url;
    const directoryPath = path.join(__dirname, '../../../config', 'pictures');
    const filePath = path.join(directoryPath, fileName);

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

    if (!fileToUpdate) {
      throw new Error('File not found');
    }

    if (id_user !== fileToUpdate.user.id) {
      throw new Error('User does not have access to update this file');
    }

    const fileName = fileToUpdate.user_url;
    const directoryPath = path.join(__dirname, '../../../config', 'pictures');
    const filePath = path.join(directoryPath, fileName);
    if (fs.existsSync(filePath)) {
      if (file || description !== undefined) {
        if (file) {
          fileToUpdate.user_url = file.filename;
        }

        if (description !== undefined) {
          fileToUpdate.description = description;
        }

        await sosRepository.save(fileToUpdate);

        try {
          if (file) {
            fs.unlinkSync(filePath);
          }

          return 'File updated successfully';
        } catch (error) {
          throw new Error(`Error updating the file: ${error}`);
        }
      } else {
        return 'No changes to update';
      }
    } else {
      throw new Error(`File not found at path: ${filePath}`);
    }
  }
}
