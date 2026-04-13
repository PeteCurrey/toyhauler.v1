'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

      tl.fromTo(
        '.hero-line span',
        { y: '100%', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.5 }
      )
      
      tl.from(
        '.hero-meta',
        { y: 20, opacity: 0, duration: 1 },
        '-=1'
      )
    })
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 lg:px-12 pt-32 pb-20 overflow-hidden bg-[#080808]"
    >
      {/* Background visual detail */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[60%] h-full border-l border-[#1A1A1A] bg-gradient-to-r from-transparent to-[#0A0A0A]" />
        <div className="absolute bottom-0 left-0 w-full h-[30%] border-t border-[#1A1A1A]" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto w-full">
        <div className="hero-meta mb-12">
          <SectionLabel index="001" label="THE UK'S PREMIER COACHBUILDER" className="mb-8" />
        </div>

        <h1 
          ref={titleRef}
          className="font-syne font-extrabold text-[clamp(3rem,9vw,9rem)] leading-[0.9] tracking-tighter uppercase text-[#F0F0F0] mb-16"
        >
          <div className="hero-line overflow-hidden block">
            <span>BUILT TO</span>
          </div>
          <div className="hero-line overflow-hidden block text-[#6A6A6A]">
            <span>EXACT ORDER.</span>
          </div>
        </h1>

        <div className="hero-meta flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-xl">
            <p className="font-inter text-lg lg:text-xl text-[#888888] leading-relaxed mb-12 italic">
              "We don't keep stock. We don't build compromises. Every JPC trailer is 
              commissioned, spec'd, and engineered for a specific purpose."
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                href="/configure" 
                className="px-10 py-5 bg-[#E8500A] text-white font-mono text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all"
              >
                START CONFIGURATION →
              </Link>
              <Link 
                href="/trailers" 
                className="px-10 py-5 border border-[#222222] text-[#F0F0F0] font-mono text-xs tracking-[0.4em] hover:border-[#E8500A] transition-all"
              >
                VIEW THE FLEET
              </Link>
            </div>
          </div>

          <div className="hidden lg:block text-right">
            <div className="font-mono text-[10px] tracking-[0.4em] text-[#333] mb-4 uppercase">
              // CURRENT QUEUE STATUS
            </div>
            <div className="font-syne font-bold text-4xl text-[#1A1A1A]">
              SEPT 2026 SLOTS OPEN
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical line */}
      <div className="absolute left-6 lg:left-12 bottom-0 w-[1px] h-32 bg-[#E8500A]" />
    </section>
  )
}
