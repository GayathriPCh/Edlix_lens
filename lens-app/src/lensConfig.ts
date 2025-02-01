import { LensConfig, development } from "@lens-protocol/react-web";
import { bindings } from "@lens-protocol/wagmi";
import { wagmiConfig } from "./wagmiConfig";

export const lensConfig: LensConfig = {
  environment: development,  // Use 'production' for mainnet
  bindings: bindings(wagmiConfig),
};
