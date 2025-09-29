import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, Seller } from '../models';
import { useAuth } from './AuthContext';
import { useContract } from './ContractContext';

interface SellerContextType {
  current: Seller | null;
  products: Product[];
  isLoadingProducts: boolean;
  register: (props: RegisterSellerProps) => Promise<boolean>;
  sell: (props: ListProductProps) => Promise<boolean>;
  fetchProducts: () => Promise<void>;
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
  products: [],
  isLoadingProducts: false,
  register: async () => false,
  sell: async () => false,
  fetchProducts: async () => {}
});

export const useSeller = () => useContext(SellerContext);

export const SellerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { wallet } = useAuth();
  const { read, write } = useContract();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const fetchAndSetSeller = async () => {
    if (!wallet) return;

    const raw1 = await read({ method: 'sellers', args: [wallet.address] });
    const raw2 = await read({ method: 'sellerContacts', args: [wallet.address] });
    if (raw1 && raw2) {
      const converted = new Seller([...raw1, ...raw2]);
      if (converted.name) setSeller(converted);
    }
  };

  const fetchProducts = async () => {
    if (!wallet || !seller) {
      setProducts([]);
      return;
    }

    setIsLoadingProducts(true);
    try {
      // Get total number of products from contract
      const productCount = await read({ method: 'productCount' });
      if (!productCount || productCount === 0) {
        setProducts([]);
        setIsLoadingProducts(false);
        return;
      }

      const sellerProducts: Product[] = [];

      // Loop through all products to find ones created by this seller
      for (let productId = 1; productId <= Number(productCount); productId++) {
        try {
          // Get product details
          const productData = await read({ method: 'products', args: [productId] });

          // Check if product exists and belongs to current seller
          if (productData && productData[0] !== 0 && productData[4].toLowerCase() === wallet.address.toLowerCase()) {
            const product = new Product(productData);
            sellerProducts.push(product);
          }
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          // Continue with next product even if one fails
        }
      }

      // Sort products by ID (newest first)
      sellerProducts.sort((a, b) => b.id - a.id);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Error fetching seller products:', error);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
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
    const imageUrl = `ipfs://${ipfsHash}`;

    const result = await write({
      method: 'createProduct',
      args: [name, imageUrl, price * 1e6, description, inventory]
    });

    // Refresh products list after successful creation
    if (result) {
      setTimeout(() => {
        fetchProducts();
      }, 2000); // Wait 2 seconds for transaction to be mined
    }

    return !!result;
  };

  useEffect(() => {
    if (!wallet) {
      setSeller(null);
      setProducts([]);
    } else {
      fetchAndSetSeller();
    }
  }, [wallet]);

  useEffect(() => {
    if (seller) fetchProducts();
  }, [seller]);

  return (
    <SellerContext.Provider
      value={{
        current: seller,
        products,
        isLoadingProducts,
        register,
        sell,
        fetchProducts
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};
