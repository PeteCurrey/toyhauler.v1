'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Category = 'All' | 'Track Day' | 'Multi-Moto' | 'Overland' | 'Details';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  build_number: string;
  category: string;
}

const PLACEHOLDER_IMAGES = Array.from({ length: 12 }).map((_, i) => ({
  id: `placeholder-${i}`,
  url: '',
  caption: `Client Commission // Spec 0${i + 1}`,
  build_number: `TH-${1000 + i}`,
  category: ['Track Day', 'Multi-Moto', 'Overland', 'Details'][i % 4],
}));

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = ['All', 'Track Day', 'Multi-Moto', 'Overland', 'Details'];

  useEffect(() => {
    async function loadImages() {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          throw new Error('Supabase not configured');
        }
        
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setImages(data && data.length > 0 ? data : PLACEHOLDER_IMAGES);
      } catch (err) {
        // Fallback to placeholders if no DB connection
        setImages(PLACEHOLDER_IMAGES);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="container">
        
        <header className="max-w-3xl mb-16 mt-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
            Aluminium <span className="text-accent-silver">in the wild.</span>
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

        {/* Masonry Grid */}
        {loading ? (
          <div className="flex justify-center py-20 font-mono text-sm text-text-muted">Loading gallery...</div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img) => (
              <div 
                key={img.id} 
                className="relative break-inside-avoid bg-surface border border-border overflow-hidden group min-h-[300px] flex items-center justify-center cursor-pointer"
                style={{ height: `${200 + (Math.random() * 200)}px` }} // simulate varying masonry heights
              >
                {img.url ? (
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="font-mono text-xs text-text-muted opacity-30">[ IMAGE ]</div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="font-mono text-accent text-xs mb-2 tracking-widest">{img.build_number}</p>
                  <p className="text-text-primary font-medium">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
