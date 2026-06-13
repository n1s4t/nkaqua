-- ============================================================
-- COMPLETE UPLOAD FIX FOR NKAQUA
-- Run this ENTIRE file in your Supabase SQL Editor
-- ============================================================

-- 1. CREATE STORAGE BUCKET (if missing)
-- The bucket MUST exist and be public for uploads to work
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg','image/png','image/webp','image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg','image/png','image/webp','image/jpg'];

-- 2. DISABLE RLS ON STORAGE (nuclear option - allows ALL uploads)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 3. DISABLE RLS ON PRODUCTS TABLE (nuclear option - allows ALL inserts/updates/deletes)
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- 4. ENSURE PRODUCTS TABLE EXISTS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- 5. ADD CATEGORY/SUBCATEGORY COLUMNS (if table exists but columns are missing)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'category') THEN
    ALTER TABLE public.products ADD COLUMN category TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'subcategory') THEN
    ALTER TABLE public.products ADD COLUMN subcategory TEXT;
  END IF;
END $$;
