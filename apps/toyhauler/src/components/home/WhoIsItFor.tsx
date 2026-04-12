'use client';

import { useEffect, useRef } from 'react';

const CARDS = [
  {
    num: '01',
    title: 'THE TRACK DAY DRIVER',
    copy: 'Your Porsche deserves better than an open flatbed and a prayer.',
    icon: '🏁',
  },
  {
    num: '02',
    title: 'THE CLASSIC CAR OWNER',
    copy: 'Enclosed. Climate-prepped. Your investment protected.',
    icon: '🏛',
  },
  {
    num: '03',
    title: 'THE MOTORSPORT TEAM',
    copy: 'Your pit in a box. Roll up. Set up. Race.',
    icon: '🔧',
  },
  {
    num: '04',
    title: 'THE MOTORCYCLE TOURER',
    copy: 'Five bikes. One trip. All of them safe.',
    icon: '🏍',
  },
  {
    num: '05',
    title: 'THE OVERLANDER',
    copy: 'Your base camp goes wherever you do.',
    icon: '🏔',
  },
  {
    num: '06',
    title: 'THE SHOW CAR OBSESSIVE',
    copy: "Arrive in a trailer that's as much of a statement as what's inside it.",
    icon: '⭐',
  },
];

export default function WhoIsItFor() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const track = trackRef.current;
        const section = sectionRef.current;

        if (!track || !section) return;

        const cards = track.querySelectorAll('.use-case-card');
        const totalWidth = track.scrollWidth - track.offsetWidth;

        gsap.to(track, {
          x: () => -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // Stagger-reveal each card on entry
        cards.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            scrollTrigger: {
              trigger: section,
              start: () => `top top-=${i * 80}`,
              toggleActions: 'play none none none',
            },
          });
        });
      });
    });
  }, []);

  return (
    <section className="who-section" ref={sectionRef}>
      <div className="who-header container">
        <span className="font-mono section-label">// BUILT FOR THESE PEOPLE</span>
      </div>

      <div className="cards-track" ref={trackRef}>
        {CARDS.map((card) => (
          <div key={card.num} className="use-case-card">
            <span className="card-num font-mono">{card.num}</span>
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title font-syne">{card.title}</h3>
            <p className="card-copy">{card.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
