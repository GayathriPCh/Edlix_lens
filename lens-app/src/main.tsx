import React from "react";
import ReactDOM from "react-dom/client";
import { LensProvider } from "@lens-protocol/react-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmiConfig";
import { lensConfig } from "./lensConfig";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <LensProvider config={lensConfig}>
          <App />
        </LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
