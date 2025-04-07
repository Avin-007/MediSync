
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { PhoneCall, Clock, MapPin } from 'lucide-react';

interface EmergencyStatusProps {
  active?: boolean;
  estimatedArrival?: string;
  responderName?: string;
  vehicleId?: string;
}

const EmergencyStatus: React.FC<EmergencyStatusProps> = ({ 
  active = false,
  estimatedArrival = "10 minutes",
  responderName = "Dr. Sarah Johnson",
  vehicleId = "AMB-12345"
}) => {
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
        
        <div className="pt-2">
          <Button className="w-full flex items-center justify-center gap-2">
            <PhoneCall size={16} />
            Contact Responder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Adding Button locally because we need it in this component
const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`bg-medisync-blue hover:bg-medisync-blue/90 text-white px-4 py-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default EmergencyStatus;
