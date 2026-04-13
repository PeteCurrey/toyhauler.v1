'use client'

import { useEffect, useRef } from 'react'

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        const words = gsap.utils.toArray('.brand-word')
        
        gsap.to(words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
        })
      })
    })
  }, [])

  const statement = "Precision isn't just a word at JPC. It is the core of every weld, every bolt, and every chassis. We don't believe in universal fit. We believe that your trailer should be as bespoke as the vehicle it carries. Stronger. Lighter. Better."

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-[60vh] flex items-center justify-center px-6 lg:px-12 py-32 bg-[#080808] border-y border-[#111111]"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-syne font-bold text-3xl lg:text-5xl leading-tight text-white uppercase tracking-tight text-center">
          {statement.split(' ').map((word, i) => (
            <span 
              key={i} 
              className="brand-word inline-block mr-[0.25em] mb-[0.1em] opacity-10 transition-opacity duration-300"
            >
              {word}
            </span>
          ))}
        </h2>
        
        <div className="mt-20 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#E8500A] uppercase">// THE JPC PROMISE</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-[#E8500A] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
