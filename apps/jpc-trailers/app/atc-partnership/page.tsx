import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'ATC Partnership',
  description: 'JPC Trailers works in official partnership with ATC (American Trailer Company) to deliver North American build quality to the UK market.',
}

export default function ATCPartnershipPage() {
  return (
    <main className="min-h-screen bg-[#080808] pt-40 pb-40">
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto w-full">
        {/* Hero */}
        <div className="mb-24 lg:mb-40">
          <SectionLabel index="06" label="OFFICIAL PARTNERSHIP" className="mb-6" />
          <h1
            className="uppercase leading-tight tracking-tight mb-8 max-w-5xl"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              color: '#F0F0F0',
            }}
          >
            AMERICAN CRAFT.<br />
            <span style={{ color: '#6A6A6A' }}>UK DELIVERY.</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-6">
              <p
                className="text-xl lg:text-2xl leading-relaxed"
                style={{ color: '#B8B8B8', fontFamily: 'Inter, sans-serif' }}
              >
                JPC Trailers works in partnership with ATC (American Trailer Company), one of North America&apos;s most respected aluminium trailer manufacturers.
              </p>
              <p
                className="text-base lg:text-lg leading-relaxed"
                style={{ color: '#888888', fontFamily: 'Inter, sans-serif' }}
              >
                Every JPC build uses ATC-standard materials and construction methods, delivered to the UK market for the first time at this level. This partnership combines North American industrial scale with boutique UK specification engineering.
              </p>
            </div>
            
            <div className="border border-[#1E1E1E] bg-[#111111] p-8 lg:p-12">
               <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-[10px] font-mono text-[#E8500A] uppercase tracking-widest mb-2 block">// THE ADVANTAGE</span>
                    <h3 className="text-2xl font-bold text-[#F0F0F0] font-syne uppercase">NO IMPORT COMPLEXITY</h3>
                    <p className="text-sm text-[#6A6A6A] mt-2">JPC handles everything—specification, logistics, compliance, and UK delivery. You get North American build quality without the paperwork.</p>
                  </div>
                  <div className="w-full h-[1px] bg-[#1E1E1E]" />
                  <div>
                    <span className="text-[10px] font-mono text-[#E8500A] uppercase tracking-widest mb-2 block">// THE STANDARD</span>
                    <h3 className="text-2xl font-bold text-[#F0F0F0] font-syne uppercase">EXTRUDED FRAME TECH</h3>
                    <p className="text-sm text-[#6A6A6A] mt-2">ATC&apos;s world-renowned aluminium extrusion framing is the backbone of every JPC trailer. Precision-welded, zero-rust, and lighter than any European steel equivalent.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Technical Grid Section */}
        <div className="py-24 border-t border-[#1E1E1E] mb-24 lg:mb-40">
           <div className="mb-16">
              <h2 className="text-4xl font-extrabold text-[#F0F0F0] font-syne uppercase">WHY WE CHOSE ATC</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'PRECISION', copy: 'Automated assembly lines ensure every extrusion is perfectly aligned before manual finish welding.' },
                { title: 'STRENGTH', copy: 'Over 20 years of North American heavy-duty R&D built into every chassis design.' },
                { title: 'LIGHTWEIGHT', copy: 'Aluminium frames allow for higher payloads compared to traditional steel trailers.' },
                { title: 'WARRANTY', copy: 'Direct support from the UK for all ATC-standard components and structural builds.' },
              ].map((item, i) => (
                <div key={i} className="p-6 border border-[#1E1E1E] bg-[#0D0D0D]">
                   <h4 className="font-mono text-[10px] text-[#444444] uppercase mb-4 tracking-[0.2em]">// 0{i+1}</h4>
                   <h3 className="text-lg font-bold text-[#F0F0F0] font-syne uppercase mb-3">{item.title}</h3>
                   <p className="text-xs text-[#6A6A6A] leading-relaxed font-inter">{item.copy}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#111111] border border-[#1E1E1E] p-12 lg:p-24 text-center">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#F0F0F0] font-syne uppercase mb-8">Ready to Spec Your ATC-Powered Build?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button href="/trailers" variant="solid" size="lg">Explore the Range</Button>
               <Button href="/commission" variant="outline" size="lg">Request a Build Slot</Button>
            </div>
        </div>
      </div>
    </main>
  )
}
