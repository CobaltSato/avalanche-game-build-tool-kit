import type { ChainConfig } from '../chains/types';
import type { WalletAdapter } from '../adapters/types';
import type { TxStatus } from '../types';

export interface WalletServiceState {
  account: string | null;
  chainId: string | null;
  isConnected: boolean;
  txStatus: TxStatus;
  txMessage: string;
}

export type WalletServiceListener = (state: WalletServiceState) => void;

export class WalletService {
  private adapter: WalletAdapter;
  private chain: ChainConfig;
  private contractAddress?: string;
  private contractABI?: string;

  private state: WalletServiceState = {
    account: null,
    chainId: null,
    isConnected: false,
    txStatus: 'idle',
    txMessage: '',
  };

  private listeners = new Set<WalletServiceListener>();

  constructor(
    adapter: WalletAdapter,
    chain: ChainConfig,
    contractAddress?: string,
    contractABI?: string,
  ) {
    this.adapter = adapter;
    this.chain = chain;
    this.contractAddress = contractAddress;
    this.contractABI = contractABI;
  }

  getState(): WalletServiceState {
    return this.state;
  }

  subscribe(listener: WalletServiceListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(): void {
    const snapshot = { ...this.state };
    this.listeners.forEach((fn) => fn(snapshot));
  }

  private update(partial: Partial<WalletServiceState>): void {
    this.state = { ...this.state, ...partial };
    this.emit();
  }

  init(): void {
    this.adapter.subscribe({
      onAccountsChanged: (accounts) => {
        const account = accounts?.[0] ?? null;
        this.update({
          account,
          isConnected: !!account,
          txStatus: 'idle',
          txMessage: '',
        });
      },
      onChainChanged: (chainId) => {
        this.update({
          chainId,
          txStatus: 'idle',
          txMessage: '',
        });
      },
    });
  }

  destroy(): void {
    this.adapter.unsubscribe();
  }

  async connect(): Promise<void> {
    if (!this.adapter.isAvailable()) {
      alert(`${this.adapter.name} is not installed. Please install it to use this dApp.`);
      return;
    }

    try {
      const result = await this.adapter.connect(this.chain);
      this.update({
        account: result.account,
        chainId: result.chainId,
        isConnected: true,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. See console for details.');
    }
  }

  async callView(method: string, args: any[] = []): Promise<any> {
    if (!this.contractAddress || !this.contractABI) {
      throw new Error('Contract not initialised.');
    }

    return this.adapter.callContractView(
      this.contractAddress,
      this.contractABI,
      method,
      args,
    );
  }

  async sendTransaction(method: string, args: any[] = []): Promise<void> {
    if (!this.contractAddress || !this.contractABI) {
      this.update({ txStatus: 'error', txMessage: 'Contract not initialised.' });
      setTimeout(() => this.update({ txStatus: 'idle', txMessage: '' }), 5000);
      return;
    }

    if (this.state.chainId !== this.chain.chainId) {
      this.update({
        txStatus: 'error',
        txMessage: 'Wrong network. Please switch to the correct chain.',
      });
      setTimeout(() => this.update({ txStatus: 'idle', txMessage: '' }), 5000);
      return;
    }

    this.update({ txStatus: 'pending', txMessage: 'Waiting for confirmation...' });

    try {
      this.update({ txMessage: 'Transaction sent. Waiting for it to be mined...' });
      await this.adapter.sendContractTransaction(
        this.contractAddress,
        this.contractABI,
        method,
        args,
      );
      this.update({ txStatus: 'success', txMessage: 'Transaction successful!' });
    } catch (error: any) {
      console.error('Transaction failed:', error);
      this.update({
        txStatus: 'error',
        txMessage: `Transaction failed: ${error.reason || error.message}`,
      });
    } finally {
      setTimeout(() => this.update({ txStatus: 'idle', txMessage: '' }), 5000);
    }
  }
}
