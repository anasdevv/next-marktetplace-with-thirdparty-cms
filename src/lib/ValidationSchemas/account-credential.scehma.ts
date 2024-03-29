import { z } from 'zod';
export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});
export type TAuthScehma = z.infer<typeof AuthSchema>;
