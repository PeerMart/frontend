import { Contract, JsonRpcProvider } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockUsdcAbi, peerMartAbi } from './abis';
import { useAuth } from './AuthContext';

export type WhichContract = 'peermart' | 'usdc';

const PEERMART_ADDRESS = '0xAdB02aaC89051778f505f7FC6A905E21283a62d3';
const MOCK_USDC_ADDRESS = '0x7fdde93c75669792002c8dbd49d0f6e869d15c96';

interface ContractContextType {
  read: (props: ContractCallProps) => Promise<any>;
  write: () => Promise<any>;
}

export interface ContractCallProps {
  method: string;
  args?: any[];
  isUsdc?: boolean;
}

const ContractContext = createContext<ContractContextType>({
  read: async () => {},
  write: async () => {}
});

export const useContract = () => useContext(ContractContext);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const provider = new JsonRpcProvider('https://testnet.hashio.io/api');
  const { wallet } = useAuth();
  const getPeermart = () => new Contract(PEERMART_ADDRESS, peerMartAbi, wallet ?? provider);
  const getUsdc = () => new Contract(MOCK_USDC_ADDRESS, mockUsdcAbi, wallet ?? provider);

  const [peermart, setPeermart] = useState(getPeermart());
  const [usdc, setUsdc] = useState(getUsdc());

  useEffect(() => {
    setPeermart(getPeermart());
    setUsdc(getUsdc());
  }, [wallet]);

  const read = async ({ method, args, isUsdc }: ContractCallProps) => {
    const contract = isUsdc ? usdc : peermart;
    try {
      return await contract[method](...(args ?? []));
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const write = async () => {};

  return <ContractContext.Provider value={{ read, write }}>{children}</ContractContext.Provider>;
};
