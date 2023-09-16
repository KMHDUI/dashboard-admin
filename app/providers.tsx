// app/providers.tsx
"use client";

import { DataContextProvider } from "@/context/DataContext";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <DataContextProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </DataContextProvider>
    </CacheProvider>
  );
}
