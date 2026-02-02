import type { ChainConfig } from '../chains/types';

export interface ConnectResult {
  account: string;
  chainId: string;
}

export interface TransactionResult {
  hash: string;
}

export interface AdapterEventHandlers {
  /** EIP-1193: accountsChanged(accounts: string[]) */
  onAccountsChanged: (accounts: string[]) => void;
  /** EIP-1193: chainChanged(chainId: string) */
  onChainChanged: (chainId: string) => void;
}

export interface WalletAdapter {
  readonly name: string;
  isAvailable(): boolean;
  connect(chain: ChainConfig): Promise<ConnectResult>;
  sendContractTransaction(
    contractAddress: string,
    contractABI: string,
    method: string,
    args?: any[],
  ): Promise<TransactionResult>;
  callContractView(
    contractAddress: string,
    contractABI: string,
    method: string,
    args?: any[],
  ): Promise<any>;
  subscribe(handlers: AdapterEventHandlers): void;
  unsubscribe(): void;
}
