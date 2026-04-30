'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { PokemonProvider } from '@/context/PokemonContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PokemonProvider>{children}</PokemonProvider>
    </ThemeProvider>
  );
}
