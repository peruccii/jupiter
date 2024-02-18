'use client';
import styles from './page.module.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { httpBatchLink } from '@trpc/client';
import Hello from '../components/Hello';
import { ModeToggle } from '@ui/components/mode-toggle'

export default function Page(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3003/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className={styles.main}>
          <Hello />
          <ModeToggle/>
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
