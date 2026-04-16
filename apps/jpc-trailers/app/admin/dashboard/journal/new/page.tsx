'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function NewJournalPost() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Build Diary',
    excerpt: '',
    content_html: '',
    image_url: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({ 
        ...prev, 
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('journal_posts').insert([
        {
          ...formData,
          source_site: 'jpc', // Set source to JPC specifically
          published_at: new Date().toISOString()
        }
      ])

      if (error) throw error

      router.push('/admin/dashboard/journal')
    } catch (error: any) {
      console.error('Error creating post:', error)
      alert(error.message || 'Failed to create post')
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] p-6 lg:p-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="mb-12">
          <Link href="/admin/dashboard/journal" className="text-[#888] font-mono text-xs hover:text-white transition-colors mb-8 inline-block uppercase tracking-widest">
            ← Back to Journal Manager
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-[#1E1E1E]">
            <div>
              <SectionLabel index="NEW POST" label="PUBLISHING TERMINAL" className="mb-4" />
              <h1 className="text-3xl font-extrabold text-[#F0F0F0] font-syne uppercase">Create Article</h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Editor Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0D0D0D] border border-[#1E1E1E] p-8 space-y-6">
                <div>
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-2">Post Title</label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-[#222] p-4 text-[#F0F0F0] font-syne text-xl outline-none focus:border-[#E8500A] transition-colors"
                    placeholder="E.g. Engineering the Perfect Toy Hauler"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-2">Content (Markdown)</label>
                  <div className="bg-[#111] border border-[#222]">
                    <div className="border-b border-[#222] p-2 flex gap-4 bg-[#0A0A0A]">
                      <span className="text-[10px] text-[#666] font-mono uppercase px-2 py-1 bg-[#222]">Write</span>
                      <span className="text-[10px] text-[#444] font-mono uppercase px-2 py-1">Preview</span>
                    </div>
                    <textarea
                      required
                      name="content_html"
                      value={formData.content_html}
                      onChange={handleChange}
                      rows={20}
                      className="w-full bg-transparent p-4 text-[#CCC] font-mono text-sm outline-none focus:border-[#E8500A] transition-colors resize-y custom-scrollbar"
                      placeholder="Write your content here using Markdown formatting...
                      
## Section Header
- Bullet point
- Bullet point

**Bold text** and *italic* text."
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-2">Post Excerpt</label>
                  <textarea
                    required
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#111] border border-[#222] p-4 text-[#CCC] font-mono text-sm outline-none focus:border-[#E8500A] transition-colors resize-none"
                    placeholder="A short, compelling summary of the article for the main journal grid..."
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Metadata */}
            <div className="space-y-6">
              <div className="bg-[#0D0D0D] border border-[#1E1E1E] p-6 space-y-6">
                <div>
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-2">URL Slug</label>
                  <input
                    required
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-[#222] p-3 text-[#AAA] font-mono text-xs outline-none focus:border-[#E8500A] transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-[#222] p-3 text-[#AAA] font-mono text-xs outline-none focus:border-[#E8500A] uppercase transition-colors"
                  >
                    <option value="Build Diary">Build Diary</option>
                    <option value="Delivery Stories">Delivery Stories</option>
                    <option value="Behind the Build">Behind the Build</option>
                    <option value="Industry">Industry</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest block mb-2">Cover Image URL</label>
                  <input
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="/images/journal/post-1.jpg"
                    className="w-full bg-[#111] border border-[#222] p-3 text-[#AAA] font-mono text-xs outline-none focus:border-[#E8500A] transition-colors"
                  />
                  {formData.image_url && (
                    <div className="mt-4 aspect-video bg-[#111] border border-[#222] overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.image_url} alt="Cover preview" className="object-cover w-full h-full opacity-80" />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#111] border border-[#1E1E1E] p-6 space-y-4">
                <span className="font-mono text-[10px] text-[#444] uppercase tracking-widest block">Publishing</span>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-[#E8500A] text-white hover:bg-white hover:text-black transition-colors border-none"
                >
                  {isSubmitting ? 'PUBLISHING...' : 'PUBLISH ARTICLE'}
                </Button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </main>
  )
}
