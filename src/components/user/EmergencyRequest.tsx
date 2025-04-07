
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { Ambulance, Users, MapPin, Clock } from 'lucide-react';
import { Progress } from '../ui/progress';

interface EmergencyRequestProps {
  onSubmit?: (requestType: string) => void;
}

const EmergencyRequest: React.FC<EmergencyRequestProps> = ({ onSubmit }) => {
  const [requestType, setRequestType] = useState('ambulance');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!address.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setProgress(0);
    
    // Simulate API call with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            if (onSubmit) {
              onSubmit(requestType);
            } else {
              toast({
                title: "Request Submitted",
                description: requestType === 'ambulance' 
                  ? "An ambulance has been dispatched to your location" 
                  : "A home care nurse has been notified and will contact you shortly",
              });
            }
          }, 500);
        }
        return newProgress;
      });
    }, 400);
  };

  // Try to get user's location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Locating",
        description: "Accessing your current location...",
      });
      
      navigator.geolocation.getCurrentPosition((position) => {
        // In a real app, would reverse geocode to get address
        // For demo, just show coordinates were obtained
        toast({
          title: "Location Found",
          description: "Your location has been detected",
          variant: "default",  // Changed from "success" to "default"
        });
        setAddress("Current Location (detected)");
      }, () => {
        toast({
          title: "Location Error",
          description: "Unable to access your location. Please enter manually.",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation. Please enter manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-medisync-light-red">
        <CardTitle className="text-medisync-red">Request Emergency Services</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <RadioGroup 
          defaultValue="ambulance" 
          value={requestType} 
          onValueChange={setRequestType}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ambulance" id="ambulance" />
            <Label htmlFor="ambulance" className="flex items-center gap-2">
              <Ambulance size={16} /> Emergency Ambulance
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nurse" id="nurse" />
            <Label htmlFor="nurse" className="flex items-center gap-2">
              <Users size={16} /> Home Care Nurse
            </Label>
          </div>
        </RadioGroup>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex justify-between">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Your Address
            </span>
            <Button 
              variant="link" 
              className="text-xs p-0 h-auto" 
              onClick={handleGetLocation}
              type="button"
            >
              Use my location
            </Button>
          </label>
          <Input
            placeholder="Enter your current location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description (Optional)</label>
          <Textarea
            placeholder="Describe the emergency situation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        {isSubmitting ? (
          <div className="space-y-2 py-2">
            <div className="flex justify-between text-sm">
              <span>Locating nearest {requestType}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center text-gray-500 animate-pulse flex items-center justify-center">
              <Clock size={12} className="mr-1" />
              Processing your request...
            </p>
          </div>
        ) : (
          <Button 
            className="w-full bg-medisync-red hover:bg-medisync-red/90"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {requestType === 'ambulance' ? 'Request Emergency Ambulance' : 'Request Nurse Home Visit'}
          </Button>
        )}
        
        <p className="text-sm text-gray-500 text-center">
          {requestType === 'ambulance' 
            ? 'For life-threatening emergencies, please also call emergency services directly.' 
            : 'For urgent medical needs, consider requesting an ambulance instead.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmergencyRequest;
