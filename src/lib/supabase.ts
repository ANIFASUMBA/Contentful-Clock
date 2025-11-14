import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wvpzkrdxmziiqamdpfpe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cHprcmR4bXppaXFhbWRwZnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwODU3NjgsImV4cCI6MjA2NDY2MTc2OH0.6PX4DyP2cW3WRd1iztF1FZKFuAWGTYLbQaqBdU8sYJk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Database types for TypeScript
export interface Profile {
  id: string;
  username?: string;
  display_name?: string;
  phone?: string;
  profile_photo_url?: string;
  is_pro: boolean;
  created_at: string;
  updated_at: string;
}