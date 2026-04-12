import type { Metadata } from 'next'
import CommissionForm from '@/components/commission/CommissionForm'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Request a Build Slot',
  description: 'Begin your custom JPC Trailer commission. Submit your requirements and secure a build slot.',
}

export default function CommissionPage() {
  return (
    <>
      <section
        className="w-full pt-40 pb-20 px-6 lg:px-12 flex flex-col justify-end min-h-[50vh]"
        style={{ background: '#080808' }}
      >
        <div className="max-w-[1600px] mx-auto w-full">
          <SectionLabel index="005" label="BEGIN THE COMMISSION" className="mb-6" />
          <h1
            className="uppercase leading-none tracking-tight mb-8"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              color: '#F0F0F0',
            }}
          >
            REQUEST A<br />
            <span style={{ color: '#6A6A6A' }}>BUILD SLOT</span>
          </h1>
          <p
            className="text-sm lg:text-base leading-relaxed max-w-xl"
            style={{ color: '#888888', fontFamily: 'Inter, sans-serif' }}
          >
            Every JPC trailer is built to order. Tell us what you need, and we'll arrange a consultation to finalise the specification and assign you a build slot in our queue.
          </p>
        </div>
      </section>

      <section
        className="w-full px-6 lg:px-12 py-24 pb-40"
        style={{ background: '#080808' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <CommissionForm />
        </div>
      </section>
    </>
  )
}
