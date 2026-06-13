import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://atdghbqfiiqxtcgrnbns.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0ZGdoYnFmZmllxHRjZ3JuYm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MDI4MDAsImV4cCI6MjA2NDE3ODgwMH0.fEaO";

export const supabase = createClient(supabaseUrl, supabaseKey);
