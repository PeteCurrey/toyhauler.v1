'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function JournalManager() {
  const [session, setSession] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        setSession(session)
        fetchPosts()
      }
    }
    checkUser()
  }, [router])

  const fetchPosts = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('journal_posts')
      .select('*')
      .eq('source_site', 'jpc')
      .order('created_at', { ascending: false })
    
    setPosts(data || [])
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await supabase.from('journal_posts').delete().eq('id', id)
      fetchPosts()
    }
  }

  if (isLoading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <span className="font-mono text-[#444444] text-xs uppercase tracking-[0.5em] animate-pulse">// LOADING CMS DATA</span>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#080808] p-6 lg:p-12">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <Link href="/admin/dashboard" className="text-[#888] font-mono text-xs hover:text-white transition-colors mb-8 inline-block uppercase tracking-widest">
            ← Command Centre
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-[#1E1E1E]">
            <div>
              <SectionLabel index="CMS" label="JOURNAL MANAGER" className="mb-4" />
              <h1 className="text-3xl font-extrabold text-[#F0F0F0] font-syne uppercase">CONTENT MANAGEMENT</h1>
            </div>
            <div className="mt-6 md:mt-0 flex gap-4">
              <Button onClick={() => router.push('/admin/dashboard/journal/new')} className="font-syne font-bold uppercase tracking-tight">Create New Post</Button>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden">
          <div className="p-6 border-b border-[#1E1E1E] bg-[#111111]">
             <h2 className="text-xl font-bold text-[#F0F0F0] font-syne uppercase">PUBLISHED JOURNAL POSTS</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E1E1E]">
                  {['Date', 'Title', 'Category', 'Status', 'Actions'].map(header => (
                    <th key={header} className="p-4 text-[10px] font-mono font-normal text-[#6A6A6A] uppercase tracking-widest">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-inter">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-[#444444] text-xs font-mono uppercase">// No posts found</td>
                  </tr>
                ) : (
                  posts.map((p) => (
                    <tr key={p.id} className="border-b border-[#1E1E1E] hover:bg-[#111111] transition-colors group">
                      <td className="p-4 text-xs text-[#888888] font-mono">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm text-[#F0F0F0] font-bold">{p.title}</td>
                      <td className="p-4 text-xs text-[#888888] border border-[#1E1E1E] px-2 py-1 uppercase">{p.category || 'General'}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-[8px] border border-[#E8500A]/30 text-[#E8500A] uppercase font-mono bg-[#E8500A]/5">
                          PUBLISHED
                        </span>
                      </td>
                      <td className="p-4 flex gap-4">
                        <button onClick={() => alert('Editing coming soon!')} className="text-[10px] uppercase font-mono text-[#888] hover:text-[#fff] transition-colors">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-[10px] uppercase font-mono text-[#E8500A] font-bold hover:underline">Delete</button>
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
