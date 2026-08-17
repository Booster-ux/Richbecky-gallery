import { createClient } from '@supabase/supabase-js';

const meta = import.meta as any;
const supabaseUrl = meta.env?.VITE_SUPABASE_URL || 'https://qsgdjgugapehrpionvbl.supabase.co';
const supabaseAnonKey = meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZ2RqZ3VnYXBlaHJwaW9udmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjM4NzYsImV4cCI6MjEwMjUzOTg3Nn0.UeCfttwnvXCxIhPmcgciXDiF_T8ZMvXcUv85i5dRf08';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
