import React, { useState } from 'react';
import MapComponent from '@/components/MapComponent';
import RouteNavigator from '@/components/ambulance/RouteNavigator';
import StatusUpdater from '@/components/ambulance/StatusUpdater';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, BarChart3, Bell, Calendar, CheckCircle, Clock, Phone, Radio } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AnalyticsWidget from '@/components/dashboard/AnalyticsWidget';
import RemindersWidget from '@/components/dashboard/RemindersWidget';
import ScheduleWidget from '@/components/dashboard/ScheduleWidget';
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
  
  // Sample analytics data
  const responseTimeData = [
    { name: 'Mon', value: 6.2 },
    { name: 'Tue', value: 5.8 },
    { name: 'Wed', value: 8.3 },
    { name: 'Thu', value: 7.5 },
    { name: 'Fri', value: 5.4 },
    { name: 'Sat', value: 4.9 },
    { name: 'Sun', value: 6.3 },
  ];
  
  const emergencyTypesData = [
    { name: 'Cardiac', value: 35 },
    { name: 'Trauma', value: 25 },
    { name: 'Respiratory', value: 20 },
    { name: 'Other', value: 20 },
  ];
  
  // Sample reminder data
  const reminders = [
    {
      id: "1",
      title: "Vehicle Maintenance Check",
      time: "Today, 5:00 PM",
      priority: "medium" as const,
      completed: false
    },
    {
      id: "2",
      title: "Submit Shift Report",
      time: "Today, 8:00 PM",
      priority: "high" as const,
      completed: false
    },
    {
      id: "3",
      title: "Restock Medical Supplies",
      time: "Tomorrow, 9:00 AM",
      priority: "low" as const,
      completed: true
    },
  ];
  
  // Sample schedule data
  const scheduleEvents = [
    {
      id: "1",
      title: "Shift Start",
      time: "08:00 AM - 08:00 PM",
      location: "Central Station",
      status: "ongoing" as const,
      type: "appointment" as const
    },
    {
      id: "2",
      title: "Team Briefing",
      time: "09:00 AM - 09:30 AM",
      location: "Conference Room 2",
      status: "completed" as const,
      type: "meeting" as const
    },
    {
      id: "3",
      title: "Training: Advanced CPR",
      time: "3:00 PM - 5:00 PM",
      location: "Training Center",
      status: "upcoming" as const,
      type: "meeting" as const
    }
  ];

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
  
  const handleCompleteReminder = (id: string) => {
    // In a real app, this would update the reminder in a database
    console.log(`Reminder ${id} completed`);
  };
  
  const handleAddScheduleEvent = () => {
    toast({
      title: "Add Schedule",
      description: "Schedule creation form would open here",
    });
  };

  const [dashboardView, setDashboardView] = useState<'main' | 'analytics'>('main');

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
      <Tabs defaultValue="operations" className="space-y-8">
        <TabsList>
          <TabsTrigger value="operations" className="flex gap-2">
            <Radio size={16} />
            Operations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex gap-2">
            <BarChart3 size={16} />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex gap-2">
            <Calendar size={16} />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="reminders" className="flex gap-2">
            <Bell size={16} />
            Reminders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="operations" className="m-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden">
                <MapComponent 
                  destination={destination} 
                  withContactTraffic={true} 
                />
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
        </TabsContent>
        
        <TabsContent value="analytics" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyticsWidget 
              title="Response Times (Minutes)" 
              data={responseTimeData} 
              chartType="area"
              dataKey="value"
              categories={["value"]}
              colors={["#4C6FFF"]}
            />
            <AnalyticsWidget 
              title="Emergency Types" 
              data={emergencyTypesData} 
              chartType="pie"
              dataKey="value"
              colors={["#4C6FFF", "#FF577F", "#10B981", "#F59E0B"]}
            />
            <AnalyticsWidget 
              title="Weekly Performance" 
              data={[
                { name: 'Mon', responses: 4, completed: 4 },
                { name: 'Tue', responses: 6, completed: 5 },
                { name: 'Wed', responses: 5, completed: 5 },
                { name: 'Thu', responses: 7, completed: 6 },
                { name: 'Fri', responses: 8, completed: 8 },
                { name: 'Sat', responses: 5, completed: 5 },
                { name: 'Sun', responses: 3, completed: 3 },
              ]} 
              chartType="bar"
              categories={["responses", "completed"]}
              colors={["#4C6FFF", "#10B981"]}
            />
            <AnalyticsWidget 
              title="Response Time by Hour" 
              data={[
                { name: '00:00', value: 7.2 },
                { name: '04:00', value: 5.8 },
                { name: '08:00', value: 9.3 },
                { name: '12:00', value: 8.5 },
                { name: '16:00', value: 10.2 },
                { name: '20:00', value: 6.8 },
              ]} 
              chartType="area"
              categories={["value"]}
              colors={["#FF577F"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="m-0">
          <ScheduleWidget 
            events={scheduleEvents} 
            onAddEvent={handleAddScheduleEvent}
          />
        </TabsContent>
        
        <TabsContent value="reminders" className="m-0">
          <RemindersWidget 
            reminders={reminders} 
            onComplete={handleCompleteReminder}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AmbulancePortal;
