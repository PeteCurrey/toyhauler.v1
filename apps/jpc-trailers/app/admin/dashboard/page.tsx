'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null)
  const [commissions, setCommissions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        setSession(session)
        fetchData()
      }
    }
    checkUser()
  }, [router])

  const fetchData = async () => {
    setIsLoading(true)
    
    // Fetch new format leads (with config data joined)
    const { data: newData } = await supabase
      .from('commissions')
      .select(`*, saved_configs ( base_model, config_data )`)
      .order('created_at', { ascending: false })

    // Fetch legacy leads
    const { data: oldData } = await supabase
      .from('commission_requests')
      .select('*')
      .order('created_at', { ascending: false })
      
    // Normalize and merge data
    const merged = [
      ...(newData || []).map(c => {
        // Handle array wrap from join
        const config = Array.isArray(c.saved_configs) ? c.saved_configs[0] : c.saved_configs;
        return {
          id: c.id,
          created_at: c.created_at,
          full_name: c.name,
          trailer_type: config ? config.base_model : 'Custom Build',
          budget_range: config?.config_data?.estimatedPrice ? `EST. £${config.config_data.estimatedPrice.toLocaleString()}` : 'TBC',
          status: c.status
        };
      }),
      ...(oldData || [])
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    setCommissions(merged)
    setIsLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (isLoading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <span className="font-mono text-[#444444] text-xs uppercase tracking-[0.5em] animate-pulse">// LOADING SYSTEM DATA</span>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#080808] p-6 lg:p-12">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#1E1E1E] pb-12">
          <div>
            <SectionLabel index="DASHBOARD" label="COMMAND CENTRE" className="mb-4" />
            <h1 className="text-3xl font-extrabold text-[#F0F0F0] font-syne uppercase">SYSTEM OVERVIEW</h1>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <Button onClick={fetchData} variant="outline" size="sm">Refresh Data</Button>
            <Button onClick={handleSignOut} variant="outline" size="sm">Sign Out</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           {[
             { label: 'TOTAL ENQUIRIES', value: commissions.length },
             { label: 'NEW THIS WEEK', value: commissions.filter(c => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length },
             { label: 'ACTIVE BUILDS', value: 0 }, // Placeholder
             { label: 'JOURNAL POSTS', value: 0 }, // Placeholder
           ].map((stat, i) => (
             <div key={i} className="p-6 border border-[#1E1E1E] bg-[#0D0D0D]">
                <span className="text-[10px] font-mono text-[#444444] uppercase tracking-widest block mb-2">// {stat.label}</span>
                <span className="text-4xl font-extrabold text-[#F0F0F0] font-syne">{stat.value}</span>
             </div>
           ))}
        </div>

        {/* Recent Enquiries Table */}
        <div className="border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden">
          <div className="p-6 border-b border-[#1E1E1E] bg-[#111111]">
             <h2 className="text-xl font-bold text-[#F0F0F0] font-syne uppercase">RECENT COMMISSION ENQUIRIES</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E1E1E]">
                  {['Date', 'Name', 'Trailer Type', 'Budget', 'Status', 'Action'].map(header => (
                    <th key={header} className="p-4 text-[10px] font-mono font-normal text-[#6A6A6A] uppercase tracking-widest">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-inter">
                {commissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-[#444444] text-xs font-mono uppercase">// No leads found in database</td>
                  </tr>
                ) : (
                  commissions.map((c) => (
                    <tr key={c.id} className="border-b border-[#1E1E1E] hover:bg-[#111111] transition-colors group">
                      <td className="p-4 text-xs text-[#888888] font-mono">
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm text-[#F0F0F0] font-bold uppercase">{c.full_name}</td>
                      <td className="p-4 text-xs text-[#888888]">{c.trailer_type}</td>
                      <td className="p-4 text-xs text-[#888888]">{c.budget_range}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-[8px] border border-[#1E1E1E] text-[#6A6A6A] uppercase font-mono group-hover:border-[#E8500A] group-hover:text-[#E8500A]">
                          {c.status || 'NEW'}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link href={`/admin/dashboard/commissions/${c.id}`} className="text-[10px] uppercase font-mono text-[#E8500A] font-bold hover:underline">View Detail →</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
