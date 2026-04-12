import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'ATC Partnership',
  description: 'JPC Trailers officially partners with The American Trailer Company (ATC) to bring premium aluminium trailers to the UK.',
}

export default function ATCPartnershipPage() {
  return (
    <>
      <section
        className="w-full pt-40 pb-20 px-6 lg:px-12 flex flex-col justify-end min-h-[50vh]"
        style={{ background: '#080808' }}
      >
        <div className="max-w-[1600px] mx-auto w-full">
          <SectionLabel index="004" label="AMERICAN CRAFT. UK DELIVERY." className="mb-6" />
          <h1
            className="uppercase leading-none tracking-tight mb-4"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              color: '#F0F0F0',
            }}
          >
            ATC PARTNERSHIP
          </h1>
        </div>
      </section>

      <section
        className="w-full px-6 lg:px-12 py-24 lg:py-32"
        style={{ background: '#0D0D0D', borderTop: '1px solid #1E1E1E' }}
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2
              className="text-2xl lg:text-3xl uppercase mb-8"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#E8500A' }}
            >
              The Standard
            </h2>
            <div className="space-y-6 text-sm lg:text-base leading-relaxed" style={{ color: '#888888' }}>
              <p>
                The American Trailer Company (ATC) has built a reputation across North America for delivering precision-engineered, all-aluminium trailers that frankly outlast and outperform their steel counterparts.
              </p>
              <p>
                We chose to partner with ATC because their uncompromising approach to manufacturing aligns perfectly with our vision. They don't use wood components that rot. They don't use steel that rusts. Every trailer is built around a fully welded aluminium frame.
              </p>
            </div>
          </div>

          <div>
             <h2
              className="text-2xl lg:text-3xl uppercase mb-8"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#E8500A' }}
            >
              UK Delivery, Zero Complexity
            </h2>
             <div className="space-y-6 text-sm lg:text-base leading-relaxed" style={{ color: '#888888' }}>
              <p>
                Historically, importing North American trailers to the UK meant navigating a minefield of compliance, logistics, and unpredictable costs. This partnership changes that.
              </p>
              <p>
                We provide access to North American build quality without the import complexity. JPC handles everything — specification, logistics, compliance, and delivery. You get a world-class trailer handed over in Chesterfield, fully certified for UK roads.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spec block grid */}
      <section className="w-full px-6 lg:px-12 py-24" style={{ background: '#080808' }}>
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            {
              title: "ALUMINIUM ONLY",
              desc: "A fully integrated aluminium frame structure that won't rust."
            },
            {
              title: "PRECISION BUILT",
              desc: "Manufactured in state-of-the-art facilities with exacting tolerances."
            },
            {
              title: "UK COMPLIANT",
              desc: "Fully homologated and certified for UK and European towing."
            }
          ].map((item, i) => (
            <div key={i} className="p-10" style={{ background: '#111111' }}>
              <h3 className="text-xl uppercase mb-4" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#F0F0F0' }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: '#888888' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
