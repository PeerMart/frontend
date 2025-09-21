'use client';

import { ethers } from 'ethers';
import type React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface WalletInfo {
  address: string;
  balance: string;
  provider: ethers.BrowserProvider;
  signer: ethers.JsonRpcSigner;
}

interface AuthContextType {
  isConnected: boolean;
  wallet: WalletInfo | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hedera Testnet configuration
const HEDERA_TESTNET_CONFIG = {
  chainId: '0x128', // 296 in hex (Hedera Testnet)
  chainName: 'Hedera Testnet',
  nativeCurrency: {
    name: 'HBAR',
    symbol: 'HBAR',
    decimals: 18
  },
  rpcUrls: ['https://testnet.hashio.io/api'],
  blockExplorerUrls: ['https://hashscan.io/testnet']
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const balance = await provider.getBalance(accounts[0]);

            setWallet({
              address: accounts[0],
              balance: ethers.formatEther(balance),
              provider,
              signer
            });
            setIsConnected(true);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (wallet && accounts[0] !== wallet.address) {
          // Account changed, reconnect
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [wallet]);

  const switchToHederaNetwork = async () => {
    if (!window.ethereum) throw new Error('MetaMask not found');

    try {
      // Try to switch to Hedera Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: HEDERA_TESTNET_CONFIG.chainId }]
      });
    } catch (switchError: any) {
      // If the chain doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [HEDERA_TESTNET_CONFIG]
        });
      } else {
        throw switchError;
      }
    }
  };

  const connectWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Switch to Hedera network
      await switchToHederaNetwork();

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      const walletInfo: WalletInfo = {
        address,
        balance: ethers.formatEther(balance),
        provider,
        signer
      };

      setWallet(walletInfo);
      setIsConnected(true);
      setError(null);
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      setIsConnected(false);
      setWallet(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setWallet(null);
    setError(null);
  }, []);

  const value: AuthContextType = {
    isConnected,
    wallet,
    connectWallet,
    disconnectWallet,
    isConnecting,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
