import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About the Brand',
  description: 'JPC Trailers was founded in Chesterfield, Derbyshire. We don’t do stock. We do standards.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080808] pt-40 pb-40">
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto w-full">
        {/* Header Section */}
        <div className="mb-24 lg:mb-40">
          <SectionLabel index="05" label="WHO WE ARE" className="mb-6" />
          <h1
            className="uppercase leading-none tracking-tight mb-12 max-w-4xl"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              color: '#F0F0F0',
            }}
          >
            NOT A TRAILER YARD.<br />
            <span style={{ color: '#6A6A6A' }}>A COMMISSIONING HOUSE.</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-8">
              <p
                className="text-xl lg:text-2xl leading-relaxed"
                style={{ color: '#B8B8B8', fontFamily: 'Inter, sans-serif' }}
              >
                JPC Trailers was founded in Chesterfield, Derbyshire, with a straightforward conviction: the UK market deserved a premium, built-to-order aluminium trailer brand.
              </p>
              <p
                className="text-base lg:text-lg leading-relaxed"
                style={{ color: '#888888', fontFamily: 'Inter, sans-serif' }}
              >
                We don’t keep stock. We don’t do “available now.” Every JPC trailer is commissioned, spec’d, and built to the exact requirements of the person who ordered it. That’s not a constraint — it’s the point.
              </p>
            </div>
            
            <div className="relative aspect-[4/5] lg:aspect-square bg-[#111111] overflow-hidden">
               {/* Aesthetic industrial image placeholder */}
               <div 
                 className="absolute inset-0 opacity-40 bg-cover bg-center"
                 style={{ backgroundImage: 'url("/images/brand-story.jpg")' }}
               />
               <div className="absolute inset-0 border border-[#1E1E1E]" />
               <div className="absolute top-8 left-8">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#444444] uppercase">
                    // ORIGIN: CHESTERFIELD
                  </span>
               </div>
            </div>
          </div>
        </div>

        {/* Core Values / Middle Section */}
        <div className="py-24 border-t border-b border-[#1E1E1E] mb-24 lg:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                label: 'THE NAME',
                title: 'PERSONALLY COMMISSIONED',
                copy: 'The name comes from the initials of someone who matters. That’s all we’ll say. Every build is personal.',
              },
              {
                label: 'THE STANDARD',
                title: 'ALUMINIUM ARCHITECTURE',
                copy: 'No heavy steel frames. We work exclusively with aerospace-grade aluminium extrusions for lighter, stronger, and longer-lasting builds.',
              },
              {
                label: 'THE PARTNERSHIP',
                title: 'NORTH AMERICAN QUALITY',
                copy: 'We work with ATC—one of North America’s most respected manufacturers—to deliver builds worth waiting for.',
              },
            ].map((value, i) => (
              <div key={i} className="space-y-4">
                <span 
                  className="text-[10px] font-mono text-[#E8500A] tracking-widest uppercase"
                >
                  // {value.label}
                </span>
                <h3 
                  className="text-xl font-bold uppercase"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#F0F0F0' }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#6A6A6A', fontFamily: 'Inter, sans-serif' }}
                >
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Statement */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className="uppercase leading-none tracking-tight mb-8"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              color: '#F0F0F0',
            }}
          >
            WE DON'T DO STOCK.<br />
            <span style={{ color: '#E8500A' }}>WE DO STANDARDS.</span>
          </h2>
          <Button href="/commission" variant="solid" size="lg">
            Begin Your Commission →
          </Button>
        </div>
      </div>
    </main>
  )
}
