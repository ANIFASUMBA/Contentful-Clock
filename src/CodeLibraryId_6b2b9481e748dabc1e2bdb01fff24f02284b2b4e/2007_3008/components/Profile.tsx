import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { ArrowLeft, User, MapPin, Moon, Sun, Edit2, Upload, X, Camera, Image, Trash2, LogIn, UserPlus, Music, Search, Navigation, Loader2, AlertCircle, Thermometer } from 'lucide-react';
import { LocationSelector } from './LocationSelector';
import { BackgroundSelector, BackgroundSelection } from './BackgroundSelector';
import { MusicSelector } from './MusicSelector';
import { useBackground } from '../lib/useBackground';
import { useMusicContext } from '../lib/MusicContext';
import Frame1 from '../imports/Frame1';
import svgPaths from '../imports/svg-gb2wprxdte';
import playIconPaths from '../imports/svg-tj5j19xf7j';
import volumeIconPaths from '../imports/svg-x788y0ihop';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner@2.0.3';

interface WeatherAPICity {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

const WEATHER_API_KEY = 'b93e335c0d074c2ca9874431250506';

interface ProfileProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onBack: () => void;
  onShowAuth: (mode?: 'login' | 'signup') => void;
}

export function Profile({ isAuthenticated, onLogout, onBack, onShowAuth }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'background' | 'music' | 'location' | 'profile'>('background');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [guestLocation, setGuestLocation] = useState('');

  // Location selector states (integrated into location tab)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [useFahrenheit, setUseFahrenheit] = useState(true);
  const [originalUseFahrenheit, setOriginalUseFahrenheit] = useState(true);
  const [hasLocationChanged, setHasLocationChanged] = useState(false);
  const [hasTemperatureChanged, setHasTemperatureChanged] = useState(false);

  // Form states
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  
  // Profile photo states
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>('');
  const [currentProfilePhotoUrl, setCurrentProfilePhotoUrl] = useState<string>('');

  // Background management - now works for both authenticated and guest users
  const { background, saveBackground, clearBackground } = useBackground(isAuthenticated);

  // Music management - now works for both authenticated and guest users
  const { currentTrack, isPlaying, availableTracks, changeTrack, clearMusic, togglePlayPause, volume, changeVolume, previousTrack, nextTrack } = useMusicContext();

  // Display location logic
  const displayLocation = isAuthenticated ? location : guestLocation;

  // Check for dark mode preference on load
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
  }, []);

  // Load guest location from localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      const savedGuestLocation = localStorage.getItem('guestLocation');
      if (savedGuestLocation) {
        setGuestLocation(savedGuestLocation);
      }
    }
  }, [isAuthenticated]);

  // Fetch user profile for authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            // Try to get profile from profiles table
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
            
            setUserProfile(profile || { id: user.id, email: user.email });
            setEmail(user.email || '');
            setUsername(profile?.username || '');
            setPhoneNumber(profile?.phone || '');
            setLocation(profile?.location || '');
            setCurrentProfilePhotoUrl(profile?.profile_photo_url || '');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile');
        }
      };

      fetchProfile();
    }
  }, [isAuthenticated]);

  // Load temperature unit preference when location tab becomes active
  useEffect(() => {
    if (activeTab === 'location') {
      const loadTemperaturePreference = async () => {
        if (isAuthenticated) {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('use_fahrenheit')
                .eq('id', user.id)
                .single();
              
              if (profile?.use_fahrenheit !== null) {
                setUseFahrenheit(profile.use_fahrenheit);
                setOriginalUseFahrenheit(profile.use_fahrenheit);
              }
            }
          } catch (error) {
            console.error('Error loading temperature preference:', error);
          }
        } else {
          // For guests, use localStorage
          const saved = localStorage.getItem('useFahrenheit');
          if (saved !== null) {
            const savedValue = saved === 'true';
            setUseFahrenheit(savedValue);
            setOriginalUseFahrenheit(savedValue);
          }
        }
      };

      loadTemperaturePreference();
      // Reset change flags when tab becomes active
      setHasLocationChanged(false);
      setHasTemperatureChanged(false);
    }
  }, [activeTab, isAuthenticated]);

  // Search cities using WeatherAPI
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    const searchTimeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(searchQuery)}`
        );
        
        if (response.ok) {
          const data: WeatherAPICity[] = await response.json();
          setSearchResults(data.slice(0, 10)); // Limit to 10 results
        } else {
          console.error('Weather API search failed:', response.status);
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error searching cities:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleDarkModeToggle = async (checked: boolean) => {
    setIsDarkMode(checked);
    
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }

    // Persist to Supabase for authenticated users
    if (isAuthenticated) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              is_dark_mode: checked,
              updated_at: new Date().toISOString()
            });

          if (error) {
            console.error('Error updating dark mode preference:', error);
          }
        }
      } catch (error) {
        console.error('Error saving dark mode preference:', error);
      }
    }
  };

  const handleBackgroundSelect = async (selection: BackgroundSelection) => {
    const success = await saveBackground(selection);
    if (success) {
      toast.success('Background updated successfully');
    } else {
      toast.error('Failed to save background');
    }
  };

  const handleBackgroundClear = async () => {
    await clearBackground();
    toast.success('Background reset to default');
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      setProfilePhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
    setProfilePhotoPreview('');
  };

  // Location functionality handlers
  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setHasLocationChanged(true);
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsGettingLocation(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Fetch city name from coordinates using WeatherAPI
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`
          );
          
          if (response.ok) {
            const data = await response.json();
            const cityName = data.location.name;
            
            setSearchQuery(cityName);
            setSelectedCity(cityName);
            setHasLocationChanged(true);
            toast.success(`Location detected: ${cityName}, ${data.location.country}`);
          } else {
            throw new Error('Failed to get location details');
          }
        } catch (error) {
          console.error('Error getting location details:', error);
          setLocationError('Failed to get location details. Please try manual search.');
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        setIsGettingLocation(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions or search manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable. Please search manually.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again or search manually.');
            break;
          default:
            setLocationError('Failed to get your location. Please search manually.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleTemperatureUnitToggle = async (checked: boolean) => {
    setUseFahrenheit(checked);
    setHasTemperatureChanged(checked !== originalUseFahrenheit);
    
    if (isAuthenticated) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              use_fahrenheit: checked,
              updated_at: new Date().toISOString()
            });

          if (error) {
            console.error('Error saving temperature preference:', error);
          }
        }
      } catch (error) {
        console.error('Error saving temperature preference:', error);
      }
    } else {
      // For guests, save to localStorage
      localStorage.setItem('useFahrenheit', checked.toString());
    }
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('temperatureUnitChanged', { detail: checked }));
  };

  const handleLocationSave = async () => {
    if (!hasLocationChanged && !hasTemperatureChanged) {
      toast.error('No changes to save');
      return;
    }

    if (hasLocationChanged && !selectedCity) {
      toast.error('Please select a city');
      return;
    }

    try {
      if (hasLocationChanged) {
        if (isAuthenticated) {
          // Save to Supabase for authenticated users
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) throw new Error('No user found');

          // Update location in Supabase
          const { error } = await supabase
            .from('profiles')
            .update({ location: selectedCity })
            .eq('id', user.id);

          if (error) throw error;

          // Update local state
          setLocation(selectedCity);
        } else {
          // Save to localStorage for guest users
          localStorage.setItem('guestLocation', selectedCity);
          setGuestLocation(selectedCity);
          
          // Dispatch event to notify other components
          window.dispatchEvent(new CustomEvent('guestLocationUpdate', { detail: selectedCity }));
        }
      }
      
      // Reset change flags
      setHasLocationChanged(false);
      setHasTemperatureChanged(false);
      setSelectedCity('');
      setSearchQuery('');
      setSearchResults([]);
      setLocationError('');
      
      // Show appropriate success message
      if (hasLocationChanged && hasTemperatureChanged) {
        toast.success(`Location and temperature settings updated`);
      } else if (hasLocationChanged) {
        toast.success(`Location updated to ${selectedCity}`);
      } else if (hasTemperatureChanged) {
        toast.success(`Temperature unit updated`);
      }

    } catch (error) {
      console.error('Error saving location:', error);
      toast.error('Failed to save location. Please try again.');
    }
  };

  const formatCityDisplay = (city: WeatherAPICity) => {
    if (city.region && city.region !== city.name) {
      return `${city.name}, ${city.region}, ${city.country}`;
    }
    return `${city.name}, ${city.country}`;
  };

  const uploadProfilePhoto = async (userId: string): Promise<string | null> => {
    if (!profilePhoto) return null;

    try {
      const fileExt = profilePhoto.name.split('.').pop();
      const fileName = `${userId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, profilePhoto, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  };

  const handleSaveProfile = async () => {
    if (!userProfile?.id) return;
    
    setIsLoading(true);
    
    try {
      let profilePhotoUrl = currentProfilePhotoUrl;

      // Upload new profile photo if one was selected
      if (profilePhoto) {
        try {
          profilePhotoUrl = await uploadProfilePhoto(userProfile.id);
        } catch (uploadError) {
          console.error('Profile photo upload failed:', uploadError);
          toast.error('Failed to upload profile photo. Other changes will still be saved.');
          // Continue with other updates even if photo upload fails
        }
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userProfile.id,
          username: username || null,
          phone: phoneNumber || null,
          email: email,
          location: location || null,
          profile_photo_url: profilePhotoUrl || null,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setUserProfile({ 
        ...userProfile, 
        username, 
        phone: phoneNumber,
        email, 
        location,
        profile_photo_url: profilePhotoUrl
      });
      
      setCurrentProfilePhotoUrl(profilePhotoUrl || '');
      setProfilePhoto(null);
      setProfilePhotoPreview('');
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original values
    setUsername(userProfile?.username || '');
    setPhoneNumber(userProfile?.phone || '');
    setEmail(userProfile?.email || '');
    setLocation(userProfile?.location || '');
    setProfilePhoto(null);
    setProfilePhotoPreview('');
    setIsEditing(false);
  };



  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  // Determine which photo to show in avatar
  const avatarImageSrc = profilePhotoPreview || currentProfilePhotoUrl;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-card border border-border rounded-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 h-auto hover:bg-background/50"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage src={avatarImageSrc} className="object-cover" />
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {isAuthenticated ? (
                        userProfile?.username?.charAt(0)?.toUpperCase() || 
                        userProfile?.email?.charAt(0)?.toUpperCase() || 'U'
                      ) : (
                        'G'
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Photo edit overlay when in editing mode */}
                  {isAuthenticated && isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                         onClick={() => document.getElementById('profilePhotoEdit')?.click()}>
                      <Camera className="h-6 w-6 text-white" />
                      <Input
                        id="profilePhotoEdit"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-foreground">
                    {isAuthenticated ? (
                      userProfile?.username ? `@${userProfile.username}` : 'Profile'
                    ) : (
                      'Settings'
                    )}
                  </h1>
                  <p className="text-muted-foreground">
                    {isAuthenticated ? userProfile?.email : 'Guest User'}
                  </p>
                </div>

                {/* Edit Button - Only for authenticated users */}
                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 h-auto hover:bg-background/50"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Segmented Control */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex bg-muted rounded-lg p-1 w-full">
              <button
                onClick={() => setActiveTab('background')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'background'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Image className="h-4 w-4 inline mr-1.5" />
                Background
              </button>
              <button
                onClick={() => setActiveTab('music')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center ${
                  activeTab === 'music'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Music className="h-4 w-4 inline mr-1.5" />
                Music
              </button>
              <button
                onClick={() => setActiveTab('location')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'location'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MapPin className="h-4 w-4 inline mr-1.5" />
                Time & location
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'profile'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <User className="h-4 w-4 inline mr-1.5" />
                Profile
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'background' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Background Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize your homepage background with photos or videos from Pexels.
                  </p>
                </div>

                {/* Current Background Display */}
                {background && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={background.thumbnail} 
                            alt={background.alt || 'Background'} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {background.type === 'photo' ? 'Photo' : 'Video'} Background
                          </p>
                          <p className="text-sm text-muted-foreground">
                            by {background.photographer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Background Selection Button */}
                <Button 
                  onClick={() => setShowBackgroundSelector(true)}
                  className="w-full"
                >
                  <Image className="h-4 w-4 mr-2" />
                  {background ? 'Change Background' : 'Choose Background'}
                </Button>

                {!background && (
                  <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                    <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No custom background set</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Using default theme background
                    </p>
                  </div>
                )}

                {/* Dark Mode Toggle */}
                <Card>
                  <CardContent className="p-[24px]">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Use dark theme for better viewing in low light
                        </p>
                      </div>
                      <Switch
                        checked={isDarkMode}
                        onCheckedChange={handleDarkModeToggle}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'music' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Music Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize your homepage music with lo-fi tracks and ambient sounds.
                  </p>
                </div>

                {/* Current Track Display */}
                {currentTrack && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Music className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {currentTrack.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            by {currentTrack.artist || 'Various Artist'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {isPlaying ? 'Now playing' : 'Paused'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Previous Button */}
                          <button
                            onClick={previousTrack}
                            className="bg-[#FFFFFF] dark:bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0 hover:bg-gray-50 dark:hover:bg-[rgba(30,41,59,0.5)] transition-colors"
                          >
                            <div className="absolute border border-slate-400 border-solid inset-0 pointer-events-none rounded-lg" />
                            <div className="relative shrink-0 size-4">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 16 16"
                              >
                                <g>
                                  <mask
                                    height="16"
                                    id="mask0_140_1321"
                                    maskUnits="userSpaceOnUse"
                                    style={{ maskType: "alpha" }}
                                    width="16"
                                    x="0"
                                    y="0"
                                  >
                                    <rect
                                      fill="#D9D9D9"
                                      height="16"
                                      width="16"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_140_1321)">
                                    <path
                                      d={svgPaths.p39d96380}
                                      fill="#020817"
                                      className="dark:fill-[#F8FAFC]"
                                    />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </button>

                          {/* Pause/Play Button */}
                          <button
                            onClick={togglePlayPause}
                            className="bg-[#FFFFFF] dark:bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0 hover:bg-gray-50 dark:hover:bg-[rgba(30,41,59,0.5)] transition-colors"
                          >
                            <div className="absolute border border-slate-400 border-solid inset-0 pointer-events-none rounded-lg" />
                            <div className="relative shrink-0 size-4">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 16 16"
                              >
                                <g>
                                  <mask
                                    height="16"
                                    id="mask0_140_1317"
                                    maskUnits="userSpaceOnUse"
                                    style={{ maskType: "alpha" }}
                                    width="16"
                                    x="0"
                                    y="0"
                                  >
                                    <rect
                                      fill="#D9D9D9"
                                      height="16"
                                      width="16"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_140_1317)">
                                    <path
                                      d={isPlaying ? svgPaths.p21029200 : playIconPaths.p286b900}
                                      fill="#020817"
                                      className="dark:fill-[#F8FAFC]"
                                    />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </button>

                          {/* Next Button */}
                          <button
                            onClick={nextTrack}
                            className="bg-[#FFFFFF] dark:bg-[rgba(30,41,59,0.3)] box-border content-stretch flex flex-row h-8 items-center justify-center px-[11px] py-px relative rounded-lg shrink-0 hover:bg-gray-50 dark:hover:bg-[rgba(30,41,59,0.5)] transition-colors"
                          >
                            <div className="absolute border border-slate-400 border-solid inset-0 pointer-events-none rounded-lg" />
                            <div className="relative shrink-0 size-4">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 16 16"
                              >
                                <g>
                                  <mask
                                    height="16"
                                    id="mask0_140_1325"
                                    maskUnits="userSpaceOnUse"
                                    style={{ maskType: "alpha" }}
                                    width="16"
                                    x="0"
                                    y="0"
                                  >
                                    <rect
                                      fill="#D9D9D9"
                                      height="16"
                                      width="16"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_140_1325)">
                                    <path
                                      d={svgPaths.p34ac4200}
                                      fill="#020817"
                                      className="dark:fill-[#F8FAFC]"
                                    />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      {/* Volume Slider */}
                      <div className="bg-muted/50 border border-border relative rounded-[10px] shrink-0 w-full mt-6">
                        <div className="relative size-full">
                          <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-[17px] relative w-full">
                            <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                              <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
                                <div className="flex flex-col font-['SF_Pro_Text:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-nowrap text-foreground">
                                  <p className="block leading-[24px] whitespace-pre">Volume</p>
                                </div>
                                <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-muted-foreground">
                                  <p className="block leading-[20px] whitespace-pre">Adjust playback volume</p>
                                </div>
                              </div>
                              <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
                                <div className="flex flex-col font-['SF_Pro_Text:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-left text-nowrap text-muted-foreground">
                                  <p className="block leading-[20px] whitespace-pre">{Math.round(volume * 100)}%</p>
                                </div>
                              </div>
                            </div>
                            <div className="h-4 relative shrink-0 w-full">
                              {/* Volume off icon */}
                              <div className="absolute left-0 size-4 top-1/2 translate-y-[-50%]">
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 16 16"
                                >
                                  <g>
                                    <path
                                      d={volumeIconPaths.p39ac0980}
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.33333"
                                      className="text-muted-foreground"
                                    />
                                    <path
                                      d="M14.6667 6L10.6667 10"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.33333"
                                      className="text-muted-foreground"
                                    />
                                    <path
                                      d="M10.6667 6L14.6667 10"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.33333"
                                      className="text-muted-foreground"
                                    />
                                  </g>
                                </svg>
                              </div>
                              
                              {/* Volume on icon */}
                              <div className="absolute right-0 size-4 top-1/2 translate-y-[-50%]">
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 16 16"
                                >
                                  <g>
                                    <path
                                      d={volumeIconPaths.p39ac0980}
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.33333"
                                      className="text-muted-foreground"
                                    />
                                    <path
                                      d={volumeIconPaths.p33554180}
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.33333"
                                      className="text-muted-foreground"
                                    />
                                    <path
                                      d={volumeIconPaths.p30a38f00}
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.33333"
                                      className="text-muted-foreground"
                                    />
                                  </g>
                                </svg>
                              </div>
                              
                              {/* Volume slider */}
                              <div className="absolute box-border content-stretch flex flex-row items-center justify-center left-7 p-0 right-7 top-1/2 translate-y-[-50%]">
                                <div 
                                  className="basis-0 bg-border grow h-4 min-h-px min-w-px overflow-clip relative rounded-[9999px] shrink-0 cursor-pointer"
                                  onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const percent = (e.clientX - rect.left) / rect.width;
                                    changeVolume(percent);
                                  }}
                                >
                                  <div 
                                    className="absolute bg-primary bottom-0 left-0 top-0"
                                    style={{
                                      right: `${100 - (volume * 100)}%`
                                    }}
                                  />
                                </div>
                                <div
                                  className="absolute bg-background border border-border rounded-[9999px] size-4 top-0 cursor-pointer shadow-sm"
                                  style={{
                                    left: `${volume * 100}%`,
                                    transform: 'translateX(-50%)'
                                  }}
                                  onMouseDown={(e) => {
                                    const startX = e.clientX;
                                    const startVolume = volume;
                                    const slider = e.currentTarget.parentElement;
                                    const sliderRect = slider?.getBoundingClientRect();
                                    
                                    const handleMouseMove = (e: MouseEvent) => {
                                      if (!sliderRect) return;
                                      const deltaX = e.clientX - startX;
                                      const deltaPercent = deltaX / sliderRect.width;
                                      const newVolume = startVolume + deltaPercent;
                                      changeVolume(newVolume);
                                    };
                                    
                                    const handleMouseUp = () => {
                                      document.removeEventListener('mousemove', handleMouseMove);
                                      document.removeEventListener('mouseup', handleMouseUp);
                                    };
                                    
                                    document.addEventListener('mousemove', handleMouseMove);
                                    document.addEventListener('mouseup', handleMouseUp);
                                  }}
                                >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Music Selection Button */}
                <Button 
                  onClick={() => setShowMusicSelector(true)}
                  className="w-full"
                >
                  <Music className="h-4 w-4 mr-2" />
                  {currentTrack ? 'Change Track' : 'Choose Music'}
                </Button>

                {!currentTrack && (
                  <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                    <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No music selected</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Choose from our collection of lo-fi tracks
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Time & Location Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize your location to get accurate weather information.
                  </p>
                </div>

                {/* Current Location Display */}
                {displayLocation && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{displayLocation}</p>
                          <p className="text-sm text-muted-foreground">Current location</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Use Current Location Button */}
                <Button
                  variant="outline"
                  onClick={handleUseCurrentLocation}
                  disabled={isGettingLocation}
                  className="w-full"
                >
                  {isGettingLocation ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Getting location...
                    </>
                  ) : (
                    <>
                      <Navigation className="h-4 w-4 mr-2" />
                      Use Current Location
                    </>
                  )}
                </Button>

                {/* Location Error */}
                {locationError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-800 dark:text-red-200">{locationError}</p>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      or search manually
                    </span>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Search Results */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">Searching cities...</span>
                    </div>
                  ) : searchQuery.length >= 2 ? (
                    searchResults.length > 0 ? (
                      <div className="space-y-1">
                        {searchResults.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => handleCitySelect(city.name)}
                            className={`w-full p-3 text-left rounded-lg border transition-colors hover:bg-muted ${
                              selectedCity === city.name ? 'bg-primary/10 border-primary' : 'border-border'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{city.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {formatCityDisplay(city)}
                                </div>
                              </div>
                              {selectedCity === city.name && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No cities found</p>
                        <p className="text-xs">Try a different search term</p>
                      </div>
                    )
                  ) : searchQuery.length > 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      <p className="text-sm">Type at least 2 characters to search</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Use your current location or search for a city</p>
                    </div>
                  )}
                </div>

                {/* Temperature Unit Toggle */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4" />
                          Temperature Unit
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Choose between Fahrenheit and Celsius
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${!useFahrenheit ? 'text-foreground' : 'text-muted-foreground'}`}>°C</span>
                        <Switch
                          checked={useFahrenheit}
                          onCheckedChange={handleTemperatureUnitToggle}
                        />
                        <span className={`text-sm ${useFahrenheit ? 'text-foreground' : 'text-muted-foreground'}`}>°F</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                {(hasLocationChanged || hasTemperatureChanged) && (
                  <Button 
                    onClick={handleLocationSave} 
                    className="w-full"
                  >
                    Save
                  </Button>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                {isAuthenticated ? (
                  <>
                    {/* Profile Photo Edit Section - Only show when editing */}
                    {isEditing && profilePhotoPreview && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">New Profile Photo</CardTitle>
                          <CardDescription>
                            Preview of your new profile photo
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={profilePhotoPreview} className="object-cover" />
                              <AvatarFallback>
                                {username?.charAt(0)?.toUpperCase() || userProfile?.email?.charAt(0)?.toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{profilePhoto?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {profilePhoto && `${(profilePhoto.size / 1024).toFixed(1)} KB`}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeProfilePhoto}
                              className="p-1 h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Profile Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={!isEditing}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter a username"
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter your phone number"
                          className="bg-background"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                      <div className="flex gap-3">
                        <Button 
                          onClick={handleSaveProfile} 
                          disabled={isLoading}
                          className="flex-1"
                        >
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleCancelEdit}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}

                    {/* Sign Out Button - Secondary Treatment */}
                    <Button 
                      variant="secondary" 
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Login/Signup prompt for unauthenticated users */}
                    <div className="text-center space-y-6">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Create an Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Sign up to save your preferences, customize your profile, and sync your settings across devices.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Button 
                          onClick={() => onShowAuth('signup')}
                          className="w-full"
                          size="lg"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Sign Up
                        </Button>
                        <Button 
                          onClick={() => onShowAuth('login')}
                          variant="outline"
                          className="w-full"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Log In
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}


          </div>
        </div>



        {/* Background Selector Modal */}
        <BackgroundSelector
          isOpen={showBackgroundSelector}
          onClose={() => setShowBackgroundSelector(false)}
          onSelect={handleBackgroundSelect}
          currentBackground={background}
        />

        {/* Music Selector Modal */}
        <MusicSelector
          isOpen={showMusicSelector}
          onClose={() => setShowMusicSelector(false)}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}