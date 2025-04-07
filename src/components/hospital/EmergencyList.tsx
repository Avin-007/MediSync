
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Emergency {
  id: string;
  address: string;
  type: 'ambulance' | 'nurse';
  status: 'pending' | 'assigned' | 'completed';
  timestamp: string;
}

const EmergencyList: React.FC = () => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([
    {
      id: 'EM-12345',
      address: '123 Main St, City Center',
      type: 'ambulance',
      status: 'pending',
      timestamp: '2 mins ago'
    },
    {
      id: 'EM-12346',
      address: '456 Park Ave, Downtown',
      type: 'nurse',
      status: 'assigned',
      timestamp: '15 mins ago'
    },
    {
      id: 'EM-12348',
      address: '789 Oak St, Westside',
      type: 'ambulance',
      status: 'assigned',
      timestamp: '32 mins ago'
    }
  ]);
  
  const { toast } = useToast();

  const assignEmergency = (id: string) => {
    setEmergencies(emergencies.map(emergency => 
      emergency.id === id ? { ...emergency, status: 'assigned' as const } : emergency
    ));
    
    toast({
      title: "Emergency Assigned",
      description: `Emergency ${id} has been assigned to the nearest available unit`,
    });
  };
  
  const completeEmergency = (id: string) => {
    setEmergencies(emergencies.map(emergency => 
      emergency.id === id ? { ...emergency, status: 'completed' as const } : emergency
    ));
    
    toast({
      title: "Emergency Completed",
      description: `Emergency ${id} has been marked as completed`,
    });
  };

  const getPendingCount = () => emergencies.filter(e => e.status === 'pending').length;
  const getAssignedCount = () => emergencies.filter(e => e.status === 'assigned').length;

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Emergency Requests</CardTitle>
        <div className="flex gap-2">
          <Badge variant="destructive">{getPendingCount()} Pending</Badge>
          <Badge variant="default">{getAssignedCount()} Assigned</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emergencies.filter(e => e.status !== 'completed').map((emergency) => (
            <div 
              key={emergency.id}
              className={`p-4 rounded-lg border ${
                emergency.status === 'pending' 
                  ? 'border-medisync-red bg-medisync-light-red' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{emergency.id}</h3>
                    <Badge variant={emergency.type === 'ambulance' ? 'outline' : 'secondary'}>
                      {emergency.type === 'ambulance' ? 'Ambulance' : 'Nurse'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{emergency.address}</p>
                  <p className="text-xs text-gray-500 mt-1">Requested {emergency.timestamp}</p>
                </div>
                
                <div className="flex gap-2">
                  {emergency.status === 'pending' && (
                    <Button 
                      size="sm"
                      onClick={() => assignEmergency(emergency.id)}
                      className="bg-medisync-blue hover:bg-medisync-blue/90"
                    >
                      Assign
                    </Button>
                  )}
                  
                  {emergency.status === 'assigned' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => completeEmergency(emergency.id)}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {emergencies.filter(e => e.status !== 'completed').length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No pending emergency requests
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyList;
