import type { Metadata } from 'next'
import CategorySection from '@/components/trailers/CategorySection'

export const metadata: Metadata = {
  title: 'The Range',
  description: 'Three categories. Infinite configurations. Explore the JPC-CH Series car haulers, JPC-EX Series enclosed trailers, and bespoke builds.',
}

export default function TrailersPage() {
  return (
    <>
      <section
        className="w-full pt-40 pb-20 px-6 lg:px-12 flex flex-col justify-end min-h-[50vh]"
        style={{ background: '#080808' }}
      >
        <div className="max-w-[1600px] mx-auto w-full">
          <h1
            className="uppercase leading-none tracking-tight mb-4"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: '#F0F0F0',
            }}
          >
            THE RANGE
          </h1>
          <p
            className="text-sm lg:text-base uppercase tracking-widest"
            style={{ fontFamily: 'DM Mono, monospace', color: '#6A6A6A' }}
          >
            Three categories. Infinite configurations.
          </p>
        </div>
      </section>

      <CategorySection
        id="car-haulers"
        label="// 01 — OPEN CAR HAULERS"
        title="JPC-CH Series"
        description="Open aluminium car transporters designed for the enthusiast who won't compromise on how their car travels. Single axle and twin axle configurations. Fully bespoke deck lengths, winch positions, and tie-down layouts."
        specs={[
          { key: 'CONSTRUCTION', value: 'Aluminium alloy' },
          { key: 'AXLES', value: 'Single or twin' },
          { key: 'DECK LENGTH', value: '14ft — 24ft (custom)' },
          { key: 'FINISH', value: 'Mill, brushed, or powder coat' },
          { key: 'CAPACITY', value: 'Up to 3,500kg GTW' },
          { key: 'ORIGIN', value: 'ATC partnership build' },
        ]}
      />

      <CategorySection
        id="enclosed-trailers"
        label="// 02 — ENCLOSED TRAILERS"
        title="JPC-EX Series"
        description="American-spec enclosed box trailers for motorsport teams, overlanders, and businesses that need serious mobile infrastructure. V-nose or flat-front. Full interior fit-out available."
        specs={[
          { key: 'CONSTRUCTION', value: 'Full aluminium extrusion frame' },
          { key: 'AXLES', value: 'Twin (standard)' },
          { key: 'HEIGHT', value: '6ft internal (standard)' },
          { key: 'WIDTH', value: '7ft or 8.5ft' },
          { key: 'OPTIONS', value: 'Side door, ramp door, interior lining, electrics, workbench' },
          { key: 'ORIGIN', value: 'ATC partnership build' },
        ]}
      />

      <CategorySection
        id="custom-builds"
        label="// 03 — BESPOKE COMMISSIONS"
        title="JPC-BESPOKE"
        description="For the commission that doesn't fit a catalogue. Race car transporters, expedition rigs, commercial fit-outs. Tell us what you need. We'll tell you if we can build it — and we usually can."
        customCTA={true}
      />
    </>
  )
}
