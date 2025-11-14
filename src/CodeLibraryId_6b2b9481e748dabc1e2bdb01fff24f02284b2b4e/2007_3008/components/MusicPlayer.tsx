import React from 'react';
import { Button } from './ui/button';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { useMusic } from '../lib/useMusic';

interface MusicPlayerProps {
  isAuthenticated: boolean;
  onOpenSelector: () => void;
}

export function MusicPlayer({ isAuthenticated, onOpenSelector }: MusicPlayerProps) {
  const { currentTrack, isPlaying, togglePlayPause, availableTracks, changeTrack } = useMusic(isAuthenticated);

  const currentIndex = availableTracks.findIndex(track => track.url === currentTrack?.url);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      changeTrack(availableTracks[currentIndex - 1]);
    } else {
      changeTrack(availableTracks[availableTracks.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < availableTracks.length - 1) {
      changeTrack(availableTracks[currentIndex + 1]);
    } else {
      changeTrack(availableTracks[0]);
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="absolute bottom-32 sm:bottom-24 left-1/2 translate-x-[-50%] z-20">
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl shadow-lg min-w-[320px]">
        <div className="p-4">
          <div className="flex items-center gap-4">
            {/* Track Thumbnail */}
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
              <Music className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <button
                onClick={onOpenSelector}
                className="text-left hover:opacity-80 transition-opacity w-full"
              >
                <h3 className="font-medium truncate text-sm">
                  {currentTrack.title}
                </h3>
                <p className="text-muted-foreground text-xs">
                  by {currentTrack.artist || 'Various Artist'}
                </p>
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={handlePrevious}
                className="w-8 h-8 p-0"
              >
                <SkipBack className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={togglePlayPause}
                className="w-8 h-8 p-0"
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleNext}
                className="w-8 h-8 p-0"
              >
                <SkipForward className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}