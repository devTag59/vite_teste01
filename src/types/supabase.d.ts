// src/types/supabase.d.ts
declare module '@supabase/supabase-js' {
  export function createClient(url: string, key: string): any
}
declare module '../lib/supabase' {
  export * from './supabase';
}