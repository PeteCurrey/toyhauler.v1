'use client';

import { Configurator } from '@jpc/configurator';

export default function ConfigureClient() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Configurator 
        sourceDomain="jpctrailers.co.uk"
        accentColour="#E8500A"
        supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL}
        supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
      />
    </div>
  );
}
