'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ConfiguratorCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.config-cta-content', {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          y: 60,
          opacity: 0,
          duration: 1,
        });
      });
    });
  }, []);

  return (
    <section className="configurator-cta-section" ref={sectionRef}>
      {/* Background SVG trailer silhouette */}
      <div className="config-preview-bg" aria-hidden="true">
        <svg viewBox="0 0 800 300" className="config-trailer-svg">
          <rect x="120" y="50" width="550" height="180" rx="4" fill="none" stroke="#E8500A" strokeWidth="2" opacity="0.15"/>
          <rect x="40" y="100" width="80" height="130" rx="4" fill="none" stroke="#333" strokeWidth="1.5"/>
          {[160, 240, 320, 400, 480, 560].map((x) => (
            <line key={x} x1={x} y1="50" x2={x} y2="230" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.1"/>
          ))}
          <text x="400" y="175" textAnchor="middle" fill="#E8500A" fontSize="14" fontFamily="monospace" opacity="0.08" letterSpacing="4">TOYHAULER.CO.UK</text>
          <circle cx="220" cy="240" r="28" fill="none" stroke="#444" strokeWidth="2" opacity="0.3"/>
          <circle cx="580" cy="240" r="28" fill="none" stroke="#444" strokeWidth="2" opacity="0.3"/>
        </svg>
      </div>

      <div className="config-cta-content container">
        <span className="font-mono section-label">// SPEC IT YOUR WAY</span>
        <h2 className="font-syne config-cta-headline">BUILD YOUR<br /><span className="accent-text">TOY HAULER</span></h2>
        <p className="config-cta-sub">
          Select your base. Choose your dimensions. Pick your finish and interior.<br />
          Download your spec sheet. Commit when you&apos;re ready.
        </p>
        <Link href="/configure" className="btn-primary">Open the Configurator →</Link>
      </div>
    </section>
  );
}
