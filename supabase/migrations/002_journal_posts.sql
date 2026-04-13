-- Migration: 002_journal_posts.sql
-- Create table for journal/blog posts

create table journal_posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  title text not null,
  slug text unique not null,
  category text not null, -- Build Diary, Delivery Stories, Behind the Build, Industry
  excerpt text,
  body text not null, -- Markdown content
  cover_image_url text,
  published_at timestamptz default now(),
  featured boolean default false
);

-- RLS Policies
alter table journal_posts enable row level security;

-- Allow public read access to all published posts
create policy "Allow public read access"
  on journal_posts
  for select
  using (true);

-- Allow authenticated users (admins) to manage posts
create policy "Allow admin full access"
  on journal_posts
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');
