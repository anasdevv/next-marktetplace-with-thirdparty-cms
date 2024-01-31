import { z } from 'zod';
import { authRouter } from './auth-router';
import { publicProceduer, router } from './trpc';
import { QueryValidator } from '../lib/ValidationSchemas/query-validator';
import { getPayloadClient } from '../get-payload';
import { hasUncaughtExceptionCaptureCallback } from 'process';

export const appRouter = router({
  auth: authRouter,
  getInfiniteProducts: publicProceduer
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input: { query, cursor } }) => {
      const { sort, limit, ...queryOpts } = query;
      const payload = await getPayloadClient();
      const parsedQueryOpts: Record<string, { equals: string }> = {};
      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = { equals: value };
      });
      const page = cursor || 1;
      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});
export type AppRouter = typeof appRouter;
