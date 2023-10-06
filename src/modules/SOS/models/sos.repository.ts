import { AppDataSource } from '@shared/data-source';
import SosConfig from './SosConfig';

const sosRepository = AppDataSource.getRepository(SosConfig);

export default sosRepository;
