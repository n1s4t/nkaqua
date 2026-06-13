-- Run this in your Supabase SQL Editor to fix image upload RLS
-- This sets up the storage bucket and allows uploads

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================

-- Create the "products" storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880,  -- 5MB limit
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg'
  ];

-- ============================================
-- STORAGE RLS POLICIES (allow public uploads)
-- ============================================

-- Enable RLS on objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- Allow anyone to SELECT (view) files from products bucket
CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

-- Allow anyone to INSERT (upload) files to products bucket
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products');

-- Allow anyone to UPDATE files in products bucket
CREATE POLICY "Allow public updates" ON storage.objects
  FOR UPDATE USING (bucket_id = 'products');

-- Allow anyone to DELETE files from products bucket
CREATE POLICY "Allow public deletes" ON storage.objects
  FOR DELETE USING (bucket_id = 'products');

-- ============================================
-- PRODUCTS TABLE RLS (ensure insert works)
-- ============================================

-- Make sure RLS is enabled
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to ensure they exist
DROP POLICY IF EXISTS "Allow public read access" ON public.products;
DROP POLICY IF EXISTS "Allow public insert" ON public.products;
DROP POLICY IF EXISTS "Allow public update" ON public.products;
DROP POLICY IF EXISTS "Allow public delete" ON public.products;

CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON public.products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.products
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON public.products
  FOR DELETE USING (true);
