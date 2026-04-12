import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/" className="logo-link">
            <span className="font-syne logo-text">TOYHAULER</span>
            <span className="font-mono logo-domain">.co.uk</span>
          </Link>
          <p className="font-mono muted-text">Premium UK Toy Haulers</p>
        </div>
        
        <div className="footer-links">
          <Link href="/what-is-a-toy-hauler">What is a Toy Hauler</Link>
          <Link href="/configure">Configure</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/about">About</Link>
        </div>
        
        <div className="footer-right">
          <div className="socials">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="YouTube">YouTube</a>
          </div>
          <div className="jpc-attribution">
            <p className="font-mono">Powered by</p>
            <a href="https://jpctrailers.co.uk" target="_blank" rel="noopener noreferrer" className="jpc-link font-syne">JPC Trailers</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
