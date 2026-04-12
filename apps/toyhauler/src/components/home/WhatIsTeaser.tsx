'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function WhatIsTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const doorsRef = useRef<SVGGElement>(null);
  const towRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1.5,
          },
        });

        // Car drives in from right
        if (carRef.current) {
          tl.from(carRef.current, { x: 120, opacity: 0, duration: 2 }, 0);
          tl.to(carRef.current, { x: -5, duration: 2 }, 2);
        }
        // Doors close
        if (doorsRef.current) {
          tl.to('.door-left', { scaleX: 1, transformOrigin: 'left center', duration: 1.5 }, 3);
          tl.to('.door-right', { scaleX: 1, transformOrigin: 'right center', duration: 1.5 }, 3);
        }
        // Whole unit drives away
        if (towRef.current) {
          tl.to(towRef.current, { x: 80, opacity: 0, duration: 2 }, 4.5);
        }

        // Reveal text
        gsap.from('.teaser-headline', {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          y: 60,
          opacity: 0,
          duration: 1,
        });
        gsap.from('.teaser-copy', {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
        });
      });
    });
  }, []);

  return (
    <section className="teaser-section" ref={sectionRef}>
      <div className="container">
        <h2 className="teaser-headline font-syne">
          You&apos;ve got the car.&nbsp;<br />
          The bike. The machines.&nbsp;<br />
          <span className="accent-text">Now how do you move them?</span>
        </h2>

        <div className="teaser-grid">
          <div className="teaser-copy">
            <p>
              A toy hauler is an enclosed trailer with a rear garage section built
              specifically for the things you love to drive, ride, or race.
              In the US, they&apos;re everywhere. In the UK? Until now, you had to
              settle for something that almost did the job.
            </p>
            <Link href="/what-is-a-toy-hauler" className="teaser-cta btn-secondary">Find out more →</Link>
          </div>

          {/* Animated SVG infographic */}
          <div className="teaser-svg-container">
            <svg viewBox="0 0 400 200" className="teaser-svg" aria-hidden="true">
              <defs>
                <linearGradient id="trailerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1A1A1A" />
                  <stop offset="100%" stopColor="#222222" />
                </linearGradient>
              </defs>

              {/* Full tow unit */}
              <g ref={towRef}>
                {/* Tow vehicle */}
                <g transform="translate(10, 110)">
                  <rect x="0" y="0" width="80" height="50" rx="4" fill="#1E1E1E" stroke="#333" strokeWidth="1.5"/>
                  <rect x="50" y="-10" width="30" height="15" rx="2" fill="#2A2A2A" stroke="#333" strokeWidth="1"/>
                  <circle cx="15" cy="55" r="9" fill="#111" stroke="#C0C0C0" strokeWidth="2"/>
                  <circle cx="65" cy="55" r="9" fill="#111" stroke="#C0C0C0" strokeWidth="2"/>
                  <rect x="0" y="20" width="8" height="8" rx="1" fill="#E8500A" opacity="0.8"/>
                  <rect x="55" y="20" width="20" height="12" rx="1" fill="#1A1A1A" stroke="#555" strokeWidth="0.5"/>
                </g>

                {/* Enclosed trailer body */}
                <g transform="translate(92, 105)">
                  <rect x="0" y="0" width="200" height="55" rx="2" fill="url(#trailerGrad)" stroke="#333" strokeWidth="1.5"/>
                  {/* Rivets */}
                  {[20, 60, 100, 140, 180].map((x) => (
                    <circle key={x} cx={x} cy={8} r={2} fill="#C0C0C0" opacity="0.4"/>
                  ))}
                  {/* JPC badge */}
                  <text x="100" y="32" textAnchor="middle" fill="#C0C0C0" fontSize="8" fontFamily="monospace" opacity="0.5">TOYHAULER.CO.UK</text>
                  <circle cx="25" cy="60" r="8" fill="#111" stroke="#C0C0C0" strokeWidth="2"/>
                  <circle cx="175" cy="60" r="8" fill="#111" stroke="#C0C0C0" strokeWidth="2"/>
                  {/* Rear lights */}
                  <rect x="190" y="10" width="8" height="12" rx="1" fill="#E8500A" opacity="0.9"/>
                  <rect x="190" y="30" width="8" height="12" rx="1" fill="#E8500A" opacity="0.5"/>
                </g>

                {/* Rear doors */}
                <g ref={doorsRef}>
                  <rect className="door-left" x="287" y="105" width="0" height="55" fill="#1A1A1A" stroke="#444" strokeWidth="1"/>
                  <rect className="door-right" x="292" y="105" width="0" height="55" fill="#1A1A1A" stroke="#444" strokeWidth="1"/>
                  {/* Door handles */}
                  <rect x="288" y="127" width="4" height="10" rx="1" fill="#C0C0C0" opacity="0.6"/>
                </g>

                {/* Car inside trailer */}
                <g ref={carRef} transform="translate(150, 120)">
                  <rect x="0" y="0" width="60" height="30" rx="3" fill="#2A2A2A" stroke="#E8500A" strokeWidth="1"/>
                  <rect x="10" y="-8" width="40" height="12" rx="2" fill="#252525" stroke="#444" strokeWidth="1"/>
                  <circle cx="10" cy="33" r="6" fill="#111" stroke="#555" strokeWidth="1.5"/>
                  <circle cx="50" cy="33" r="6" fill="#111" stroke="#555" strokeWidth="1.5"/>
                </g>
              </g>
            </svg>

            <div className="svg-caption font-mono">
              <span className="accent-text">01</span> Load up &nbsp;
              <span className="accent-text">02</span> Lock up &nbsp;
              <span className="accent-text">03</span> Roll out
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
