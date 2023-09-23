import { AppDataSource } from '@shared/data-source';
import Diary from './Diary';

const userRepository = AppDataSource.getRepository(Diary);

export default userRepository;
