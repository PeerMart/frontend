import React, { createContext, useContext, useEffect, useState } from 'react';
import { Purchase } from '../models';
import { useAuth } from './AuthContext';
import { useContract } from './ContractContext';

interface PurchasesContextType {
  current: Purchase[];
  fetchPurchases: () => Promise<void>;
}

const PurchasesContext = createContext<PurchasesContextType>({ current: [], fetchPurchases: async () => {} });

export const usePurchases = () => useContext(PurchasesContext);

export const PurchasesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const { wallet } = useAuth();
  const { read } = useContract();

  const fetchPurchases = async () => {
    if (!wallet) return;

    try {
      // Get total number of products
      const productCount = await read({ method: 'productCount' });
      if (!productCount || productCount === 0) {
        setPurchases([]);
        return;
      }

      const userPurchases: Purchase[] = [];

      // Loop through all products to check for purchases by this user
      for (let productId = 1; productId <= Number(productCount); productId++) {
        try {
          // Check if user has a purchase for this product
          const purchaseData = await read({
            method: 'purchases',
            args: [productId, wallet.address]
          });

          // If purchase exists (productId is not 0) and user is the buyer
          if (purchaseData && Number(purchaseData[0]) !== 0) {
            // Get product information for additional details
            const productData = await read({
              method: 'products',
              args: [productId]
            });

            // Create purchase object with product information
            const purchase = new Purchase(purchaseData, productData);
            userPurchases.push(purchase);
          }
        } catch (error) {
          console.error(`Error fetching purchase for product ${productId}:`, error);
          // Continue with next product even if one fails
        }
      }

      // Sort purchases by product ID (newest first)
      userPurchases.sort((a, b) => b.productId - a.productId);
      setPurchases(userPurchases);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      setPurchases([]);
    }
  };

  useEffect(() => {
    if (!wallet) {
      setPurchases([]);
    } else {
      fetchPurchases();
    }
  }, [wallet]);

  return (
    <PurchasesContext.Provider value={{ current: purchases, fetchPurchases }}>{children}</PurchasesContext.Provider>
  );
};
