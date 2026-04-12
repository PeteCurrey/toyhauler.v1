'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="logo-link">
          <span className="font-syne logo-text">TOYHAULER</span>
          <span className="font-mono logo-domain">.co.uk</span>
        </Link>
        <nav className="desktop-nav">
          <Link href="/what-is-a-toy-hauler" className={pathname === '/what-is-a-toy-hauler' ? 'active' : ''}>What is a Toy Hauler</Link>
          <Link href="/configure" className={pathname === '/configure' ? 'active' : ''}>Configure</Link>
          <Link href="/gallery" className={pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
          <Link href="/journal" className={pathname === '/journal' ? 'active' : ''}>Journal</Link>
        </nav>
        <div className="nav-actions">
          <a href="https://jpctrailers.co.uk/commission?ref=toyhauler" target="_blank" rel="noopener noreferrer" className="btn-primary nav-btn">
            Commission Yours
          </a>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      
      {mobileOpen && (
        <div className="mobile-menu">
          <Link onClick={() => setMobileOpen(false)} href="/what-is-a-toy-hauler">What is a Toy Hauler</Link>
          <Link onClick={() => setMobileOpen(false)} href="/configure">Configure</Link>
          <Link onClick={() => setMobileOpen(false)} href="/gallery">Gallery</Link>
          <Link onClick={() => setMobileOpen(false)} href="/journal">Journal</Link>
          <a onClick={() => setMobileOpen(false)} href="https://jpctrailers.co.uk/commission?ref=toyhauler" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent)', marginTop: '2rem'}}>Commission Yours</a>
        </div>
      )}
    </header>
  );
}
