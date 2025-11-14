# Database Schema Updates

## Profiles Table

The profiles table needs to include a `music_data` column to store user music preferences.

```sql
-- Add music_data column to profiles table
ALTER TABLE profiles ADD COLUMN music_data TEXT;

-- The music_data column will store JSON data with the following structure:
-- {
--   "title": "Track Title",
--   "url": "https://supabase-url/music/track.mp3",
--   "artist": "Artist Name"
-- }
```

## Existing Schema
The profiles table should have these columns:
- id (uuid, primary key)
- email (text)
- username (text, nullable)  
- phone (text, nullable)
- profile_photo_url (text, nullable)
- location (text, nullable)
- is_dark_mode (boolean, nullable)
- background_data (text, nullable) - stores JSON for background preferences
- music_data (text, nullable) - stores JSON for music preferences
- created_at (timestamp)
- updated_at (timestamp)

## Row Level Security (RLS)
Ensure RLS policies are set up to allow users to read/write their own profile data:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own profile
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy for users to update their own profile  
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy for users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
```