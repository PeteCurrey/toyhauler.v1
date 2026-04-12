import type { Metadata } from 'next'
import StepSection from '@/components/process/StepSection'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'The Process',
  description: 'The 4-step commission journey for JPC Trailers. Consult, Specify, Build, Deliver.',
}

const steps = [
  {
    number: '01',
    title: 'CONSULT',
    copy: 'You submit a build enquiry. We review it, ask the right questions, and get on a call. No sales pitch. Just a conversation about what you actually need.',
  },
  {
    number: '02',
    title: 'SPECIFY',
    copy: "We produce a full build specification — dimensions, materials, options, timeline. You approve it. We don't build a single rivet until you're happy with the spec.",
  },
  {
    number: '03',
    title: 'BUILD',
    copy: "Your trailer enters the build queue. We'll give you a slot date and a delivery estimate. Builds are documented — you'll see your trailer take shape.",
  },
  {
    number: '04',
    title: 'DELIVER',
    copy: 'Delivered to your door or available for collection from Chesterfield. Every JPC trailer leaves with full documentation, warranty, and a build certificate.',
  },
]

export default function ProcessPage() {
  return (
    <div className="relative">
      <section
        className="w-full pt-40 pb-20 px-6 lg:px-12 flex flex-col justify-end min-h-[50vh] relative z-10"
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
            THE PROCESS
          </h1>
          <p
            className="text-sm lg:text-base uppercase tracking-widest"
            style={{ fontFamily: 'DM Mono, monospace', color: '#6A6A6A' }}
          >
            From commission to collection.
          </p>
        </div>
      </section>

      {steps.map((step, index) => (
        <StepSection
          key={step.number}
          number={step.number}
          title={step.title}
          copy={step.copy}
          index={index}
        />
      ))}

      {/* Final CTA */}
      <section
        className="w-full px-6 lg:px-12 py-32 flex flex-col items-center justify-center relative z-50 text-center"
        style={{ background: '#080808', borderTop: '1px solid #1E1E1E' }}
      >
        <h2
          className="uppercase leading-none mb-8"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#F0F0F0',
          }}
        >
          READY TO START?
        </h2>
        <Button href="/commission" variant="solid" size="lg">
          Start your commission →
        </Button>
      </section>
    </div>
  )
}
