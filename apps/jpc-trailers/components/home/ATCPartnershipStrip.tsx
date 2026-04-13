'use client'

import SectionLabel from '@/components/ui/SectionLabel'

export default function ATCPartnershipStrip() {
  return (
    <section className="w-full px-6 lg:px-12 py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <SectionLabel index="004" label="ENGINEERING PARTNERSHIP" className="mb-8" />
          <h2 className="font-syne font-extrabold text-5xl lg:text-7xl text-[#F0F0F0] uppercase tracking-tighter mb-12">
            PARTNERED<br />
            <span className="text-[#6A6A6A]">WITH ATC.</span>
          </h2>
          <p className="font-inter text-lg text-[#888888] leading-relaxed max-w-xl mb-12">
            Through our strategic partnership with ATC (Aluminium Trailer Company), 
            we bring global-leading aluminium engineering to the UK market. This collaboration 
            allows JPC to combine boutique British coachbuilding with world-class, 
            race-proven chassis technology.
          </p>
          <div className="flex gap-12 items-center">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#E8500A] tracking-[0.4em] mb-2 uppercase">CHASSIS RELIABILITY</span>
              <span className="font-syne font-bold text-3xl text-white">100%</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-[#E8500A] tracking-[0.4em] mb-2 uppercase">RACE PROVEN</span>
              <span className="font-syne font-bold text-3xl text-white">20+ YRS</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-video lg:aspect-square bg-[#080808] border border-[#111111] flex items-center justify-center group overflow-hidden">
          {/* Logo Placeholder / Decorative Illustration */}
          <div className="flex flex-col items-center">
            <div className="font-syne font-black text-[120px] text-[#0D0D0D] tracking-tighter group-hover:text-[#E8500A] transition-colors duration-1000">
              ATC
            </div>
            <div className="font-mono text-[10px] tracking-[0.8em] text-[#333] -mt-8 ml-4">
              // PARTNER
            </div>
          </div>
          
          {/* Decorative Grid */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
