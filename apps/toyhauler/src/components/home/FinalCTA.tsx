'use client';

import { useEffect, useRef } from 'react';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.final-cta-inner > *', {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
        });
      });
    });
  }, []);

  return (
    <section className="final-cta-section" ref={sectionRef}>
      <div className="final-cta-inner container">
        <h2 className="font-syne final-cta-headline">
          READY TO BUILD SOMETHING<br />
          <span className="accent-text">WORTH TALKING ABOUT?</span>
        </h2>
        <a
          href="https://jpctrailers.co.uk/commission?ref=toyhauler&type=toyhauler"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary final-cta-btn"
        >
          Commission Your Toy Hauler →
        </a>
      </div>
    </section>
  );
}
