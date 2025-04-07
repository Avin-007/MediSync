
import React, { useState } from 'react';
import MapComponent from '@/components/MapComponent';
import RouteNavigator from '@/components/ambulance/RouteNavigator';
import StatusUpdater from '@/components/ambulance/StatusUpdater';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, Clock, Phone, Radio } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

// Helper function to create a random emergency
const createRandomEmergency = () => {
  const patients = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'];
  const locations = ['123 Main St', '456 Elm Ave', '789 Oak Blvd', '321 Pine Rd'];
  const conditions = ['Cardiac Arrest', 'Traffic Accident', 'Stroke', 'Severe Allergic Reaction'];
  
  return {
    id: `emergency-${Date.now()}`,
    patient: patients[Math.floor(Math.random() * patients.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    createdAt: new Date(),
    status: 'pending' as const,
    priority: Math.random() > 0.7 ? 'critical' as const : 'standard' as const
  };
};

interface EmergencyRequest {
  id: string;
  patient: string;
  location: string;
  condition: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'completed';
  priority: 'standard' | 'critical';
}

const AmbulancePortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [destination, setDestination] = useState<{ name: string; lat: number; lng: number } | undefined>();
  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>([
    createRandomEmergency(),
    createRandomEmergency()
  ]);
  const [currentEmergency, setCurrentEmergency] = useState<EmergencyRequest | null>(null);

  const handleRouteSet = (destinationName: string) => {
    // In a real app, we would geocode the address to get coordinates
    setDestination({
      name: destinationName,
      lat: 34.052235 + (Math.random() * 0.02 - 0.01),
      lng: -118.243683 + (Math.random() * 0.02 - 0.01)
    });
    
    toast({
      title: "Route Set",
      description: `Route to ${destinationName} has been calculated`,
    });
  };

  const handleAcceptEmergency = (emergency: EmergencyRequest) => {
    // Update emergency status
    setEmergencies(prev => 
      prev.map(e => 
        e.id === emergency.id ? { ...e, status: 'accepted' } : e
      )
    );
    
    setCurrentEmergency({ ...emergency, status: 'accepted' });
    
    // Set the destination on the map
    handleRouteSet(emergency.location);
    
    toast({
      title: "Emergency Accepted",
      description: `You are now responding to ${emergency.patient} at ${emergency.location}`,
    });
  };

  const handleCompleteEmergency = () => {
    if (!currentEmergency) return;
    
    setEmergencies(prev => 
      prev.map(e => 
        e.id === currentEmergency.id ? { ...e, status: 'completed' } : e
      )
    );
    
    toast({
      title: "Emergency Completed",
      description: "Patient has been successfully transported",
      variant: "default", // Changed from "success" to "default"
    });
    
    setCurrentEmergency(null);
    setDestination(undefined);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout
      title="Ambulance Driver Portal" 
      description={`Welcome back, ${user?.name}`}
      headerActions={
        currentEmergency && (
          <div className="flex gap-2 items-center">
            <span className="text-sm">Current Response:</span>
            <Badge 
              variant={currentEmergency.priority === 'critical' ? 'destructive' : 'default'}
              className="uppercase font-bold"
            >
              {currentEmergency.priority}
            </Badge>
          </div>
        )
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-medisync-blue overflow-hidden">
            <MapComponent destination={destination} />
          </Card>
          
          {currentEmergency ? (
            <Card className="border-2 border-medisync-red">
              <CardHeader className="bg-medisync-light-red">
                <CardTitle className="flex items-center justify-between">
                  <span>Active Emergency Response</span>
                  <Badge variant={currentEmergency.priority === 'critical' ? 'destructive' : 'default'}>
                    {currentEmergency.priority}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Patient</p>
                    <p className="font-medium">{currentEmergency.patient}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium">{currentEmergency.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{currentEmergency.location}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Button variant="outline" className="gap-2">
                    <Phone size={16} />
                    Contact Patient
                  </Button>
                  <Button 
                    className="gap-2 bg-green-600 hover:bg-green-700"
                    onClick={handleCompleteEmergency}
                  >
                    <CheckCircle size={16} />
                    Complete Emergency
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <RouteNavigator onRouteSet={handleRouteSet} />
          )}
        </div>
        
        <div className="space-y-6">
          <StatusUpdater />
          
          <Card>
            <CardHeader>
              <CardTitle>Emergency Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="pending">
                <div className="border-b px-3">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="pending" className="relative">
                      Pending
                      {emergencies.filter(e => e.status === 'pending').length > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {emergencies.filter(e => e.status === 'pending').length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="pending" className="m-0">
                  {emergencies.filter(e => e.status === 'pending').length > 0 ? (
                    <div className="divide-y">
                      {emergencies
                        .filter(emergency => emergency.status === 'pending')
                        .map(emergency => (
                          <div key={emergency.id} className="p-3 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{emergency.patient}</h4>
                                  {emergency.priority === 'critical' && (
                                    <Badge variant="destructive">Critical</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{emergency.condition}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                  <Clock size={12} />
                                  {formatTime(emergency.createdAt)}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleAcceptEmergency(emergency)}
                              >
                                Accept
                              </Button>
                            </div>
                            <p className="text-xs mt-2">{emergency.location}</p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No pending emergency requests</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="accepted" className="m-0">
                  {emergencies.filter(e => e.status === 'accepted').length > 0 ? (
                    <div className="divide-y">
                      {emergencies
                        .filter(emergency => emergency.status === 'accepted')
                        .map(emergency => (
                          <div key={emergency.id} className="p-3 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{emergency.patient}</h4>
                                <p className="text-sm text-gray-500 mt-1">{emergency.condition}</p>
                                <p className="text-xs mt-1">{emergency.location}</p>
                              </div>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                In Progress
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No accepted emergency requests</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="m-0">
                  {emergencies.filter(e => e.status === 'completed').length > 0 ? (
                    <div className="divide-y">
                      {emergencies
                        .filter(emergency => emergency.status === 'completed')
                        .map(emergency => (
                          <div key={emergency.id} className="p-3 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{emergency.patient}</h4>
                                <p className="text-sm text-gray-500 mt-1">{emergency.condition}</p>
                                <p className="text-xs mt-1">{emergency.location}</p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Completed
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No completed emergency requests</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-md bg-blue-50">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Radio size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Dispatch Center</p>
                    <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                  </div>
                  <Button size="icon" variant="ghost" className="ml-auto">
                    <Phone size={18} />
                  </Button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-md bg-red-50">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertCircle size={18} className="text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Emergency Backup</p>
                    <p className="text-sm text-gray-500">+1 (555) 987-6543</p>
                  </div>
                  <Button size="icon" variant="ghost" className="ml-auto">
                    <Phone size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AmbulancePortal;
