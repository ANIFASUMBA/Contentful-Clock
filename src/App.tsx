import React, { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Card, CardContent } from './components/ui/card';
import { supabase } from './lib/supabase';
import { MusicProvider } from './lib/MusicContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [locationRefreshTrigger, setLocationRefreshTrigger] = useState(0);

  // Function to check and apply dark mode preference
  const checkAndApplyDarkMode = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_dark_mode')
        .eq('id', userId)
        .single();
      
      if (profile?.is_dark_mode !== null) {
        const isDarkMode = profile.is_dark_mode;
        
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('darkMode', 'true');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('darkMode', 'false');
        }
      } else {
        // If no preference is set, check localStorage or default to dark mode
        const localDarkMode = localStorage.getItem('darkMode');
        if (localDarkMode === null) {
          // No preference set, default to dark mode
          document.documentElement.classList.add('dark');
          localStorage.setItem('darkMode', 'true');
        } else if (localDarkMode === 'true') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('darkMode', 'false');
        }
      }
    } catch (error) {
      console.error('Error checking dark mode preference:', error);
      // Fallback to localStorage or default to dark mode
      const localDarkMode = localStorage.getItem('darkMode');
      if (localDarkMode === null) {
        // No preference set, default to dark mode
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else if (localDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const isLoggedIn = !!session;
        setIsAuthenticated(isLoggedIn);
        
        // If user is already logged in, check their dark mode preference
        if (isLoggedIn && session?.user) {
          await checkAndApplyDarkMode(session.user.id);
        } else {
          // For guests, check localStorage or default to dark mode
          const localDarkMode = localStorage.getItem('darkMode');
          if (localDarkMode === null) {
            // No preference set, default to dark mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
          } else if (localDarkMode === 'true') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
        // Fallback to localStorage for dark mode or default to dark
        const localDarkMode = localStorage.getItem('darkMode');
        if (localDarkMode === null) {
          // No preference set, default to dark mode
          document.documentElement.classList.add('dark');
          localStorage.setItem('darkMode', 'true');
        } else if (localDarkMode === 'true') {
          document.documentElement.classList.add('dark');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const isLoggedIn = !!session;
        setIsAuthenticated(isLoggedIn);
        setIsLoading(false);
        
        // Close auth screen when user logs in
        if (session) {
          setShowAuth(false);
          // Check and apply dark mode preference for newly authenticated user
          await checkAndApplyDarkMode(session.user.id);
        } else {
          // User logged out - fallback to localStorage or default to dark mode
          const localDarkMode = localStorage.getItem('darkMode');
          if (localDarkMode === null) {
            // No preference set, default to dark mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
          } else if (localDarkMode === 'true') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setShowAuth(false);
      
      // After logout, maintain current dark mode state in localStorage
      // This allows guests to keep their preferred theme
      const currentIsDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('darkMode', currentIsDark ? 'true' : 'false');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleShowAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleLocationRefresh = () => {
    setLocationRefreshTrigger(prev => prev + 1);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <MusicProvider isAuthenticated={isAuthenticated}>
      {showAuth ? (
        <Auth onAuthSuccess={handleAuthSuccess} onBack={handleCloseAuth} initialMode={authMode} />
      ) : (
        <Dashboard 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout} 
          onShowAuth={handleShowAuth}
          locationRefreshTrigger={locationRefreshTrigger}
          onLocationRefresh={handleLocationRefresh}
        />
      )}
    </MusicProvider>
  );
}