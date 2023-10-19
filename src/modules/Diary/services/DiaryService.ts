import { v4 } from 'uuid';
import Diary from '../models/Diary';
import diaryRepository from '../models/diary.repository';
import userRepository from '@modules/User/models/user.repository';
import User from '@modules/User/models/user';

export default class DiaryService {
  getDiaryFromData(
    id_user: string,
    title: string,
    description: string,
    question1: string,
    question2: string,
    question3: string,
    question4: string,
  ): Diary {
    const newDiary = new Diary();
    newDiary.id = v4();
    newDiary.title = title;
    newDiary.description = description;
    newDiary.question1 = question1;
    newDiary.question2 = question2;
    newDiary.question3 = question3;
    newDiary.question4 = question4;
    newDiary.user = new User();
    newDiary.user.id = id_user;
    return newDiary;
  }

  async createDiary(
    id_user: string,
    title: string,
    description: string,
    question1: string,
    question2: string,
    question3: string,
    question4: string,
  ) {
    const getUser = await userRepository.findOneBy({ id: id_user });
    if (getUser) {
      const newUser = this.getDiaryFromData(
        id_user,
        title,
        description,
        question1,
        question2,
        question3,
        question4,
      );
      await diaryRepository.save(newUser);
    }
    return 'User Not Found';
  }

  async getDiary() {
    const getUserFromDiary = await diaryRepository.find();
    return getUserFromDiary;
  }

  async getDiaryByUser(id_user: string) {
    const getUserFromDiary = await diaryRepository.findBy({ user: { id: id_user } });
    return getUserFromDiary;
  }

  async updateDiary(
    id_user: string,
    id_meu_diário: string,
    title: string,
    description: string,
    question1: string,
    question2: string,
    question3: string,
    question4: string,
  ) {
    const getDiaryById = await diaryRepository.findOneBy({ id: id_meu_diário });

    if (id_user != getDiaryById?.user.id) {
      return 'User not accessible this Diary';
    }
    const updateDiary = new Diary();

    if (getDiaryById) {
      updateDiary.title = !title ? getDiaryById?.title : title;
      updateDiary.description = !description ? getDiaryById?.description : description;
      updateDiary.question1 = !question1 ? getDiaryById?.question1 : question1;
      updateDiary.question2 = !question2 ? getDiaryById?.question2 : question2;
      updateDiary.question3 = !question3 ? getDiaryById?.question3 : question3;
      updateDiary.question4 = !question4 ? getDiaryById?.question4 : question4;

      await diaryRepository.update(getDiaryById.id, updateDiary);

      return 'User Updated';
    } else {
      return 'Diary not found';
    }
  }

  async deleteDiary(id_user: string, id_meu_diário: string) {
    const getDiaryById = await diaryRepository.findOneBy({ id: id_meu_diário });

    if (id_user != getDiaryById?.user.id) {
      return 'User not accessible this Diary';
    } else {
      await diaryRepository.delete({ id: id_meu_diário });

      return 'Diary deleted';
    }
  }
}
