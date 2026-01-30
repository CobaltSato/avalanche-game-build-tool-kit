'use client';

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { BrowserProvider, Contract, Signer } from 'ethers';
import type { WalletContextValue, WalletProviderProps, TxStatus } from './types';

const DEFAULT_CHAIN_ID = '0xa869'; // Avalanche Fuji Testnet

export const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({
  chainId: targetChainId = DEFAULT_CHAIN_ID,
  contractAddress,
  contractABI,
  children,
}: WalletProviderProps) {
  // --- state ---
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [txStatus, setTxStatus] = useState<TxStatus>('idle');
  const [txMessage, setTxMessage] = useState('');

  // --- wallet connection ---
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to use this dApp.');
      return;
    }
    try {
      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send('eth_requestAccounts', []);
      const userSigner = await browserProvider.getSigner();
      const userAccount = await userSigner.getAddress();
      const network = await browserProvider.getNetwork();

      setProvider(browserProvider);
      setSigner(userSigner);
      setAccount(userAccount);
      setChainId(`0x${network.chainId.toString(16)}`);

      if (contractAddress && contractABI) {
        const instance = new Contract(
          contractAddress,
          JSON.parse(contractABI),
          userSigner,
        );
        setContract(instance);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. See console for details.');
    }
  }, [contractAddress, contractABI]);

  // --- MetaMask event listeners ---
  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum?.on) return;

    const handleAccountsChanged = () => window.location.reload();
    const handleChainChanged = () => window.location.reload();

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // --- send transaction ---
  const sendTransaction = useCallback(
    async (method: string, args: any[] = []) => {
      if (!contract) {
        setTxStatus('error');
        setTxMessage('Contract not initialised.');
        setTimeout(() => setTxStatus('idle'), 5000);
        return;
      }
      if (chainId !== targetChainId) {
        setTxStatus('error');
        setTxMessage('Wrong network. Please switch to the correct chain.');
        setTimeout(() => setTxStatus('idle'), 5000);
        return;
      }

      setTxStatus('pending');
      setTxMessage('Waiting for confirmation...');
      try {
        const tx = await contract[method](...args);
        setTxMessage('Transaction sent. Waiting for it to be mined...');
        await tx.wait();
        setTxStatus('success');
        setTxMessage('Transaction successful!');
      } catch (error: any) {
        console.error('Transaction failed:', error);
        setTxStatus('error');
        setTxMessage(`Transaction failed: ${error.reason || error.message}`);
      } finally {
        setTimeout(() => setTxStatus('idle'), 5000);
      }
    },
    [contract, chainId, targetChainId],
  );

  // --- context value ---
  const value: WalletContextValue = {
    account,
    chainId,
    isConnected: account !== null,
    provider,
    signer,
    contract,
    txStatus,
    txMessage,
    connectWallet,
    sendTransaction,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
