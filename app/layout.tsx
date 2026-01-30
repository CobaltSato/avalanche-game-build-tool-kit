import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WalletProvider } from '@avalanche-wallet/index';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Avalanche Game Toolkit',
  description: 'A Next.js starter with built-in Avalanche wallet integration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider
          contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
          contractABI={process.env.NEXT_PUBLIC_CONTRACT_ABI}
        >
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
