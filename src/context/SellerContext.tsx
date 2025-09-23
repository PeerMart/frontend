import React, { createContext, useContext, useEffect, useState } from 'react';
import { Seller } from '../models';
import { useAuth } from './AuthContext';
import { useContract } from './ContractContext';

interface SellerContextType {
  current: Seller | null;
}

const SellerContext = createContext<SellerContextType>({
  current: null
});

export const useSeller = () => useContext(SellerContext);

export const SellerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { wallet } = useAuth();
  const { read } = useContract();
  const [seller, setSeller] = useState<Seller | null>(null);

  const fetchAndSetSeller = async () => {
    if (!wallet) return;

    const raw1 = await read({ method: 'sellers', args: [wallet.address] });
    const raw2 = await read({ method: 'sellerContacts', args: [wallet.address] });
    if (raw1 && raw2) {
      const converted = new Seller([...raw1, ...raw2]);
      if (converted.name) setSeller(converted)
    }
  };

  useEffect(() => {
    if (!wallet) {
      setSeller(null);
    } else {
      fetchAndSetSeller();
    }
  }, [wallet]);

  return <SellerContext.Provider value={{ current: seller }}>{children}</SellerContext.Provider>;
};
