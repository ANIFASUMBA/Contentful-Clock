import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Search, Image, Video, Play, Check, Loader2 } from 'lucide-react';
import { pexelsService, PexelsPhoto, PexelsVideo } from '../lib/pexels';
import { toast } from 'sonner@2.0.3';

export interface BackgroundSelection {
  type: 'photo' | 'video';
  id: number;
  url: string;
  thumbnail: string;
  photographer: string;
  alt?: string;
}

interface BackgroundSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (background: BackgroundSelection) => void;
  currentBackground?: BackgroundSelection | null;
}

// Function to instantly apply background without saving to database
const applyBackgroundInstantly = (background: BackgroundSelection) => {
  const body = document.body;
  
  if (background.type === 'photo') {
    // Remove any existing video
    const existingVideo = document.querySelector('.background-video');
    if (existingVideo) {
      existingVideo.remove();
    }
    
    // Set custom background image
    body.style.setProperty('--custom-bg-url', `url(${background.url})`);
    body.classList.add('custom-background');
  } else if (background.type === 'video') {
    // Handle video background
    let existingVideo = document.querySelector('.background-video') as HTMLVideoElement;
    
    if (!existingVideo) {
      existingVideo = document.createElement('video');
      existingVideo.className = 'background-video';
      existingVideo.autoplay = true;
      existingVideo.muted = true;
      existingVideo.loop = true;
      existingVideo.playsInline = true;
      document.body.appendChild(existingVideo);
    }
    
    existingVideo.src = background.url;
    body.classList.add('custom-background');
  }
};

