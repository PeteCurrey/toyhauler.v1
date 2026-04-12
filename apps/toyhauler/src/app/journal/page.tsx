'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

type Category = 'All' | 'Owner Stories' | 'Build Reveals' | 'Track Day Diaries' | 'Overland Adventures' | 'How To Tow';

interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  published_at: string;
  slug: string;
}

const PLACEHOLDER_POSTS: JournalPost[] = [
  {
    id: 'p1',
    title: 'Porsche GT3 RS: The Perfect Track Day Setup',
    excerpt: 'How one owner commissioned a bespoke 6m enclosed trailer specifically designed around the dimensions and tie-down requirements of the 992 GT3 RS.',
    category: 'Owner Stories',
    image_url: '',
    published_at: '2026-04-10T12:00:00Z',
    slug: 'porsche-gt3-rs-track-setup'
  },
  {
    id: 'p2',
    title: 'Build Reveal: Project Overlander 4x4',
    excerpt: 'A first look at our most capable off-grid hauler yet, featuring independent air suspension, 1000W solar array, and a raised ground clearance chassis.',
    category: 'Build Reveals',
    image_url: '',
    published_at: '2026-03-22T08:30:00Z',
    slug: 'build-reveal-project-overlander'
  },
  {
    id: 'p3',
    title: 'Mastering the Nürburgring Trip',
    excerpt: 'Towing to Germany? Our ultimate guide to channel crossings, EU towing regulations, and setting up camp in the paddocks.',
    category: 'Track Day Diaries',
    image_url: '',
    published_at: '2026-03-05T14:15:00Z',
    slug: 'mastering-nurburgring-trip'
  },
  {
    id: 'p4',
    title: 'Understanding Payload Ratings',
    excerpt: 'Everything you need to know about B+E licenses, towing capacities, and why an aluminium chassis keeps you within legal limits.',
    category: 'How To Tow',
    image_url: '',
    published_at: '2026-02-18T09:00:00Z',
    slug: 'understanding-payload-ratings'
  }
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    'All', 'Owner Stories', 'Build Reveals', 'Track Day Diaries', 'Overland Adventures', 'How To Tow'
  ];

  useEffect(() => {
    async function loadPosts() {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('No DB');
        
        const { data, error } = await supabase
          .from('journal_posts')
          .select('*')
          .eq('source_site', 'toyhauler')
          .order('published_at', { ascending: false });
          
        if (error) throw error;
        setPosts(data && data.length > 0 ? data : PLACEHOLDER_POSTS);
      } catch (err) {
        setPosts(PLACEHOLDER_POSTS);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="container">
        
        <header className="max-w-3xl mb-16 mt-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">The Journal</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
            Stories from <span className="text-accent-silver">the road.</span>
          </h1>
        </header>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-border pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-colors ${
                activeCategory === cat 
                  ? 'bg-text-primary text-bg' 
                  : 'bg-surface text-text-muted hover:text-text-primary border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center py-20 font-mono text-sm text-text-muted">Loading journal...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                {/* Image Card */}
                <div className="w-full aspect-[16/9] bg-surface border border-border overflow-hidden mb-6 relative">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-text-muted opacity-30">
                      [ COVER IMAGE ]
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-bg border border-border px-3 py-1 font-mono text-accent text-[10px] uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>
                
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
                  <time>{new Date(post.published_at).toLocaleDateString('en-GB')}</time>
                  <span className="w-1 h-1 bg-border rounded-full"></span>
                  <span>5 Min Read</span>
                </div>

                {/* Title & Excerpt */}
                <h2 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-text-muted leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-mono text-text-primary font-medium group-hover:text-accent transition-colors uppercase tracking-widest">
                  Read Article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
