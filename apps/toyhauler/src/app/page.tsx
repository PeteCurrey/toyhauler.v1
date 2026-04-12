import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import WhatIsTeaser from '@/components/home/WhatIsTeaser';
import WhoIsItFor from '@/components/home/WhoIsItFor';
import ConfiguratorCTA from '@/components/home/ConfiguratorCTA';
import GalleryStrip from '@/components/home/GalleryStrip';
import JPCConnection from '@/components/home/JPCConnection';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'ToyHauler.co.uk | Premium UK Toy Haulers — Built to Order',
  description:
    "The UK's home of the premium toy hauler. Built-to-order aluminium enclosed trailers for track days, motorsport, overlanding, and classic car owners. Powered by JPC Trailers, Chesterfield.",
  keywords: [
    'toy hauler UK',
    'toy hauler trailer UK',
    'enclosed trailer for cars UK',
    'motorsport trailer built to order',
    'premium car trailer UK',
    'track day trailer UK',
    'aluminium enclosed trailer UK',
  ],
  openGraph: {
    title: 'ToyHauler.co.uk | Premium UK Toy Haulers',
    description: "The UK's home of the premium toy hauler.",
    url: 'https://toyhauler.co.uk',
    siteName: 'ToyHauler.co.uk',
    type: 'website',
  },
  alternates: { canonical: 'https://toyhauler.co.uk' },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsTeaser />
      <WhoIsItFor />
      <ConfiguratorCTA />
      <GalleryStrip />
      <JPCConnection />
      <FinalCTA />
    </>
  );
}
