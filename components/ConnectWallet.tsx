// components/ConnectWallet.tsx
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function ConnectWallet() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const connectWallet = async () => {
    let provider: ethers.providers.Web3Provider;

    try {
      if ((window as any).ethereum) {
        // 1️⃣ MetaMask / browser wallet
        provider = new ethers.providers.Web3Provider(
          (window as any).ethereum,
          "any"
        );
        // Request access
        await provider.send("eth_requestAccounts", []);
      } else {
        // 2️⃣ Fallback to WalletConnect
        const wcProvider = new WalletConnectProvider({
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        });
        // Opens QR modal
        await wcProvider.enable();

        provider = new ethers.providers.Web3Provider(
          wcProvider as any,
          "any"
        );
      }

      // Read address + balance
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      const bal = await provider.getBalance(addr);

      setAddress(addr);
      setBalance(ethers.utils.formatEther(bal));
      // Optionally persist which method you used:
      localStorage.setItem(
        "revibe_wallet",
        (window as any).ethereum ? "injected" : "walletconnect"
      );
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  // Auto‐reconnect only for injected (MetaMask) on page load
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("revibe_wallet") === "injected"
    ) {
      connectWallet();
    }
  }, []);

  // Render
  if (!address) {
    return (
      <button
        onClick={connectWallet}
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