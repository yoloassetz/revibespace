// components/ConnectWallet.tsx
import { useEffect, useState, MouseEvent } from "react";
import { ethers, type providers } from "ethers";
import Web3Modal from "web3modal";

/** Narrower (and safer) type for window.ethereum */
interface EthereumProvider extends providers.ExternalProvider {
  isMetaMask?: boolean;
  on?: (event: string, handler: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum: any; // Ensure compatibility with other declarations
  }
}

export default function ConnectWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);

  /** Initialise Web3Modal just once on mount */
  useEffect(() => {
    if (!window.ethereum) return;

    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });

    /** Auto-reconnect if the user connected previously */
    if (web3Modal.cachedProvider) {
      connectWallet(web3Modal).catch(console.error);
    }
  }, []);

  /** Click handler */
  async function handleConnect(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const web3Modal = new Web3Modal({ cacheProvider: true });
    await connectWallet(web3Modal);
  }

  /** Shared connect routine */
  async function connectWallet(modal: Web3Modal) {
    try {
      const extProvider = (await modal.connect()) as EthereumProvider;
      const web3Provider = new ethers.providers.Web3Provider(extProvider, "any");
      const signer = await web3Provider.getSigner();
      const userAddress = await signer.getAddress();

      setProvider(web3Provider);
      setAddress(userAddress);

      // listen for account switches
      extProvider.on?.("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0] || null);
      });
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  }

  return (
    <button
      onClick={handleConnect}
      className="ml-4 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
    >
      {address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Connect Wallet"}
    </button>
  );
}