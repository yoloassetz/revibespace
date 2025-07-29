// components/ConnectWallet.tsx
"use client";

import "web3modal/dist/index.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function ConnectWallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const providerOptions = {
    injected: {
      display: { name: "Browser Wallet", description: "MetaMask, Brave…" },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: { infuraId: process.env.NEXT_PUBLIC_INFURA_ID },
    },
  };

  const connect = async () => {
    try {
      const modal = new Web3Modal({ cacheProvider: true, providerOptions });
      const instance = await modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      const bal = await provider.getBalance(addr);

      setAddress(addr);
      setBalance(ethers.utils.formatEther(bal));
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const modal = new Web3Modal({ cacheProvider: true, providerOptions });
      if (modal.cachedProvider) connect();
    }
  }, []);

  if (!address) {
    return (
      <button
        onClick={connect}
        className="bg-white bg-opacity-20 px-3 py-1 rounded hover:bg-opacity-30 transition"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="inline-flex items-center space-x-2 font-mono text-sm">
      <span>
        {address.slice(0, 6)}…{address.slice(-4)}
      </span>
      <span>({parseFloat(balance).toFixed(4)} ETH)</span>
    </div>
  );
}