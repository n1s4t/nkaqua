-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/atdghbqfiiqxtcgrnbns/sql)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  category TEXT,
  subcategory TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all reads (public access)
CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT USING (true);

-- Create policy to allow all inserts (for admin)
CREATE POLICY "Allow public insert" ON public.products
  FOR INSERT WITH CHECK (true);

-- Create policy to allow all updates (for admin)
CREATE POLICY "Allow public update" ON public.products
  FOR UPDATE USING (true);

-- Create policy to allow all deletes (for admin)
CREATE POLICY "Allow public delete" ON public.products
  FOR DELETE USING (true);
