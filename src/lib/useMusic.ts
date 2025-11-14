import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';

const GUEST_STORAGE_KEY = 'contentful-clock-music';
const GUEST_VOLUME_KEY = 'contentful-clock-volume';

export interface MusicTrack {
  title: string;
  url: string;
  artist?: string;
}

// Global shuffle system variables
const AllTracks: string[] = [
  'better-day-186374.mp3',
  'chilling-caves-lo-fi-beats-music-302313.mp3',
  'chilling-country-lo-fi-beats-music-303899.mp3',
  'good-night-lofi-cozy-chill-music-160166.mp3',
  'lo-fi-chill-beat-frosty-shadow-of-winter-136165.mp3',
  'lofi-chill-beat-lo-fi-postcard-366049.mp3',
  'lofi-chill-smooth-chill-lofi-for-vlogs-and-background-music-159456.mp3',
  'lofi-study-calm-peaceful-chill-hop-112191.mp3',
  'lost-in-dreams-abstract-chill-downtempo-cinematic-future-beats-270241.mp3',
  'under-the-store-lo-fi-beats-music-303917.mp3'
];

// Shuffle AllTracks into ShuffledTracks on app start
let ShuffledTracks: string[] = [...AllTracks].sort(() => Math.random() - 0.5);

// Global state variables
let TrackIndex = 0;
let CurrentTrack: string | null = null;
let PlayNext = false;

// Available music tracks from Supabase
const AVAILABLE_TRACKS: MusicTrack[] = [
  {
    title: "Better Day",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/better-day-186374.mp3",
    artist: "Various Artist"
  },
  {
    title: "Chilling Caves",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/chilling-caves-lo-fi-beats-music-302313.mp3",
    artist: "Various Artist"
  },
  {
    title: "Chilling Country",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/chilling-country-lo-fi-beats-music-303899.mp3",
    artist: "Various Artist"
  },
  {
    title: "Good Night Lofi",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/good-night-lofi-cozy-chill-music-160166.mp3",
    artist: "Various Artist"
  },
  {
    title: "Frosty Shadow of Winter",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/lo-fi-chill-beat-frosty-shadow-of-winter-136165.mp3",
    artist: "Various Artist"
  },
  {
    title: "Lofi Postcard",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/lofi-chill-beat-lo-fi-postcard-366049.mp3",
    artist: "Various Artist"
  },
  {
    title: "Smooth Lofi for Vlogs",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/lofi-chill-smooth-chill-lofi-for-vlogs-and-background-music-159456.mp3",
    artist: "Various Artist"
  },
  {
    title: "Study Calm",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/lofi-study-calm-peaceful-chill-hop-112191.mp3",
    artist: "Various Artist"
  },
  {
    title: "Lost in Dreams",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/lost-in-dreams-abstract-chill-downtempo-cinematic-future-beats-270241.mp3",
    artist: "Various Artist"
  },
  {
    title: "Under the Store",
    url: "https://wvpzkrdxmziiqamdpfpe.supabase.co/storage/v1/object/public/music/under-the-store-lo-fi-beats-music-303917.mp3",
    artist: "Various Artist"
  }
];

// Function to get a random track for shuffling
const getRandomTrack = () => {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_TRACKS.length);
  return AVAILABLE_TRACKS[randomIndex];
};

// Default music track - randomly shuffled each time
const DEFAULT_TRACK = getRandomTrack();

