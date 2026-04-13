'use client'

import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const CATEGORIES = [
  {
    id: '01',
    name: 'OPEN CAR TRANSPORTERS',
    description: 'Precision engineered for high-performance vehicles. Low loading angles and maximum stability.',
    href: '/trailers/open'
  },
  {
    id: '02',
    name: 'ENCLOSED BOX TRAILERS',
    description: 'Secure, weather-proof transportation for luxury and classic vehicles. Bespoke internal layouts.',
    href: '/trailers/enclosed'
  },
  {
    id: '03',
    name: 'LUXURY TOY HAULERS',
    description: 'The ultimate crossover. Professional vehicle transport with custom-built living quarters.',
    href: '/trailers/toyhauler'
  }
]

export default function ProductCategories() {
  return (
    <section className="w-full px-6 lg:px-12 py-32 bg-[#080808]">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-20">
          <SectionLabel index="002" label="PRECISION CATEGORIES" className="mb-8" />
          <h2 className="font-syne font-extrabold text-5xl lg:text-7xl text-[#F0F0F0] uppercase tracking-tighter">
            CHOOSE YOUR<br />
            <span className="text-[#6A6A6A]">PLATFORM.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-[#1A1A1A] border border-[#1A1A1A]">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-[#080808] p-12 lg:p-16 flex flex-col justify-between min-h-[500px] group relative overflow-hidden"
            >
              {/* Decorative detail */}
              <div className="absolute top-0 right-0 p-8 font-mono text-[10px] text-[#222] group-hover:text-[#E8500A] transition-colors">
                [ {cat.id} ]
              </div>

              <div>
                <h3 className="font-syne font-extrabold text-3xl text-white mb-6 uppercase tracking-tight group-hover:text-[#E8500A] transition-colors leading-none">
                  {cat.name}
                </h3>
                <p className="font-inter text-[#6A6A6A] leading-relaxed max-w-[280px]">
                  {cat.description}
                </p>
              </div>

              <div className="mt-12 flex flex-col gap-6">
                <Link 
                  href={cat.href}
                  className="font-mono text-[10px] tracking-[0.2em] text-[#E8500A] border-b border-[#E8500A] w-fit pb-1 hover:text-white hover:border-white transition-all"
                >
                  VIEW SPECIFICATIONS →
                </Link>
                <Link 
                  href="/configure"
                  className="font-mono text-[10px] tracking-[0.2em] text-[#444] hover:text-[#E8500A] transition-colors"
                >
                  START CONFIGURATION //
                </Link>
              </div>
              
              {/* Background accent glow on hover */}
              <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-[#E8500A] blur-[150px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
