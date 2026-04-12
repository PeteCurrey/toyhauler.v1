'use client';

import { useEffect, useRef, useState } from 'react';

const GALLERY_ITEMS = [
  { id: 1, caption: 'PADDOCK — BRANDS HATCH', bg: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A0D 100%)' },
  { id: 2, caption: 'MOUNTAIN PASS — SNOWDONIA', bg: 'linear-gradient(135deg, #0D0D0D 0%, #0D1A1A 100%)' },
  { id: 3, caption: 'PORSCHE 911 GT3 — DEPARTURE', bg: 'linear-gradient(135deg, #1A0D0D 0%, #0D0D0D 100%)' },
  { id: 4, caption: 'SUNSET TOW — A1(M) NORTHBOUND', bg: 'linear-gradient(135deg, #1A1000 0%, #0D0D0D 100%)' },
  { id: 5, caption: 'RACE PADDOCK — SILVERSTONE', bg: 'linear-gradient(135deg, #0D0D1A 0%, #0D0D0D 100%)' },
  { id: 6, caption: 'OVERLAND RIG — CAIRNGORMS', bg: 'linear-gradient(135deg, #0D1A0D 0%, #0D0D0D 100%)' },
  { id: 7, caption: 'ALUMINIUM INTERIOR — JPC BUILD', bg: 'linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)' },
  { id: 8, caption: 'TRACK DAY PREP — LYDDEN HILL', bg: 'linear-gradient(135deg, #0D0D0D 0%, #1A0D1A 100%)' },
];

export default function GalleryStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.6;

    const animate = () => {
      if (!paused) {
        posRef.current -= speed;
        // Seamless loop: when we've scrolled one full set, reset
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [paused]);

  // Duplicate items for seamless loop
  const allItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <section className="gallery-strip-section">
      <div className="container gallery-strip-header">
        <span className="font-mono section-label">// LIFE WITH A TOY HAULER</span>
      </div>
      <div
        className="gallery-strip-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="gallery-strip-track" ref={trackRef}>
          {allItems.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="gallery-strip-tile"
              style={{ background: item.bg }}
            >
              <div className="tile-label font-mono">{item.caption}</div>
              <div className="tile-placeholder-text font-mono">IMAGE PLACEHOLDER</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
