
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { Ambulance, Users } from 'lucide-react';

const EmergencyRequest: React.FC = () => {
  const [requestType, setRequestType] = useState('ambulance');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Request Submitted",
        description: requestType === 'ambulance' 
          ? "An ambulance has been dispatched to your location" 
          : "A home care nurse has been notified and will contact you shortly",
      });
      
      // Reset form after successful submission
      setAddress('');
      setDescription('');
    }, 2000);
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
          <label className="text-sm font-medium">Your Address</label>
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
        
        <Button 
          className="w-full bg-medisync-red hover:bg-medisync-red/90"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting...' : 'Request Immediate Assistance'}
        </Button>
        
        <p className="text-sm text-gray-500 text-center">
          For life-threatening emergencies, please also call emergency services directly.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmergencyRequest;
