import { AppDataSource } from '@shared/data-source';
import Diary from './Diary';

const diaryRepository = AppDataSource.getRepository(Diary);

export default diaryRepository;
