import { Configurator } from '@jpc/configurator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configure Your JPC Trailer | Industrial Custom Build',
  description: 'Design and specify your professional aluminium trailer online. High-performance multi-axle transporters and custom fleet solutions.',
};

export default function ConfigurePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Configurator 
        sourceDomain="jpctrailers.co.uk"
        accentColour="#E8500A" // Distinct but shared identity
        supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL}
        supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
      />
    </div>
  );
}
