interface EIP1193Provider {
  on(eventName: string, listener: (...args: any[]) => void): this;
  removeListener(eventName: string, listener: (...args: any[]) => void): this;
  request(args: { method: string; params?: readonly unknown[] | object }): Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EIP1193Provider;
  }
}

export {};
