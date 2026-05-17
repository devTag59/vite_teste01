import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gcycdpkudqsjpnixeeoi.supabase.co' // Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjeWNkcGt1ZHFzanBuaXhlZW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5OTExOTIsImV4cCI6MjA5MzU2NzE5Mn0.-uOhNzs3I4IHg3g3Nby0w-Iv6tUAovGQfnKwT2PViOE' // anon public key

export const supabase = createClient(supabaseUrl, supabaseKey)