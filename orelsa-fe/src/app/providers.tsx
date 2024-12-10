"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <SessionProvider>
        <Toaster
          toastOptions={{
            style: {
              zIndex: 999,
            },
          }}
        />
        {children}
      </SessionProvider>
    </NextUIProvider>
  );
};

export default Providers;
