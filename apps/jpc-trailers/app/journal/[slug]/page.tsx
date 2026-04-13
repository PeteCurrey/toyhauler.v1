import { createServerClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()
  const { data: post } = await supabase
    .from('journal_posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single()

  if (!post) return {}

  return {
    title: `${post.title} | Journal`,
    description: post.excerpt,
  }
}

export default async function JournalPostPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()
  const { data: post } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) notFound()

  return (
    <article className="min-h-screen bg-[#080808] pt-32 pb-40">
      {/* Hero Section */}
      <div className="w-full h-[60vh] relative mb-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${post.cover_image_url || '/images/placeholder-journal.jpg'})` }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #080808 0%, transparent 100%)' }}
        />
        
        <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-12 pb-20">
          <div className="max-w-[1200px] mx-auto w-full">
            <SectionLabel index="JS" label={post.category.toUpperCase()} className="mb-8" />
            <h1
              className="uppercase leading-none tracking-tight mb-4"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                color: '#F0F0F0',
              }}
            >
              {post.title}
            </h1>
            <p
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: 'DM Mono, monospace', color: '#6A6A6A' }}
            >
              PUBLISHED // {new Date(post.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto">
          {/* Excerpt */}
          <div className="mb-16">
            <p
              className="text-xl lg:text-2xl leading-relaxed italic"
              style={{ color: '#F0F0F0', fontFamily: 'Inter, sans-serif' }}
            >
              — {post.excerpt}
            </p>
          </div>

          {/* Body Content */}
          <div 
            className="prose prose-invert prose-orange max-w-none"
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              color: '#888888',
              lineHeight: 1.8,
              fontSize: '1.1rem'
            }}
          >
            {/* 
              Note: Usually we would use react-markdown here. 
              Implementing as standard text for now.
            */}
            {post.body.split('\n\n').map((para: string, i: number) => (
              <p key={i} className="mb-8">
                {para}
              </p>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="mt-32 pt-12 border-t border-[#1E1E1E] flex justify-between items-center">
             <div>
                <Button href="/journal" variant="outline" size="sm">
                  ← Back to Journal
                </Button>
             </div>
             <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full border border-[#1E1E1E] flex items-center justify-center hover:border-[#E8500A] cursor-pointer">
                  <span className="text-[10px] uppercase font-mono text-[#444444]">IG</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#1E1E1E] flex items-center justify-center hover:border-[#E8500A] cursor-pointer">
                  <span className="text-[10px] uppercase font-mono text-[#444444]">TW</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </article>
  )
}
