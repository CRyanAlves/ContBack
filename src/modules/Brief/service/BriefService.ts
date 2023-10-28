import { v4 } from 'uuid';
import Brief from '../models/Brief';
import User from '@modules/User/models/user';
import briefRepository from '../models/brief.repository';
import userRepository from '@modules/User/models/user.repository';

export default class BriefService {
  getBriefFromData(id_user: string, description: string): Brief {
    const newBrief = new Brief();
    newBrief.id = v4();
    newBrief.description = description;
    newBrief.user = new User();
    newBrief.user.id = id_user;

    return newBrief;
  }

  async createBrief(id_user: string, description: string) {
    {
      await briefRepository.findOneBy({ id: id_user });
      const newBrief = this.getBriefFromData(id_user, description);
      return await briefRepository.save(newBrief);
    }
  }

  async listByTrueBrief() {
    const getUserFromBrief = await briefRepository.find({ where: { status: true } });
    if (getUserFromBrief.length > 0) {
      return getUserFromBrief;
    }
    return 'Brief not found';
  }

  async listByFalseBrief(id_user: string, status: boolean) {
    const getUser = await userRepository.findOneBy({ id: id_user });
    if (getUser?.isAdmin === true) {
      const getUserFromBrief = await briefRepository.find({ where: { status: false } });
      if (getUserFromBrief.length > 0) {
        return getUserFromBrief;
      }
      return 'No brief to approve';
    }
    return 'User is not ADM';
  }

  async updateBrief(id_brief: string, status: boolean) {
    const getBriefById = await briefRepository.findOneBy({ id: id_brief });
    const updateBrief = new Brief();

    if (getBriefById) {
      updateBrief.status = !status ? getBriefById?.status : status;

      await briefRepository.update(getBriefById.id, updateBrief);

      return 'Brief Updated';
    } else {
      return 'Brief not found';
    }
  }
}
