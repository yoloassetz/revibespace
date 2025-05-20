// components/WalletButton.tsx

import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletButton() {
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    // Assuming Goerli; switch to your desired chain
    chainId: 5,
  });

  return (
    <div className="flex items-center space-x-4">
      {/* RainbowKit’s ConnectButton */}
      <ConnectButton showBalance={false} />

      {/* Show balance once connected */}
      {isConnected && (
        <span className="font-medium">
          {isLoading
            ? "Loading…"
            : isError
            ? "Error"
            : `${parseFloat(data?.formatted || "0").toFixed(4)} ${data?.symbol}`}
        </span>
      )}
    </div>
  );
}
