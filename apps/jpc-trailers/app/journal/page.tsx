import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import JournalCard from '@/components/journal/JournalCard'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Inside JPC Trailers. Build diaries, delivery stories, and industry insights.',
}

import Link from 'next/link'

export default async function JournalPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string }> 
}) {
  const { category = 'All' } = await searchParams
  const supabase = createServerClient()
  
  let query = supabase
    .from('journal_posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (category !== 'All') {
    query = query.eq('category', category)
  }

  const { data: posts } = await query

  const categories = ['All', 'Build Diary', 'Delivery Stories', 'Behind the Build', 'Industry']

  return (
    <main className="min-h-screen bg-[#080808] pt-40 pb-40">
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="mb-20">
          <SectionLabel index="04" label="INSIDE JPC" className="mb-6" />
          <h1
            className="uppercase leading-tight tracking-tight mb-8"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              color: '#F0F0F0',
            }}
          >
            THE <span style={{ color: '#6A6A6A' }}>JOURNAL</span>
          </h1>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-12">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/journal' : `/journal?category=${encodeURIComponent(cat)}`}
                className={`px-6 py-2 border text-[10px] uppercase tracking-widest transition-all hover:border-[#E8500A] hover:text-[#E8500A] ${
                  category === cat ? 'border-[#E8500A] text-[#E8500A]' : 'border-[#1E1E1E] text-[#6A6A6A]'
                }`}
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Grid */}
        {!posts || posts.length === 0 ? (
          <div className="py-20 border-t border-[#1E1E1E]">
            <p className="text-[#444444] uppercase tracking-widest text-xs font-mono">
              // No articles in this category. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
