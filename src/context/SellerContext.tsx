import React, { createContext, useContext, useEffect, useState } from 'react';
import { Seller } from '../models';
import { useAuth } from './AuthContext';
import { useContract } from './ContractContext';

interface SellerContextType {
  current: Seller | null;
  register: (props: RegisterSellerProps) => Promise<boolean>;
  sell: (props: ListProductProps) => Promise<boolean>;
}

export interface RegisterSellerProps {
  name: string;
  twitterUsername: string;
  location: string;
  phoneNumber: string;
}

export interface ListProductProps {
  name: string;
  ipfsHash: string;
  price: number;
  description: string;
  inventory: number;
}

const SellerContext = createContext<SellerContextType>({
  current: null,
  register: async () => false,
  sell: async () => false
});

export const useSeller = () => useContext(SellerContext);

export const SellerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { wallet } = useAuth();
  const { read, write } = useContract();
  const [seller, setSeller] = useState<Seller | null>(null);

  const fetchAndSetSeller = async () => {
    if (!wallet) return;

    const raw1 = await read({ method: 'sellers', args: [wallet.address] });
    const raw2 = await read({ method: 'sellerContacts', args: [wallet.address] });
    if (raw1 && raw2) {
      const converted = new Seller([...raw1, ...raw2]);
      if (converted.name) setSeller(converted);
    }
  };

  const register = async (props: RegisterSellerProps) => {
    if (!wallet || seller) return false;

    const { location, name, phoneNumber, twitterUsername } = props;
    const twitterUrl = `https://x.com/${twitterUsername}`;

    const result = await write({ method: 'registerSeller', args: [name, twitterUrl, location, phoneNumber] });
    if (result) await fetchAndSetSeller();
    return !!result;
  };

  const sell = async (props: ListProductProps) => {
    if (!wallet || !seller) return false;

    const { name, ipfsHash, price, description, inventory } = props;
    const imageUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

    const result = await write({ method: 'createProduct', args: [name, imageUrl, price, description, inventory] });
    return !!result;
  };

  useEffect(() => {
    if (!wallet) {
      setSeller(null);
    } else {
      fetchAndSetSeller();
    }
  }, [wallet]);

  return <SellerContext.Provider value={{ current: seller, register, sell }}>{children}</SellerContext.Provider>;
};
