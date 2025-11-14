import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { MapPin, Search, Navigation, Loader2, AlertCircle, Thermometer } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../lib/supabase';

interface WeatherAPICity {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSave: (cityName: string) => void;
  currentLocation?: string;
  isAuthenticated?: boolean;
}

const WEATHER_API_KEY = 'b93e335c0d074c2ca9874431250506';

export function LocationSelector({ isOpen, onClose, onLocationSave, currentLocation, isAuthenticated = false }: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<WeatherAPICity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [useFahrenheit, setUseFahrenheit] = useState(true);
  const [originalUseFahrenheit, setOriginalUseFahrenheit] = useState(true);
  const [hasLocationChanged, setHasLocationChanged] = useState(false);
  const [hasTemperatureChanged, setHasTemperatureChanged] = useState(false);

  // Load temperature unit preference
  useEffect(() => {
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

    if (isOpen) {
      loadTemperaturePreference();
      // Reset change flags when dialog opens
      setHasLocationChanged(false);
      setHasTemperatureChanged(false);
    }
  }, [isOpen, isAuthenticated]);

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

  const handleSave = () => {
    if (!hasLocationChanged && !hasTemperatureChanged) {
      toast.error('No changes to save');
      return;
    }

    if (hasLocationChanged && !selectedCity) {
      toast.error('Please select a city');
      return;
    }

    if (hasLocationChanged) {
      onLocationSave(selectedCity);
    }
    
    onClose();
    handleReset();
    
    // Show appropriate success message
    if (hasLocationChanged && hasTemperatureChanged) {
      toast.success(`Location and temperature settings updated`);
    } else if (hasLocationChanged) {
      toast.success(`Location updated to ${selectedCity}`);
    } else if (hasTemperatureChanged) {
      toast.success(`Temperature unit updated`);
    }
  };

  const handleClose = () => {
    onClose();
    handleReset();
  };

  const handleReset = () => {
    setSelectedCity('');
    setSearchQuery('');
    setSearchResults([]);
    setLocationError('');
    setHasLocationChanged(false);
    setHasTemperatureChanged(false);
  };

  const formatCityDisplay = (city: WeatherAPICity) => {
    if (city.region && city.region !== city.name) {
      return `${city.name}, ${city.region}, ${city.country}`;
    }
    return `${city.name}, ${city.country}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Time & Location Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Location Display */}
          {currentLocation && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Current: {currentLocation}
              </div>
            </div>
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
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">{locationError}</p>
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

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasLocationChanged && !hasTemperatureChanged} className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}