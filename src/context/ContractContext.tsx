import { Contract, JsonRpcProvider } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockUsdcAbi, peerMartAbi } from './abis';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

export type WhichContract = 'peermart' | 'usdc';

const PEERMART_ADDRESS = '0xAdB02aaC89051778f505f7FC6A905E21283a62d3';
const MOCK_USDC_ADDRESS = '0x7fdde93c75669792002c8dbd49d0f6e869d15c96';

interface ContractContextType {
  read: (props: ContractCallProps) => Promise<any>;
  write: (props: ContractCallProps) => Promise<any>;
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
  const toast = useToast();
  const getPeermart = () => new Contract(PEERMART_ADDRESS, peerMartAbi, wallet?.signer ?? provider);
  const getUsdc = () => new Contract(MOCK_USDC_ADDRESS, mockUsdcAbi, wallet?.signer ?? provider);

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
      toast.show({ detail: `Error: ${e}`, severity: 'error' });
      console.error(e);
      return null;
    }
  };

  const write = async ({ method, args, isUsdc }: ContractCallProps) => {
    const contract = isUsdc ? usdc : peermart;
    try {
      await (await contract[method](...(args ?? []))).wait();
      return true;
    } catch (e) {
      toast.show({ detail: `Error: ${e}`, severity: 'error' });
      console.error(e);
      return null;
    }
  };

  return <ContractContext.Provider value={{ read, write }}>{children}</ContractContext.Provider>;
};
