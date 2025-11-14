import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Search, Play, Pause, Music, X } from 'lucide-react';
import { useMusicContext } from '../lib/MusicContext';
import { MusicTrack } from '../lib/useMusic';
import { toast } from 'sonner@2.0.3';

interface MusicSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

export function MusicSelector({ isOpen, onClose, isAuthenticated }: MusicSelectorProps) {
  const { availableTracks, currentTrack, isPlaying, changeTrack, togglePlayPause } = useMusicContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [previewingTrack, setPreviewingTrack] = useState<MusicTrack | null>(null);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);

  // Filter tracks based on search query
  const filteredTracks = availableTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (track.artist && track.artist.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTrackSelect = async (track: MusicTrack) => {
    try {
      stopPreview();
      await changeTrack(track);
      toast.success(`Now playing: ${track.title}`);
      onClose();
    } catch (error) {
      toast.error('Failed to change track');
    }
  };

  const startPreview = (track: MusicTrack) => {
    stopPreview();
    
    const audio = new Audio(track.url);
    audio.volume = 0.3;
    audio.currentTime = 30; // Start 30 seconds in
    audio.play().catch(console.error);
    
    setPreviewAudio(audio);
    setPreviewingTrack(track);

    // Stop preview after 10 seconds
    setTimeout(() => {
      if (audio === previewAudio) {
        stopPreview();
      }
    }, 10000);
  };

  const stopPreview = () => {
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.src = '';
    }
    setPreviewAudio(null);
    setPreviewingTrack(null);
  };

  const handleClose = () => {
    stopPreview();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-card border-border">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-foreground">Choose Music</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Current: {currentTrack?.title || 'None'} {currentTrack?.artist && `by ${currentTrack.artist}`}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1 h-8"
            >
              Search
            </Button>
          </div>

          {/* Track List */}
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredTracks.map((track, index) => {
                const isCurrentTrack = currentTrack?.url === track.url;
                const isPreviewing = previewingTrack?.url === track.url;
                
                return (
                  <Card 
                    key={index}
                    className={`p-4 cursor-pointer transition-colors bg-card border-border hover:bg-accent ${
                      isCurrentTrack ? 'border-primary bg-accent' : ''
                    }`}
                    onClick={() => handleTrackSelect(track)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Track Thumbnail */}
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Music className="h-6 w-6 text-muted-foreground" />
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-medium truncate">
                          {track.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          by {track.artist || 'Various Artist'}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {isCurrentTrack ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlayPause();
                            }}
                            className="bg-background border-border text-foreground hover:bg-accent"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Play
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isPreviewing) {
                                stopPreview();
                              } else {
                                startPreview(track);
                              }
                            }}
                            className="bg-background border-border text-foreground hover:bg-accent"
                          >
                            {isPreviewing ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Stop
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Preview
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>

          {/* Load More Button (placeholder for future expansion) */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-background border-border text-foreground hover:bg-accent"
              disabled
            >
              Load More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}