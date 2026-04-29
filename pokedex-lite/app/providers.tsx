'use client';

import { PokemonProvider } from '@/context/PokemonContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <PokemonProvider>{children}</PokemonProvider>;
}
