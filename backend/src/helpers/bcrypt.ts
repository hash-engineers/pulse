import env from '../env';
import { compare, hash } from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, Number(env.BCRYPT_SALT_ROUND));
};

const matchPassword = async (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> => {
  return await compare(givenPassword, savedPassword);
};

export { hashPassword, matchPassword };
