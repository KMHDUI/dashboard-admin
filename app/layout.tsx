"use client";

import Header from "@/components/Layout/Header/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { useDisclosure } from "@chakra-ui/react";
import { Providers } from "./providers";
import AppDrawer from "@/components/Drawer/Drawer";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header onOpen={onOpen} open={isOpen} />
          <div>
            <AppDrawer isOpen={isOpen} onClose={onClose} />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
