import { BrowserProvider, Contract, Signer } from 'ethers';

export type TxStatus = 'idle' | 'pending' | 'success' | 'error';

export interface WalletState {
  /** Connected account address */
  account: string | null;
  /** Current chain ID in hex (e.g. '0xa869') */
  chainId: string | null;
  /** Whether a wallet is connected */
  isConnected: boolean;
  /** ethers BrowserProvider instance */
  provider: BrowserProvider | null;
  /** ethers Signer instance */
  signer: Signer | null;
  /** ethers Contract instance (if contractAddress & contractABI provided) */
  contract: Contract | null;
  /** Current transaction status */
  txStatus: TxStatus;
  /** Human-readable transaction message */
  txMessage: string;
}

export interface WalletActions {
  /** Request wallet connection via MetaMask */
  connectWallet: () => Promise<void>;
  /** Send a named contract method as a transaction */
  sendTransaction: (method: string, args?: any[]) => Promise<void>;
}

export type WalletContextValue = WalletState & WalletActions;

export interface WalletProviderProps {
  /** Target chain ID in hex. Default: '0xa869' (Avalanche Fuji Testnet) */
  chainId?: string;
  /** Deployed contract address (typically from env var) */
  contractAddress?: string;
  /** Contract ABI as a JSON string (typically from env var) */
  contractABI?: string;
  children: React.ReactNode;
}
