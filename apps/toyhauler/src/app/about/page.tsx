import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ToyHauler.co.uk | UK Built Aluminium Trailers',
  description: 'The story behind the UK\'s premium toy hauler brand. Powered by JPC Trailers.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="container">
        
        <header className="max-w-4xl mx-auto mt-12 mb-20 text-center">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">Our Ethos</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
            Engineering for <br/>
            <span className="text-accent-silver">the enthusiast.</span>
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
            We saw a gap in the UK market for enclosed vehicle transport that didn't treat your passion as just another piece of freight.
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-24">
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-surface h-80 border border-border flex items-center justify-center">
              <span className="font-mono text-xs text-text-muted opacity-30">[ WORKSHOP IMAGE ]</span>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The Problem with Steel.</h2>
              <p className="text-text-muted leading-relaxed">
                For decades, the UK trailer market has been dominated by galvanised steel. It's heavy, it rusts, and it eats heavily into your towing payload. We decided to take a different path.
              </p>
              <p className="text-text-muted leading-relaxed">
                By utilising high-grade aluminium across both the chassis and the superstructure, we dramatically reduce tare weight. This means you can tow a fully equipped 6.0m enclosed trailer with living quarters without requiring an HGV license or a heavy-duty commercial vehicle.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-3xl font-bold">Powered by JPC Trailers.</h2>
              <p className="text-text-muted leading-relaxed">
                ToyHauler.co.uk is the dedicated lifestyle division of JPC Trailers, one of the UK's premier bespoke trailer engineering firms based in Chesterfield.
              </p>
              <p className="text-text-muted leading-relaxed">
                This partnership gives us access to industry-leading fabrication technology, multi-axle expertise, and a combined 30 years of custom trailer building. When you commission a Toy Hauler, you get our lifestyle-focused interiors and motorsport logic, backed by JPC's bulletproof engineering foundation.
              </p>
              <a href="https://jpctrailers.co.uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 font-mono text-accent uppercase tracking-widest text-sm hover:text-white transition-colors">
                Visit JPC Trailers
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="bg-surface h-80 border border-border flex items-center justify-center order-1 md:order-2">
              <span className="font-mono text-xs text-text-muted opacity-30">[ JPC PARTNERSHIP IMAGE ]</span>
            </div>
          </section>

          <section className="border-t border-border pt-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Commission Your Build</h2>
            <p className="text-text-muted leading-relaxed mb-8">
              We don't do mass production. Every Toy Hauler is built to order, tailored to the exact dimensions of your vehicles and your specific needs on the road.
            </p>
            <a href="/commission" className="btn-primary">Start The Process</a>
          </section>
          
        </div>

      </div>
    </div>
  );
}
