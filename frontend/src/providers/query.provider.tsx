import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../contexts/queryClient";
import type React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Provider;
