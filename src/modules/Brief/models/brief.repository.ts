import { AppDataSource } from '@shared/data-source';
import Brief from './Brief';

const briefRepository = AppDataSource.getRepository(Brief);

export default briefRepository;
