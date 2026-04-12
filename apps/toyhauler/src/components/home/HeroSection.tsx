'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Animate each line's chars
        const splitAndAnimate = (el: HTMLDivElement | null, delay: number) => {
          if (!el) return;
          const text = el.textContent || '';
          el.innerHTML = text
            .split('')
            .map((c) => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`)
            .join('');
          tl.from(el.querySelectorAll('.char'), {
            y: 80,
            opacity: 0,
            stagger: 0.03,
            duration: 0.8,
          }, delay);
        };

        splitAndAnimate(line1Ref.current, 0.2);
        splitAndAnimate(line2Ref.current, 0.35);
        splitAndAnimate(line3Ref.current, 0.5);

        tl.from(subRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0.8);
        tl.from(ctaRef.current, { y: 15, opacity: 0, duration: 0.5 }, 1.0);

        // Parallax on hero bg
        if (heroRef.current) {
          gsap.to('.hero-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    });
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      {/* Animated background */}
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>

      {/* Floating data strip */}
      <div className="hero-data-strip font-mono">
        <span>ALUMINIUM CONSTRUCTION</span>
        <span>BUILT TO ORDER // CHESTERFIELD UK</span>
        <span>POWERED BY JPC TRAILERS</span>
      </div>

      {/* Main content */}
      <div className="hero-content container">
        <div className="hero-headline">
          <div className="hero-line overflow-hidden" ref={line1Ref}>YOUR TOYS.</div>
          <div className="hero-line overflow-hidden" ref={line2Ref}>YOUR RULES.</div>
          <div className="hero-line overflow-hidden" ref={line3Ref}>YOUR TRAILER.</div>
        </div>

        <p className="hero-sub" ref={subRef}>
          Premium toy haulers built to order in the UK. Aluminium construction.<br />
          Bespoke to your machines, your lifestyle, and your standards.
        </p>

        <div className="hero-ctas" ref={ctaRef}>
          <Link href="/configure" className="btn-primary">Configure Yours →</Link>
          <Link href="/what-is-a-toy-hauler" className="btn-secondary">What is a Toy Hauler?</Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
        <span className="font-mono">SCROLL</span>
      </div>
    </section>
  );
}
