import { Contract, JsonRpcProvider } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockUsdcAbi, peerMartAbi } from './abis';
import { useAuth } from './AuthContext';

export type WhichContract = 'peermart' | 'usdc';

const PEERMART_ADDRESS = '0xAdB02aaC89051778f505f7FC6A905E21283a62d3';
const MOCK_USDC_ADDRESS = '0x7fdde93c75669792002c8dbd49d0f6e869d15c96';

interface ContractContextType {
  read: () => Promise<any>;
  write: () => Promise<any>;
}

const ContractContext = createContext<ContractContextType>({
  read: async () => {},
  write: async () => {}
});

export const useContractContext = () => useContext(ContractContext);

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

  useEffect(() => {
    (async () => {
      console.log(await peermart.FEE_PERCENTAGE());
      console.log(await usdc.name());
    })()
  }, []);

  const read = async () => {};
  const write = async () => {};

  return <ContractContext.Provider value={{ read, write }}>{children}</ContractContext.Provider>;
};
