import { v4 } from 'uuid';
import SosConfig from '../models/SosConfig';
import sosRepository from '../models/sos.repository';
import User from '@modules/User/models/user';

export default class SosConfigService {
  getSosConfigFromData(UserUrl: string, id_user: string): SosConfig {
    const newUserUrl = new SosConfig();
    newUserUrl.id = v4();
    newUserUrl.user_url = UserUrl;
    newUserUrl.user = new User();
    newUserUrl.user.id = id_user;
    return newUserUrl;
  }

  async uploadFile(id: string, file: any) {
    console.log(file, id)
    try {
      const findSos = await sosRepository.findOneBy({user: {id: id} });
      if (findSos == null) {
        return {erro: 'User not found'};
      }
      const uploadFile = new SosConfig()
      uploadFile.user_url = file.path
      const saveFile = await sosRepository.update(id, uploadFile);
      return saveFile
    } catch (err) {
      console.log(`Upload error: ${err}`);
      return 'Upload Failed';
    }
  }


}
