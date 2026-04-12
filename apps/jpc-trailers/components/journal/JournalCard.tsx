'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface JournalPost {
  title: string
  slug: string
  category: string
  excerpt: string
  cover_image_url: string
  published_at: string
}

export default function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -5 }}
        className="relative overflow-hidden bg-[#111111] border border-[#1E1E1E] transition-all duration-500 group-hover:border-[#E8500A]"
      >
        {/* Cover Image Placeholder */}
        <div className="aspect-[16/10] overflow-hidden bg-[#080808]">
          <div
            className="w-full h-full bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${post.cover_image_url || '/images/placeholder-journal.jpg'})` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span
              className="text-[10px] uppercase tracking-widest text-[#6A6A6A]"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              // {post.category.toUpperCase()}
            </span>
            <span
              className="text-[10px] text-[#444444]"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {new Date(post.published_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
              })}
            </span>
          </div>

          <h3
            className="text-xl font-bold uppercase mb-3 leading-tight group-hover:text-[#F0F0F0] transition-colors"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {post.title}
          </h3>

          <p className="text-sm text-[#888888] line-clamp-2 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-widest text-[#E8500A] font-bold"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              Read Article
            </span>
            <span className="w-8 h-[1px] bg-[#E8500A] transition-all duration-300 group-hover:w-12" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
