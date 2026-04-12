import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from '@/lib/lenis'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jpctrailers.co.uk'),
  title: {
    default: 'JPC Trailers — Built-to-Order Premium Aluminium Trailers | UK',
    template: '%s | JPC Trailers',
  },
  description:
    'JPC Trailers builds premium aluminium trailers to order. Car haulers, enclosed trailers, and bespoke builds. Commissioned and delivered in the UK. No stock. Every unit built for you.',
  keywords: [
    'aluminium trailers UK',
    'built to order trailers',
    'car hauler UK',
    'enclosed trailer UK',
    'bespoke trailer',
    'ATC trailers UK',
    'premium trailers Chesterfield',
    'commissioned trailers',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://jpctrailers.co.uk',
    siteName: 'JPC Trailers',
    title: 'JPC Trailers — Built-to-Order Premium Aluminium Trailers',
    description:
      'We don\'t keep stock. Every JPC trailer is commissioned, spec\'d, and built to your exact requirements.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPC Trailers — Built-to-Order Premium Aluminium Trailers',
    description:
      'Premium aluminium trailers commissioned and built in the UK.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
