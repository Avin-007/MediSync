
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { PhoneCall, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface EmergencyStatusProps {
  active?: boolean;
  estimatedArrival?: string;
  responderName?: string;
  vehicleId?: string;
  onCancel?: () => void;
}

const EmergencyStatus: React.FC<EmergencyStatusProps> = ({ 
  active = false,
  estimatedArrival = "10 minutes",
  responderName = "Dr. Sarah Johnson",
  vehicleId = "AMB-12345",
  onCancel
}) => {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = React.useState(false);

  const handleContactResponder = () => {
    toast({
      title: "Contact Initiated",
      description: "Connecting you to the responder...",
    });
    // In a real app, would initiate a call or messaging session
  };

  const handleCancelEmergency = () => {
    setShowDialog(false);
    if (onCancel) {
      onCancel();
    }
  };

  if (!active) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Emergency Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center text-gray-500">
            <p>No active emergency requests</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border-medisync-red">
      <CardHeader className="bg-medisync-light-red">
        <CardTitle className="text-medisync-red">Emergency In Progress</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Status</span>
            <span className="font-semibold">En Route</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <Clock className="text-medisync-blue h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Estimated Arrival</p>
              <p className="font-medium">{estimatedArrival}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="text-medisync-blue h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Responder</p>
              <p className="font-medium">{responderName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 flex items-center justify-center">
              <div className="h-3 w-3 bg-medisync-red rounded-full animate-pulse-slow"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vehicle ID</p>
              <p className="font-medium">{vehicleId}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <Button 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleContactResponder}
          >
            <PhoneCall size={16} />
            Contact Responder
          </Button>
          
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-700">
                <AlertTriangle size={16} />
                Cancel Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Emergency Request?</DialogTitle>
              </DialogHeader>
              <p className="py-4">
                Are you sure you want to cancel your emergency request? This should only be done if the emergency 
                situation has been resolved or if this was an accidental request.
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  No, Keep Request Active
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCancelEmergency}
                >
                  Yes, Cancel Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyStatus;
