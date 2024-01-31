import { AuthSchema } from '../lib/ValidationSchemas/account-credential.scehma';
import { publicProceduer, router } from './trpc';
import { getPayloadClient } from '../get-payload';
import { TRPCError } from '@trpc/server';
import { log } from 'console';
import { z } from 'zod';

export const authRouter = router({
  createPayloadUser: publicProceduer
    .input(AuthSchema)
    .mutation(async ({ input: { email, password } }) => {
      const payload = await getPayloadClient();
      //   check if user  already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });
      console.log('user ', users);
      if (users.length > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
      }
      console.log('jere');
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user',
        },
      });
      return { success: true, sentToEmail: email };
    }),
  verifyEmaill: publicProceduer
    .input(z.object({ token: z.string() }))
    .query(async ({ input: { token } }) => {
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      });
      if (!isVerified) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }
      return { success: true };
    }),
  signIn: publicProceduer
    .input(AuthSchema)
    .mutation(async ({ input: { email, password }, ctx: { res } }) => {
      const payload = await getPayloadClient();
      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true };
      } catch (error) {}
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }),
});
