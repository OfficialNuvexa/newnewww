import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpectraAI - The Engine of Viral Narratives',
  description: 'An intelligence that scans the noise and extracts the next myth. AI-powered narrative engine for Crypto Twitter trends.',
  keywords: 'AI, crypto, twitter, narratives, memes, trends, blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}