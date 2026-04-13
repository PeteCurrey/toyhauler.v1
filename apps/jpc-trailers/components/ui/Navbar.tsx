'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { name: 'TRAILERS', href: '/trailers' },
  { name: 'THE PROCESS', href: '/process' },
  { name: 'CONFIGURATOR', href: '/configure' },
  { name: 'ATC PARTNERSHIP', href: '/atc-partnership' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? 'bg-[#080808]/90 backdrop-blur-md py-4 border-[#1A1A1A]' : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="group flex flex-col pt-1">
          <span className="font-syne font-extrabold text-2xl tracking-tighter text-[#F0F0F0] leading-none">
            JPC<span className="text-[#E8500A]">TRAILERS</span>
          </span>
          <span className="font-mono text-[8px] tracking-[0.4em] text-[#6A6A6A] group-hover:text-[#E8500A] transition-colors mt-0.5">
            // PRECISION ALUMINIUM
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-mono text-[10px] tracking-[0.2em] transition-colors hover:text-[#E8500A] ${
                pathname === link.href ? 'text-[#E8500A]' : 'text-[#6A6A6A]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/commission"
            className="group relative overflow-hidden px-8 py-3 bg-[#E8500A] text-white font-mono text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
          >
            COMMISSION →
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#080808] flex flex-col items-center justify-center gap-8 z-40"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-syne font-bold text-4xl tracking-tight text-[#F0F0F0] hover:text-[#E8500A] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/commission"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 px-12 py-4 bg-[#E8500A] text-white font-mono tracking-[0.2em]"
            >
              COMMISSION →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
