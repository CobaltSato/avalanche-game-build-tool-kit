'use client';

import { useContext } from 'react';
import { WalletContext } from './WalletProvider';
import type { WalletContextValue } from './types';

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWallet must be used within a <WalletProvider>');
  }
  return ctx;
}
