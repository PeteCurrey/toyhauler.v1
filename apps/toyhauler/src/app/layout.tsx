import type { Metadata } from 'next';
import { Inter, Syne, DM_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' });

export const metadata: Metadata = {
  title: 'ToyHauler.co.uk | Premium UK Toy Haulers',
  description: "The UK's home of the premium toy hauler. Built to order in the UK. Aluminium construction. Bespoke to your machines, your lifestyle, and your standards.",
};

import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${dmMono.variable}`}>
      <body>
        <div className="grain-overlay"></div>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
