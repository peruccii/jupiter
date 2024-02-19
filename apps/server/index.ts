import fastify from 'fastify'
import { publicProcedure, router } from './trpc';
import { createContext } from './context';
import cors from '@fastify/cors'
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';

const appRouter = router({
  helloWorld: publicProcedure.query(async () => {
    return 'Ola mundo';
  }),
  
});

export type AppRouter = typeof appRouter;

const app = fastify();
app.register(cors, {
  origin: "*"
});

app.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

const PORT: number = Number(process.env.PORT) || 3003;
app.listen({
  port: PORT,
  host: '0.0.0.0',
}).then(() => {
  console.log(`🚀 Server running on Port: ${PORT}`)
})
