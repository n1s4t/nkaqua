-- NUCLEAR FIX: Run this in Supabase SQL Editor if uploads still fail
-- This completely disables RLS on storage so uploads work immediately

-- 1. Create the products bucket as PUBLIC
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Disable RLS on storage.objects (allows all uploads without policies)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 3. Make sure products table allows inserts too
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
