import { AppDataSource } from "@shared/data-source";
import user from "./user";

const userRepository = AppDataSource.getRepository(user)

export default userRepository
