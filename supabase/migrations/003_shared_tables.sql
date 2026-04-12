-- Create shared tables for the JPC Trailers ecosystem

-- 1. Gallery Images (Shared between all sites)
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    caption TEXT,
    build_number TEXT,
    category TEXT, -- e.g. 'Motorsport', 'Commercial', 'Luxury'
    source_site TEXT NOT NULL, -- 'jpc', 'toyhauler', 'both'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Journal Posts (Shared with site discriminator)
CREATE TABLE IF NOT EXISTS public.journal_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content_html TEXT,
    category TEXT,
    image_url TEXT,
    source_site TEXT NOT NULL, -- 'jpc', 'toyhauler', 'both'
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Saved Configurations
CREATE TABLE IF NOT EXISTS public.saved_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_ref TEXT UNIQUE NOT NULL,
    base_model TEXT NOT NULL,
    config_data JSONB NOT NULL,
    source_domain TEXT NOT NULL, -- e.g. 'toyhauler.co.uk'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Commissions (Lead Capture)
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    source_site TEXT NOT NULL,
    config_ref TEXT REFERENCES public.saved_configs(config_ref),
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Basic public read, service role write)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.journal_posts FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.saved_configs FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.saved_configs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read" ON public.commissions FOR INSERT WITH CHECK (true);
