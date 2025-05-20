// components/WalletButton.tsx
import { WagmiConfig, createClient, useAccount, useBalance, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { goerli } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const { chains, provider } = configureChains([goerli], [publicProvider()]);
const client = createClient({ autoConnect: true, provider });

export function WalletPreview() {
  const { address } = useAccount();
  const { data } = useBalance({ address });

  if (!address) return <ConnectButton />;
  return (
    <div className="flex items-center space-x-2">
      <span className="font-mono text-sm">{address.slice(0, 6)}…{address.slice(-4)}</span>
      <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">{data?.formatted} {data?.symbol}</span>
    </div>
  );
}

// Wrap your app in WagmiConfig 
// in pages/_app.tsx
import { WagmiConfig } from "wagmi";
import { client } from "../components/WalletButton";

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}