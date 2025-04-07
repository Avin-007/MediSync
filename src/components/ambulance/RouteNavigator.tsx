
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Navigation, MapPinCheck, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RouteNavigatorProps {
  onRouteSet: (destination: string) => void;
}

const RouteNavigator: React.FC<RouteNavigatorProps> = ({ onRouteSet }) => {
  const [destination, setDestination] = useState('');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const { toast } = useToast();

  const handleRouteSet = () => {
    if (!destination.trim()) {
      toast({
        title: "Error",
        description: "Please enter a destination",
        variant: "destructive",
      });
      return;
    }

    onRouteSet(destination);
    
    toast({
      title: `${emergencyMode ? 'Emergency' : 'Standard'} Route Set`,
      description: `Navigation to ${destination} has been initialized`,
    });
  };

  const toggleEmergencyMode = () => {
    setEmergencyMode(!emergencyMode);
    
    toast({
      title: emergencyMode ? "Emergency Mode Deactivated" : "Emergency Mode Activated",
      description: emergencyMode 
        ? "Switched to standard navigation mode" 
        : "Traffic systems have been notified to clear your route",
    });
  };

  return (
    <Card className={`shadow-md ${emergencyMode ? 'border-medisync-red' : ''}`}>
      <CardHeader className={`${emergencyMode ? 'bg-medisync-light-red' : ''}`}>
        <CardTitle className="flex items-center gap-2">
          <Navigation className={emergencyMode ? 'text-medisync-red' : 'text-medisync-blue'} />
          Route Navigator {emergencyMode && '- Emergency Mode'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Destination</label>
          <Input
            placeholder="Enter hospital or location"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleRouteSet}
          >
            <MapPinCheck size={18} />
            Set Route
          </Button>
          
          <Button 
            variant={emergencyMode ? "default" : "outline"}
            className={`flex items-center gap-2 ${
              emergencyMode ? 'bg-medisync-red hover:bg-medisync-red/90' : ''
            }`}
            onClick={toggleEmergencyMode}
          >
            <Clock size={18} />
            {emergencyMode ? 'Disable Emergency' : 'Enable Emergency Mode'}
          </Button>
        </div>
        
        {emergencyMode && (
          <div className="p-3 bg-medisync-light-red text-sm rounded-md animate-pulse-slow">
            Emergency mode active: Traffic systems notified
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteNavigator;
