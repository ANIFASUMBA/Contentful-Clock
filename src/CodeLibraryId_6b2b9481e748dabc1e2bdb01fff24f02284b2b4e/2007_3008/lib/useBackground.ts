import image_c7b1d429bad0788dc088c8b273d027295c8f7551 from 'figma:asset/c7b1d429bad0788dc088c8b273d027295c8f7551.png';
import image_5cd04da34f059e253b4e8d30b0c60e2b88a3f607 from 'figma:asset/5cd04da34f059e253b4e8d30b0c60e2b88a3f607.png';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { BackgroundSelection } from '../components/BackgroundSelector';

const GUEST_STORAGE_KEY = 'contentful-clock-background';
const GUEST_DEFAULT_KEY = 'contentful-clock-background-default';

// Default video background for authenticated users
const DEFAULT_BACKGROUND_AUTHENTICATED: BackgroundSelection = {
  type: 'video',
  url: 'https://videos.pexels.com/video-files/5419256/5419256-hd_1920_1080_25fps.mp4',
  thumbnail: image_c7b1d429bad0788dc088c8b273d027295c8f7551,
  photographer: 'Anthony DeRosa',
  alt: 'Mountain landscape time-lapse video'
};

// Default video background for unauthenticated users
const DEFAULT_BACKGROUND_UNAUTHENTICATED: BackgroundSelection = {
  type: 'video',
  url: 'https://videos.pexels.com/video-files/8820216/8820216-hd_1920_1080_25fps.mp4',
  thumbnail: image_5cd04da34f059e253b4e8d30b0c60e2b88a3f607,
  photographer: 'Pexels',
  alt: 'Default video background'
};

export function useBackground(isAuthenticated: boolean) {
  const getSystemDefault = () => isAuthenticated ? DEFAULT_BACKGROUND_AUTHENTICATED : DEFAULT_BACKGROUND_UNAUTHENTICATED;
  const [background, setBackground] = useState<BackgroundSelection | null>(getSystemDefault());
  const [userDefault, setUserDefault] = useState<BackgroundSelection | null>(getSystemDefault());
  const [isLoading, setIsLoading] = useState(true);

  // Get user's personal default background
  const getUserDefault = async (): Promise<BackgroundSelection> => {
    try {
      if (isAuthenticated) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('background_data')
            .eq('id', user.id)
            .single();
          
          if (profile?.background_data) {
            const savedBackground = JSON.parse(profile.background_data);
            return savedBackground;
          }
        }
      } else {
        const stored = localStorage.getItem(GUEST_DEFAULT_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (error) {
      console.error('Error getting user default:', error);
    }
    return getSystemDefault();
  };

  // Save user's personal default background
  const saveUserDefault = async (newDefault: BackgroundSelection) => {
    try {
      if (isAuthenticated) {
        // For authenticated users, we don't need separate default storage
        // as their current background becomes their default
      } else {
        localStorage.setItem(GUEST_DEFAULT_KEY, JSON.stringify(newDefault));
      }
      setUserDefault(newDefault);
    } catch (error) {
      console.error('Error saving user default:', error);
    }
  };

  // Load background and user default on component mount and when authentication state changes
  useEffect(() => {
    loadBackground();
  }, [isAuthenticated]);

  // Update default background when authentication state changes
  useEffect(() => {
    if (background === DEFAULT_BACKGROUND_AUTHENTICATED || background === DEFAULT_BACKGROUND_UNAUTHENTICATED) {
      setBackground(getSystemDefault());
    }
  }, [isAuthenticated]);

  const loadBackground = async () => {
    setIsLoading(true);
    
    try {
      // Load user's personal default first
      const defaultBg = await getUserDefault();
      setUserDefault(defaultBg);

      if (isAuthenticated) {
        // Load from user profile
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('background_data')
            .eq('id', user.id)
            .single();
          
          if (profile?.background_data) {
            setBackground(JSON.parse(profile.background_data));
          } else {
            setBackground(defaultBg);
          }
        }
      } else {
        // Load from localStorage for guests
        const stored = localStorage.getItem(GUEST_STORAGE_KEY);
        if (stored) {
          try {
            setBackground(JSON.parse(stored));
          } catch (error) {
            console.error('Error parsing stored background:', error);
            localStorage.removeItem(GUEST_STORAGE_KEY);
            setBackground(defaultBg);
          }
        } else {
          setBackground(defaultBg);
        }
      }
    } catch (error) {
      console.error('Error loading background:', error);
      setBackground(getSystemDefault());
    } finally {
      setIsLoading(false);
    }
  };

  const saveBackground = async (newBackground: BackgroundSelection | null) => {
    try {
      if (isAuthenticated) {
        // Save to user profile
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              background_data: newBackground ? JSON.stringify(newBackground) : null,
              updated_at: new Date().toISOString()
            });
          
          if (error) throw error;
        }
      } else {
        // Save to localStorage for guests
        if (newBackground) {
          localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(newBackground));
        } else {
          localStorage.removeItem(GUEST_STORAGE_KEY);
        }
      }
      
      // If user is selecting a new background (not clearing), make it their default
      if (newBackground) {
        await saveUserDefault(newBackground);
      }
      
      setBackground(newBackground);
      return true;
    } catch (error) {
      console.error('Error saving background:', error);
      return false;
    }
  };

  const clearBackground = () => {
    saveBackground(userDefault);
  };

  return {
    background,
    isLoading,
    saveBackground,
    clearBackground,
    refreshBackground: loadBackground
  };
}