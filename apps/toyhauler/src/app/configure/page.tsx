import { Configurator } from '@jpc/configurator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configure Your Toy Hauler | UK Custom Build',
  description: 'Design and specify your custom aluminium toy hauler online. Choose your dimensions, loading systems, and internal layouts.',
};

export default function ConfigurePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Configurator 
        sourceDomain="toyhauler.co.uk"
        supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL}
        supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
      />
    </div>
  );
}
