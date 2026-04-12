import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is a Toy Hauler? | The Ultimate Enclosed Trailer',
  description: 'Discover the concept of a toy hauler. Premium, custom-built aluminium enclosed trailers for motorsport, track days, and overlanding in the UK.',
};

export default function WhatIsAToyHaulerPage() {
  return (
    <div className="pt-24 min-h-screen container pb-20">
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* HERO / CONCEPT */}
        <section className="space-y-8 mt-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase">The Concept</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            More than just an <br/>
            <span className="text-text-muted">enclosed trailer.</span>
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl">
            A toy hauler is the ultimate transport solution for the uncompromising enthusiast. It combines an ultra-secure, weather-sealed garage for your vehicles with the lifestyle infrastructure you need at the track, on the trail, or at the show.
          </p>
        </section>

        {/* WHY ALUMINIUM */}
        <section className="space-y-8 border-t border-border pt-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase">Materials</p>
          <h2 className="text-4xl md:text-5xl font-bold">Why <span className="text-accent-silver">Aluminium?</span></h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-text-muted leading-relaxed">
                We build exclusively with high-grade aluminium. Unlike traditional steel frames that invite rust and pile on unnecessary weight, an aluminium chassis means you tow more of your gear and less of the trailer itself.
              </p>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-accent">01.</span> Zero Rust Issues
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">02.</span> Higher Payload Capacity
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent">03.</span> Better Resale Value
                </li>
              </ul>
            </div>
            <div className="bg-surface p-8 border border-border h-64 flex items-center justify-center rounded-sm">
              <p className="font-mono text-xs text-text-muted tracking-widest">[ SVG COMPARISON PLACEHOLDER ]</p>
            </div>
          </div>
        </section>

        {/* CONFIGURATIONS */}
        <section className="space-y-8 border-t border-border pt-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase">Adaptability</p>
          <h2 className="text-4xl md:text-5xl font-bold">Limitless <span className="text-accent-silver">Configurations</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border p-6 hover:border-accent transition-colors">
              <div className="h-40 border-b border-border mb-6 flex items-center justify-center">
                <span className="font-mono text-xs text-text-muted">[ TRACK DAY SVG ]</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Track Day Spec</h3>
              <p className="text-text-muted text-sm leading-relaxed">Full tie-down logic, tyre racks, tool storage, and built-in winch systems.</p>
            </div>
            <div className="bg-surface border border-border p-6 hover:border-accent transition-colors">
              <div className="h-40 border-b border-border mb-6 flex items-center justify-center">
                <span className="font-mono text-xs text-text-muted">[ MULTI-MOTO SVG ]</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Multi-Moto</h3>
              <p className="text-text-muted text-sm leading-relaxed">Front sleeping quarters with rear garage capable of holding 3-4 motocross bikes.</p>
            </div>
            <div className="bg-surface border border-border p-6 hover:border-accent transition-colors">
              <div className="h-40 border-b border-border mb-6 flex items-center justify-center">
                <span className="font-mono text-xs text-text-muted">[ OVERLAND SVG ]</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Overland Hybrid</h3>
              <p className="text-text-muted text-sm leading-relaxed">Raised suspension, off-grid power banks, water tanks, and roof-top tent mounts.</p>
            </div>
          </div>
        </section>

        {/* STOCK POLICY */}
        <section className="space-y-8 border-t border-border pt-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase">Our Approach</p>
          <h2 className="text-4xl md:text-5xl font-bold">Built to Order. <span className="text-accent-silver">Never off the peg.</span></h2>
          <p className="text-text-muted leading-relaxed max-w-2xl">
            You will not find rows of our trailers rotting on a dealer&apos;s lot. Every single toy hauler that leaves our UK facility is heavily commissioned by its owner. You choose the dimensions, the axles, the internal layout, and the aesthetic.
          </p>
          <a href="/configure" className="btn-primary mt-4 inline-block">Start Your Build</a>
        </section>

        {/* FAQ */}
        <section className="space-y-8 border-t border-border pt-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase">Details</p>
          <h2 className="text-4xl md:text-5xl font-bold">FAQ</h2>
          
          <div className="space-y-4">
            <details className="group border border-border bg-surface [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-text-primary">
                <h2 className="font-medium">How heavy are they compared to steel?</h2>
                <span className="shrink-0 rounded-full bg-bg p-1.5 text-text-muted sm:p-3 group-open:-rotate-45 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-text-muted leading-relaxed">
                Generally, our fully aluminium trailers are 30-40% lighter than equivalent steel models, dramatically increasing your legal payload capacity on standard UK towing licenses.
              </div>
            </details>

            <details className="group border border-border bg-surface [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-text-primary">
                <h2 className="font-medium">Can I finance my build?</h2>
                <span className="shrink-0 rounded-full bg-bg p-1.5 text-text-muted sm:p-3 group-open:-rotate-45 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-text-muted leading-relaxed">
                Yes, through our partnership with JPC Trailers, we offer multiple commercial and personal finance avenues to spread the cost of your bespoke toy hauler.
              </div>
            </details>
          </div>
        </section>

      </div>
    </div>
  );
}
