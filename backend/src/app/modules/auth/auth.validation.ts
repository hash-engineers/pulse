import { z } from 'zod';
import { AuthConstant } from './auth.constant';

const signUp = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2).max(255),
    email: z.string({ required_error: 'Email is required' }).email(),
    role: z
      .enum([...AuthConstant.userRole] as [string, ...string[]])
      .default(AuthConstant.userRole[1]),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidation = { signUp };
