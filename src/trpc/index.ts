import { publicProceduer, router } from './trpc';

export const appRouter = router({
  anyApiRoute: publicProceduer.query(() => {
    return 'hello';
  }),
});
export type AppRouter = typeof appRouter;
