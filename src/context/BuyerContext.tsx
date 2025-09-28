import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../models';
import { useAuth } from './AuthContext';
import { PEERMART_ADDRESS, useContract } from './ContractContext';
import { useToast } from './ToastContext';

interface BuyerContextType {
  buy: (id: number, price: number) => Promise<void>;
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

const BuyerContext = createContext<BuyerContextType>({
  buy: async () => {},
  products: [],
  loading: false,
  fetchProducts: async () => {}
});

export const useBuyer = () => useContext(BuyerContext);

export const BuyerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { read } = useContract();
  const { write } = useContract();
  const { wallet } = useAuth();
  const toast = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Get the total number of products
      const productCount = await read({ method: 'productCount' });

      if (!productCount || Number(productCount) === 0) {
        setProducts([]);
        return;
      }

      // Fetch all products from the contract
      const fetchedProducts: Product[] = [];

      for (let i = Number(productCount); i >= 1; i--) {
        try {
          const productData = await read({ method: 'getProduct', args: [i] });

          if (productData && productData[0] && Number(productData[0]) > 0) {
            const product = new Product(productData);
            // Only include products that have inventory
            if (product.inventory > 0) {
              fetchedProducts.push(product);
            }
          }
        } catch (error) {
          console.error(`Error fetching product ${i}:`, error);
        }
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (productId: number, price: number) => {
    if (!wallet) {
      toast.show({ detail: 'Please connect your wallet first', severity: 'warn' });
      return;
    }

    try {
      // First approve USDC spending for the PeerMart contract
      const approveResult = await write({
        method: 'approve',
        args: [PEERMART_ADDRESS, price],
        isUsdc: true
      });

      if (!approveResult) {
        toast.show({ detail: 'Failed to approve USDC spending', severity: 'error' });
        return;
      }

      // Then purchase the product
      const purchaseResult = await write({
        method: 'purchaseProduct',
        args: [productId]
      });

      if (purchaseResult) {
        toast.show({ detail: 'Product purchased successfully!', severity: 'success' });
        await fetchProducts(); // Refresh products list
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.show({ detail: 'Purchase failed', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <BuyerContext.Provider value={{ buy, products, loading, fetchProducts }}>{children}</BuyerContext.Provider>;
};
