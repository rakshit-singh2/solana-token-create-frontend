import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, ReactNode, useCallback, useMemo } from "react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import { notify } from "../utils/notifications";
import { NetworkConfigurationProvider, useNetworkConfiguration } from "./NetworkConfigurationProvider";

require("@solana/wallet-adapter-react-ui/styles.css");

type WalletContextProviderProps = {
  children: ReactNode;
};

const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;

  // Endpoint for Solana network
  const originalEndpoint = useMemo(() => clusterApiUrl(network), [network]);

  let endpoint;

  if (network == "mainnet-beta") {
    endpoint = "https://solana-mainnet.g.alchemy.com/v2/XQAa0JjXMHCm5fyFr1cTq-NdtNWsoO7P"
  } else if (network == "devnet") {
    endpoint = originalEndpoint;
  } else {
    endpoint = originalEndpoint;
  };

  // Wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  // Error handling for wallet actions
  const onError = useCallback((error: WalletError) => {
    notify({
      type: "error", message: error.message ? `${error.name} : ${error.message}` : error.name,
    });
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >
        <ReactUIWalletModalProvider>
          <AutoConnectProvider>
            {children}
          </AutoConnectProvider>
        </ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider: FC<WalletContextProviderProps> = ({ children }) => (
  <NetworkConfigurationProvider>
    <WalletContextProvider>{children}</WalletContextProvider>
  </NetworkConfigurationProvider>
);