export function useMusic(isAuthenticated: boolean) {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(getRandomTrack());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.15); // Default to 15% volume

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = false;

    const audio = audioRef.current;

    const handleEnded = () => {
      nextTrack();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      console.error('Audio playback error:', audio.error);
      setIsPlaying(false);
      
      // If there's a network error, try the next track
      if (audio.error && (audio.error.code === 2 || audio.error.code === 4)) {
        console.log('Network error detected, skipping to next track...');
        setTimeout(() => nextTrack(), 1000);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);



  // Apply volume to audio element whenever it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Load saved music preference and volume
  useEffect(() => {
    const loadMusic = async () => {
      try {
        // Use localStorage for both authenticated and unauthenticated users
        const savedMusic = localStorage.getItem(GUEST_STORAGE_KEY);
        const savedVolume = localStorage.getItem(GUEST_VOLUME_KEY);
        
        if (savedMusic) {
          setCurrentTrack(JSON.parse(savedMusic));
        } else {
          setCurrentTrack(getRandomTrack());
        }
        
        if (savedVolume) {
          setVolume(parseFloat(savedVolume));
        }
      } catch (error) {
        console.error('Error loading music:', error);
        setCurrentTrack(getRandomTrack());
      } finally {
        setIsLoading(false);
      }
    };

    loadMusic();
  }, [isAuthenticated]);

  // Update audio source when track changes (but don't auto-play)
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      // Only update if not currently playing to avoid interrupting playback
      if (audioRef.current.paused) {
        audioRef.current.src = currentTrack.url;
        audioRef.current.volume = volume;
      }
    }
  }, [currentTrack, volume]);

  // Apply initial volume when audio element and volume are both ready
  useEffect(() => {
    if (audioRef.current && !isLoading) {
      audioRef.current.volume = volume;
    }
  }, [isLoading, volume]);



  const saveMusic = async (track: MusicTrack | null) => {
    try {
      // Use localStorage for both authenticated and unauthenticated users
      if (track) {
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(track));
      } else {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      }

      setCurrentTrack(track);
    } catch (error) {
      console.error('Error saving music:', error);
      throw error;
    }
  };

  const saveVolume = async (newVolume: number) => {
    try {
      // Use localStorage for both authenticated and unauthenticated users
      localStorage.setItem(GUEST_VOLUME_KEY, newVolume.toString());
    } catch (error) {
      console.error('Error saving volume:', error);
    }
  };

  const play = async () => {
    if (audioRef.current && currentTrack) {
      try {
        audioRef.current.src = currentTrack.url;
        audioRef.current.volume = volume;
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const changeTrack = async (track: MusicTrack) => {
    await saveMusic(track);
  };

  const clearMusic = async () => {
    pause();
    const randomTrack = getRandomTrack();
    setCurrentTrack(randomTrack);
    await saveMusic(randomTrack);
  };

  const changeVolume = async (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    await saveVolume(clampedVolume);
  };

  const previousTrack = async () => {
    // Move to previous track in shuffled order
    if (TrackIndex > 0) {
      TrackIndex--;
    } else {
      TrackIndex = ShuffledTracks.length - 1;
    }
    
    const wasPlaying = isPlaying;
    
    // Pause current audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Find and set the new track
    CurrentTrack = ShuffledTracks[TrackIndex];
    const trackToPlay = AVAILABLE_TRACKS.find(track => track.url.includes(CurrentTrack!));
    
    if (trackToPlay && audioRef.current) {
      setCurrentTrack(trackToPlay);
      audioRef.current.src = trackToPlay.url;
      audioRef.current.volume = volume;
      
      // If music was playing, continue playing the new track
      if (wasPlaying) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Error playing previous track:', error);
        }
      }
    }
  };

  const nextTrack = async () => {
    // Move to next track in shuffled order
    TrackIndex++;
    
    // If we've reached the end, reshuffle and start over
    if (TrackIndex >= ShuffledTracks.length) {
      ShuffledTracks = [...AllTracks].sort(() => Math.random() - 0.5);
      TrackIndex = 0;
    }
    
    const wasPlaying = isPlaying;
    
    // Pause current audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Find and set the new track
    CurrentTrack = ShuffledTracks[TrackIndex];
    const trackToPlay = AVAILABLE_TRACKS.find(track => track.url.includes(CurrentTrack!));
    
    if (trackToPlay && audioRef.current) {
      setCurrentTrack(trackToPlay);
      audioRef.current.src = trackToPlay.url;
      audioRef.current.volume = volume;
      
      // If music was playing, continue playing the new track
      if (wasPlaying) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Error playing next track:', error);
        }
      }
    }
  };

  return {
    currentTrack,
    isPlaying,
    isLoading,
    volume,
    availableTracks: AVAILABLE_TRACKS,
    play,
    pause,
    togglePlayPause,
    changeTrack,
    clearMusic,
    saveMusic,
    changeVolume,
    previousTrack,
    nextTrack
  };
}