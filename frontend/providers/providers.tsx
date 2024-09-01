'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { TanstackProvider } from './tanstack-provider';

type Props = { children: ReactNode };

export function Providers({ children }: Props) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <TanstackProvider>{children}</TanstackProvider>
    </ThemeProvider>
  );
}
