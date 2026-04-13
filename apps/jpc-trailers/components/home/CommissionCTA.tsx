'use client'

import Link from 'next/link'

export default function CommissionCTA() {
  return (
    <section className="w-full px-6 lg:px-12 py-40 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto text-center">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[#E8500A] block mb-12 uppercase">
          // FINAL STEP
        </span>
        <h2 className="font-syne font-extrabold text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] text-[#F0F0F0] uppercase tracking-tighter mb-16">
          READY TO SECURE<br />
          <span className="text-[#6A6A6A]">YOUR BUILD SLOT?</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Link 
            href="/commission" 
            className="px-16 py-8 bg-[#E8500A] text-white font-mono text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all w-full md:w-auto"
          >
            BEGIN COMMISSION →
          </Link>
          <Link 
            href="/process" 
            className="px-16 py-8 border border-[#222222] text-[#F0F0F0] font-mono text-xs tracking-[0.4em] hover:border-[#E8500A] transition-all w-full md:w-auto"
          >
            LEARN THE PROCESS
          </Link>
        </div>
      </div>
    </section>
  )
}
