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
    throw new Error('Brief not found');
  }

  async listByFalseBrief(id_user: string) {
    const getAdm = await userRepository.findOneBy({ id: id_user });
    if (getAdm?.isAdmin === true) {
      const getUserFromBrief = await briefRepository.find({ where: { status: false } });
      if (getUserFromBrief.length > 0) {
        return getUserFromBrief;
      }
      throw new Error('No brief to approve');
    }
    throw new Error('User is not ADM');
  }

  async updateBriefByAdm(id_brief: string, status: boolean, id_user: string) {
    const getAdm = await userRepository.findOneBy({ id: id_user });
    if (getAdm?.isAdmin === true) {
      const getBriefById = await briefRepository.findOneBy({ id: id_brief });
      const updateBrief = new Brief();

      if (getBriefById) {
        updateBrief.status = !status ? getBriefById?.status : status;

        await briefRepository.update(getBriefById.id, updateBrief);

        return 'Brief Updated';
      } else {
        throw new Error('Brief not found');
      }
    }
    throw new Error('User is not ADM');
  }

  async deleteBriefByAdm(id_brief: string, id_user: string) {
    const getAdm = await userRepository.findOneBy({ id: id_user });
    if (getAdm?.isAdmin === true) {
      const briefExist = await briefRepository.findOneBy({ id: id_brief });
      if (!!briefExist) {
        await briefRepository.delete({ id: id_brief });
        return 'Brief Deleted';
      }
      throw new Error('Brief is not exist');
    }
    throw new Error('User is not ADM');
  }
}
