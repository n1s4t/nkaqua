-- Run this in your Supabase SQL Editor to fix the RLS error
-- This disables RLS on the products table (your admin page already has password protection)

ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Also create the storage bucket for images if you haven't already:
-- Go to Storage → New bucket → name: "products" → turn OFF "Restrict public access"
