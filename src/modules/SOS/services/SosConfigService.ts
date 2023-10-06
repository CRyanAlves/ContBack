import { v4 } from 'uuid';
import SosConfig from '../models/SosConfig';
import sosRepository from '../models/sos.repository';

export default class SosConfigService {
  getSosConfigFromData(UserUrl: string, id_user: string): SosConfig {
    const newUserUrl = new SosConfig();
    newUserUrl.id = v4();
    newUserUrl.UserUrl = UserUrl;
    newUserUrl.id_user = id_user;
    return newUserUrl;
  }

  async uploadFile(id: string, file: any) {
    try {
      const findSos = await sosRepository.findOneBy({ id_user: id });
      if (findSos == null) {
        return {erro: 'User not found'};
      }
      const uploadFile = new SosConfig()
      uploadFile.UserUrl = file.path
      const saveFile = await sosRepository.update(id, uploadFile);

    } catch (err) {
      console.log(`Upload error: ${err}`);
      return 'Upload Failed';
    }
  }
}
