import React, { createContext, useContext, ReactNode } from 'react';
import { useMusic } from './useMusic';

interface MusicContextType {
  currentTrack: any;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  availableTracks: any[];
  play: () => Promise<void>;
  pause: () => void;
  togglePlayPause: () => void;
  changeTrack: (track: any) => Promise<void>;
  clearMusic: () => Promise<void>;
  saveMusic: (track: any) => Promise<void>;
  changeVolume: (volume: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

export function MusicProvider({ children, isAuthenticated }: MusicProviderProps) {
  const musicState = useMusic(isAuthenticated);

  return (
    <MusicContext.Provider value={musicState}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
}