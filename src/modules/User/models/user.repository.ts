import { AppDataSource } from '@shared/data-source';
import User from './User';

const userRepository = AppDataSource.getRepository(User);

export default userRepository;
