import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { supabase } from '../lib/supabase';

interface HomepageProps {
  onLogout: () => void;
}

export function Homepage({ onLogout }: HomepageProps) {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get current user info
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
      }
    };
    
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
      } else {
        onLogout();
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to your Dashboard!</CardTitle>
            <CardDescription>
              You have successfully logged in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Logged in as:</p>
              <p className="font-medium">{userEmail}</p>
            </div>
            
            <div className="space-y-2">
              <h3>What would you like to do?</h3>
              <p className="text-muted-foreground">
                This is a basic homepage to demonstrate successful authentication. 
                You can now build out your application's main features here.
              </p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">
                  Session is active and secure
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}