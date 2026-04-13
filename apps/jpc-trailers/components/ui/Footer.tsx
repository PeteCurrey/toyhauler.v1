import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#050505] border-t border-[#111111] pt-32 pb-12 px-6 lg:px-12">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 mb-32">
        <div className="lg:col-span-2">
          <Link href="/" className="flex flex-col mb-8">
            <span className="font-syne font-extrabold text-3xl tracking-tighter text-[#F0F0F0] leading-none">
              JPC<span className="text-[#E8500A]">TRAILERS</span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#6A6A6A] mt-2">
              // PRECISION ALUMINIUM COACHBUILDERS
            </span>
          </Link>
          <p className="max-w-md text-[#6A6A6A] font-inter text-sm leading-relaxed">
            The UK's premier coachbuilder of bespoke aluminium trailers. From motorsport 
            transporters to luxury toy haulers, we engineer the strongest, lightest 
            towing solutions on the market.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#E8500A] mb-8 uppercase">// EXPLORE</h4>
          <nav className="flex flex-col gap-4">
            <Link href="/trailers" className="text-[#F0F0F0] hover:text-[#E8500A] transition-colors font-mono text-xs tracking-wide">TRAILERS</Link>
            <Link href="/process" className="text-[#F0F0F0] hover:text-[#E8500A] transition-colors font-mono text-xs tracking-wide">PROCESS</Link>
            <Link href="/configure" className="text-[#F0F0F0] hover:text-[#E8500A] transition-colors font-mono text-xs tracking-wide">CONFIGURATOR</Link>
            <Link href="/commission" className="text-[#F0F0F0] hover:text-[#E8500A] transition-colors font-mono text-xs tracking-wide">COMMISSION</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#E8500A] mb-8 uppercase">// CONNECT</h4>
          <div className="flex flex-col gap-4 text-[#6A6A6A] font-inter text-sm">
            <p>JPC Trailers Ltd.</p>
            <p>Chesterfield, United Kingdom</p>
            <a href="mailto:hello@jpctrailers.co.uk" className="text-[#F0F0F0] hover:text-[#E8500A] transition-colors">hello@jpctrailers.co.uk</a>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center hover:bg-[#E8500A] hover:border-[#E8500A] transition-all">
                <span className="sr-only">Instagram</span>
                <span className="text-white">IG</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center hover:bg-[#B3A06D] hover:border-[#B3A06D] transition-all">
                <span className="sr-only">Facebook</span>
                <span className="text-white">FB</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto pt-12 border-t border-[#111111] flex flex-col lg:flex-row justify-between items-center gap-8">
        <span className="font-mono text-[8px] tracking-[0.4em] text-[#444444]">
          © {currentYear} JPC TRAILERS. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-8">
          <Link href="/privacy" className="font-mono text-[8px] tracking-[0.4em] text-[#444444] hover:text-[#E8500A]">PRIVACY POLICY</Link>
          <Link href="/terms" className="font-mono text-[8px] tracking-[0.4em] text-[#444444] hover:text-[#E8500A]">TERMS OF SERVICE</Link>
        </div>
        <span className="font-mono text-[8px] tracking-[0.4em] text-[#444444] hidden lg:block">
          DESIGNED BY AVORRIA.
        </span>
      </div>
    </footer>
  )
}
