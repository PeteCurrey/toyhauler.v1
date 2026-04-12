'use client';

import { useEffect, useRef } from 'react';

export default function JPCConnection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.jpc-content > *', {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
        });
      });
    });
  }, []);

  return (
    <section className="jpc-section" ref={sectionRef}>
      <div className="container jpc-content">
        <span className="font-mono section-label">// POWERED BY JPC TRAILERS</span>
        <div className="jpc-grid">
          <div className="jpc-copy">
            <h2 className="font-syne jpc-headline">Every build<br />starts in<br /><span className="accent-text">Chesterfield.</span></h2>
          </div>
          <div className="jpc-body">
            <p>
              Every toyhauler.co.uk build is commissioned through JPC Trailers — the UK&apos;s
              built-to-order aluminium trailer specialists based in Chesterfield, Derbyshire.
              JPC handle everything from specification to delivery. You deal with one team
              from first enquiry to final handover.
            </p>
            <a
              href="https://jpctrailers.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary jpc-link-btn"
            >
              Visit JPC Trailers →
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="jpc-stats">
          {[
            { val: '100%', label: 'Aluminium construction' },
            { val: 'UK', label: 'Built in Chesterfield' },
            { val: 'BTO', label: 'Built to order only' },
            { val: '1:1', label: 'Direct client relationship' },
          ].map((stat) => (
            <div key={stat.label} className="jpc-stat">
              <span className="font-syne stat-val accent-text">{stat.val}</span>
              <span className="font-mono stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
