import { createTRPCRouter, publicProcedure } from '../../trpc'
import { z } from 'zod'
export const todoRouter = createTRPCRouter({
  todo: publicProcedure.input(z.object({ text: z.string()}))
  .query(({ input }) => {
    return {}
  })
})