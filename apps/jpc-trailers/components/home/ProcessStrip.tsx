'use client'

import SectionLabel from '@/components/ui/SectionLabel'

const STEPS = [
  {
    title: 'COMMISSION',
    desc: 'Every build begins with a consultation to define your specific payload, dimensions, and operational requirements.'
  },
  {
    title: 'ENGINEERING',
    desc: 'Our engineers spec the chassis, axle layout, and aluminium grade to ensure optimum strength-to-weight ratio.'
  },
  {
    title: 'COACHBUILDING',
    desc: 'Hand-welded and assembled in the UK. We focus on zero-tolerance precision across the entire aluminium structure.'
  },
  {
    title: 'DELIVERY',
    desc: 'Final inspection, testing, and handover at our facility or delivered directly to your base of operations.'
  }
]

export default function ProcessStrip() {
  return (
    <section className="w-full px-6 lg:px-12 py-32 bg-[#0A0A0A]">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-20">
          <SectionLabel index="003" label="THE JPC PROCESS" className="mb-8" />
          <h2 className="font-syne font-extrabold text-5xl lg:text-7xl text-[#F0F0F0] uppercase tracking-tighter">
            ZERO TOLERANCE<br />
            <span className="text-[#6A6A6A]">COACHBUILDING.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-mono text-[10px] text-[#E8500A] mb-8 tracking-[0.4em]">
                PHASE 0{i + 1}
              </span>
              <h3 className="font-syne font-extrabold text-2xl text-white mb-6 tracking-tight uppercase">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-[#6A6A6A] leading-relaxed">
                {step.desc}
              </p>
              
              <div className="mt-12 h-[1px] w-full bg-[#1A1A1A] relative">
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#E8500A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
