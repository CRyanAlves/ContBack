import { v4 } from 'uuid';
import Diary from '../models/Diary';
import diaryRepository from '../models/diary.repository';
import userRepository from '@modules/User/models/user.repository';

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
    newDiary.id_user = id_user;
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
    const getUserFromDiary = await diaryRepository.findOneBy({ id: id_user });
    console.log(getUserFromDiary);
    return getUserFromDiary;
  }
}