export function BackgroundSelector({ 
  isOpen, 
  onClose, 
  onSelect, 
  currentBackground 
}: BackgroundSelectorProps) {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [previewBackground, setPreviewBackground] = useState<BackgroundSelection | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Load initial content when dialog opens
  useEffect(() => {
    if (isOpen) {
      loadInitialContent();
      // Set initial preview to current background
      setPreviewBackground(currentBackground || null);
    }
  }, [isOpen, currentBackground]);

  const loadInitialContent = async () => {
    setIsLoading(true);
    try {
      const [photosResponse, videosResponse] = await Promise.all([
        pexelsService.getCuratedPhotos(1, 20),
        pexelsService.getPopularVideos(1, 20)
      ]);
      
      setPhotos(photosResponse.photos || []);
      setVideos(videosResponse.videos || []);
      setPage(1);
      setHasMore(true);
    } catch (error) {
      console.error('Error loading initial content:', error);
      toast.error('Failed to load backgrounds. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadInitialContent();
      return;
    }

    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      if (activeTab === 'photos') {
        const response = await pexelsService.searchPhotos(query, 1, 20);
        setPhotos(response.photos || []);
      } else {
        const response = await pexelsService.searchVideos(query, 1, 20);
        setVideos(response.videos || []);
      }
      setPage(1);
      setHasMore(true);
    } catch (error) {
      console.error('Error searching:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      let response;
      if (searchQuery) {
        response = activeTab === 'photos' 
          ? await pexelsService.searchPhotos(searchQuery, nextPage, 20)
          : await pexelsService.searchVideos(searchQuery, nextPage, 20);
      } else {
        response = activeTab === 'photos'
          ? await pexelsService.getCuratedPhotos(nextPage, 20)
          : await pexelsService.getPopularVideos(nextPage, 20);
      }

      const newItems = activeTab === 'photos' ? response.photos || [] : response.videos || [];
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        if (activeTab === 'photos') {
          setPhotos(prev => [...prev, ...newItems as PexelsPhoto[]]);
        } else {
          setVideos(prev => [...prev, ...newItems as PexelsVideo[]]);
        }
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more:', error);
      toast.error('Failed to load more items.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoSelect = (photo: PexelsPhoto) => {
    const selection: BackgroundSelection = {
      type: 'photo',
      id: photo.id,
      url: photo.src.large2x,
      thumbnail: photo.src.medium,
      photographer: photo.photographer,
      alt: photo.alt
    };
    
    // Instantly apply background for preview
    applyBackgroundInstantly(selection);
    setPreviewBackground(selection);
    
    // Show preview feedback
    toast.success(`Previewing ${selection.photographer}'s photo`);
  };

  const handleVideoSelect = (video: PexelsVideo) => {
    const selection: BackgroundSelection = {
      type: 'video',
      id: video.id,
      url: pexelsService.getBestVideoFile(video),
      thumbnail: video.image,
      photographer: video.user.name,
      alt: `Video by ${video.user.name}`
    };
    
    // Instantly apply background for preview
    applyBackgroundInstantly(selection);
    setPreviewBackground(selection);
    
    // Show preview feedback
    toast.success(`Previewing ${selection.photographer}'s video`);
  };

  const handleApplyBackground = async () => {
    if (!previewBackground) return;
    
    setIsApplying(true);
    
    try {
      // Call onSelect to save to database
      onSelect(previewBackground);
      
      // Show success feedback
      toast.success(`Background applied by ${previewBackground.photographer}`);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error applying background:', error);
      toast.error('Failed to apply background');
    } finally {
      setIsApplying(false);
    }
  };

  const isCurrentlySelected = (type: 'photo' | 'video', id: number) => {
    return previewBackground?.type === type && previewBackground?.id === id;
  };

  // Check if there's a new background being previewed
  const hasNewPreview = previewBackground && 
    (!currentBackground || 
     previewBackground.id !== currentBackground.id || 
     previewBackground.type !== currentBackground.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Choose Background</DialogTitle>
          {previewBackground && (
            <p className="text-sm text-muted-foreground">
              {hasNewPreview ? 'Previewing' : 'Current'}: {previewBackground.type} by {previewBackground.photographer}
            </p>
          )}
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Search Bar */}
          <div className="mb-4 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="pl-10"
              />
              <Button
                size="sm"
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Segmented Control - styled like Profile component */}
          <div className="mb-4 flex-shrink-0">
            <div className="flex bg-muted rounded-lg p-1 w-full">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'photos'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Image className="h-4 w-4" />
                Photos
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'videos'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Video className="h-4 w-4" />
                Videos
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'photos' && (
              <ScrollArea className="h-full w-full">
                <div className="grid grid-cols-4 gap-3 pr-[16px] pb-[0px] pt-[0px] pl-[0px]">
                  {photos.map((photo) => (
                    <Card
                      key={photo.id}
                      className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary relative overflow-hidden ${
                        isCurrentlySelected('photo', photo.id) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handlePhotoSelect(photo)}
                    >
                      <div className="aspect-square relative w-full">
                        <img
                          src={photo.src.small}
                          alt={photo.alt}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isCurrentlySelected('photo', photo.id) && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <Badge variant="secondary" className="text-xs truncate max-w-full">
                            by {photo.photographer}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {hasMore && !isLoading && (
                  <div className="text-center py-4 pr-4 pb-20">
                    <Button variant="outline" onClick={loadMore} className="w-full">
                      Load More
                    </Button>
                  </div>
                )}
              </ScrollArea>
            )}

            {activeTab === 'videos' && (
              <ScrollArea className="h-full w-full">
                <div className="grid grid-cols-4 gap-3 pr-[16px] pb-[0px] pt-[0px] pl-[0px]">
                  {videos.map((video) => (
                    <Card
                      key={video.id}
                      className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary relative overflow-hidden ${
                        isCurrentlySelected('video', video.id) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <div className="aspect-square relative w-full">
                        <img
                          src={video.image}
                          alt={`Video by ${video.user.name}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 text-white rounded-full p-2">
                            <Play className="h-4 w-4" />
                          </div>
                        </div>
                        {isCurrentlySelected('video', video.id) && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <Badge variant="secondary" className="text-xs truncate max-w-full">
                            by {video.user.name}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {hasMore && !isLoading && (
                  <div className="text-center py-4 pr-4 pb-20">
                    <Button variant="outline" onClick={loadMore} className="w-full">
                      Load More
                    </Button>
                  </div>
                )}
              </ScrollArea>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex items-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span className="text-muted-foreground">Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Apply Button - Only show when there's a new preview */}
        {hasNewPreview && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
            <Button 
              onClick={handleApplyBackground}
              disabled={isApplying}
              className="w-full bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-lg"
              size="lg"
            >
              {isApplying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Applying...
                </>
              ) : (
                'Apply new background'
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}