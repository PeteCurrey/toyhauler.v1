-- Migration: 001_commission_requests.sql
-- Create table for commission form submissions

create table commission_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  phone text,
  trailer_type text not null,
  budget_range text,
  use_case text,
  status text default 'NEW'
);

-- RLS Policies
alter table commission_requests enable row level security;

-- Allow public to insert (submit form)
create policy "Allow public insert"
  on commission_requests
  for insert
  with check (true);

-- Allow authenticated users (admin) to read/update
create policy "Allow admin access"
  on commission_requests
  using (auth.role() = 'authenticated');
