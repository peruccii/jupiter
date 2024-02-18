import { todoRouter } from "./api/routers/todo";

export const appRouter = createTRPCRouter({
  todo: todoRouter
})

export type