import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide the valid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be 8 or more charactor' }),
});

export { formSchema };
