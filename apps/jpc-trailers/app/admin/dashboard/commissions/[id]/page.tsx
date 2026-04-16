'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function CommissionDetail({ params }: { params: { id: string } }) {
  const [commission, setCommission] = useState<any>(null)
  const [config, setConfig] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      
      // Fetch the commission details
      const { data: commData, error: commError } = await supabase
        .from('commissions')
        .select('*')
        .eq('id', params.id)
        .single()
        
      if (commError || !commData) {
        // Fallback to checking the old commission_requests table
        const { data: oldCommData } = await supabase
          .from('commission_requests')
          .select('*')
          .eq('id', params.id)
          .single()
          
        if (oldCommData) {
          setCommission(oldCommData)
        }
      } else {
        setCommission(commData)
        
        // If there's a config_ref, fetch the configuration data
        if (commData.config_ref) {
          const { data: configData } = await supabase
            .from('saved_configs')
            .select('*')
            .eq('config_ref', commData.config_ref)
            .single()
            
          if (configData) {
            setConfig(configData)
          }
        }
      }
      
      setIsLoading(false)
    }

    fetchData()
  }, [params.id])

  if (isLoading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <span className="font-mono text-[#444444] text-xs uppercase tracking-[0.5em] animate-pulse">// LOADING COMMISSION DATA</span>
    </div>
  )

  if (!commission) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center flex-col">
      <span className="font-mono text-[#E8500A] text-xs uppercase tracking-[0.5em] mb-4">// ERROR: LEAD NOT FOUND</span>
      <Link href="/admin/dashboard" className="text-[#888] font-mono hover:text-white transition-colors">← Back to Dashboard</Link>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#080808] p-6 lg:p-12">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <Link href="/admin/dashboard" className="text-[#888] font-mono text-xs hover:text-white transition-colors mb-8 inline-block uppercase tracking-widest">
            ← Command Centre
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-[#1E1E1E]">
            <div>
              <SectionLabel index="LEAD" label={commission.config_ref ? `REF: #${commission.config_ref}` : 'GENERAL ENQUIRY'} className="mb-4" />
              <h1 className="text-3xl font-extrabold text-[#F0F0F0] font-syne uppercase">{commission.name || commission.full_name}</h1>
              <a href={`mailto:${commission.email}`} className="text-[#E8500A] font-mono mt-2 inline-block hover:underline">{commission.email}</a>
              {commission.phone && <p className="text-[#888] font-mono mt-1">{commission.phone}</p>}
            </div>
            <div className="mt-6 md:mt-0 text-right">
              <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-2">Request Date</span>
              <span className="text-sm font-mono text-[#F0F0F0]">{new Date(commission.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Specs) */}
          <div className="lg:col-span-2 space-y-12">
            
            {config ? (
              <section>
                <h2 className="text-xl font-syne font-bold uppercase mb-6 text-[#F0F0F0] border-l-2 border-[#E8500A] pl-4">Engineering Specification</h2>
                <div className="bg-[#0D0D0D] border border-[#1E1E1E] p-8 space-y-6">
                  
                  <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#1E1E1E]">
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Base Model</span>
                      <span className="font-syne font-bold text-lg text-[#F0F0F0] uppercase">{config.base_model}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Dimensions</span>
                      <span className="font-syne font-bold text-lg text-[#F0F0F0]">
                        {config.config_data.dimensions.length}x{config.config_data.dimensions.width}x{config.config_data.dimensions.height}ft
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#1E1E1E]">
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Axle Configuration</span>
                      <span className="font-mono text-sm text-[#F0F0F0] uppercase">{config.config_data.axleConfig}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Exterior Finish</span>
                      <span className="font-mono text-sm text-[#F0F0F0] uppercase">{config.config_data.exteriorFinish}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#1E1E1E]">
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Interior Package</span>
                      <span className="font-mono text-sm text-[#F0F0F0] uppercase">{config.config_data.interiorPackage}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Doors</span>
                      <span className="font-mono text-sm text-[#F0F0F0] uppercase">
                        Rear: {config.config_data.doors?.rear} <br/>
                        Front: {config.config_data.doors?.front} <br/>
                        Side Access: {config.config_data.doors?.side ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  {config.config_data.accessories?.length > 0 && (
                    <div className="pb-6 border-b border-[#1E1E1E]">
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-3">Accessories</span>
                      <ul className="list-disc leading-relaxed pl-4 font-mono text-sm text-[#F0F0F0] uppercase">
                        {config.config_data.accessories.map((acc: string, idx: number) => (
                          <li key={idx} className="mb-1">{acc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 text-right">
                    <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Estimated Client Budget</span>
                    <span className="font-syne font-bold text-3xl text-[#E8500A]">£{config.config_data.estimatedPrice?.toLocaleString()}</span>
                  </div>

                </div>
              </section>
            ) : (
              <section>
                <h2 className="text-xl font-syne font-bold uppercase mb-6 text-[#F0F0F0] border-l-2 border-[#1E1E1E] pl-4">Legacy Enquiry Details</h2>
                <div className="bg-[#0D0D0D] border border-[#1E1E1E] p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#1E1E1E]">
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Trailer Type</span>
                      <span className="font-syne font-bold text-lg text-[#F0F0F0] uppercase">{commission.trailer_type}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Intended Use</span>
                      <span className="font-mono text-sm text-[#F0F0F0] uppercase">{commission.intended_use}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#1E1E1E]">
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Axle Preference</span>
                      <span className="font-mono text-sm text-[#F0F0F0] uppercase">{commission.axle_preference}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-1">Budget Range</span>
                      <span className="font-mono text-sm text-[#F0F0F0] uppercase">{commission.budget_range}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Client Note */}
            {(commission.message || commission.dimensions_notes) && (
              <section>
                <h2 className="text-xl font-syne font-bold uppercase mb-6 text-[#F0F0F0] border-l-2 border-[#1E1E1E] pl-4">Additional Notes</h2>
                <div className="bg-[#111] p-6 border border-[#222]">
                  <p className="font-mono text-sm leading-relaxed text-[#CCC]">
                    {commission.message || commission.dimensions_notes}
                  </p>
                </div>
              </section>
            )}

          </div>

          {/* Sidebar (Actions & Status) */}
          <div className="space-y-6">
            <div className="bg-[#111] border border-[#1E1E1E] p-6">
              <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-4">Lead Status</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#E8500A]/10 text-[#E8500A] font-mono text-xs uppercase border border-[#E8500A]/20">New Enquiry</span>
                <span className="px-3 py-1 bg-[#222] text-[#888] font-mono text-xs uppercase border border-[#333] cursor-not-allowed">In Review</span>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-[#1E1E1E] p-6 space-y-4">
              <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block">Actions</span>
              <Button className="w-full" onClick={() => window.location.href = `mailto:${commission.email}`}>Reply To Client</Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
