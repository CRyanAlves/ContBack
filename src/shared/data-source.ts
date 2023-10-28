import Brief from '@modules/Brief/models/Brief';
import Diary from '@modules/Diary/models/Diary';
import SosConfig from '@modules/SOS/models/SosConfig';
import User from '@modules/User/models/user';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const PORT = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Diary, SosConfig, Brief],
});
