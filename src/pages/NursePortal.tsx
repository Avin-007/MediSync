
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar, CheckCircle, Clock, MapPin, Phone, Pill, User, UserCog } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import MapComponent from '@/components/MapComponent';

interface Visit {
  id: string;
  patientName: string;
  address: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'standard' | 'urgent';
}

const NursePortal = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: '1',
      patientName: 'John Smith',
      address: '123 Main St, Apt 4B',
      time: '10:00 AM',
      reason: 'Wound dressing change',
      status: 'scheduled',
      priority: 'standard',
    },
    {
      id: '2',
      patientName: 'Mary Johnson',
      address: '456 Oak Ave',
      time: '11:30 AM',
      reason: 'Post-surgery checkup',
      status: 'scheduled',
      priority: 'urgent',
    },
    {
      id: '3',
      patientName: 'Robert Brown',
      address: '789 Maple Rd',
      time: '1:15 PM',
      reason: 'Blood pressure monitoring',
      status: 'scheduled',
      priority: 'standard',
    },
    {
      id: '4',
      patientName: 'Susan Williams',
      address: '321 Pine St',
      time: '9:00 AM',
      reason: 'IV medication administration',
      status: 'completed',
      priority: 'urgent',
    },
    {
      id: '5',
      patientName: 'Michael Davis',
      address: '654 Cedar Ln',
      time: '3:30 PM',
      reason: 'Catheter care',
      status: 'scheduled',
      priority: 'standard',
    },
  ]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number }>({
    lat: 34.052235, 
    lng: -118.243683
  });
  const [statusValue, setStatusValue] = useState<"available" | "busy" | "offline">("available");

  // For demo purposes only - this would come from GPS in a real app
  const getDestinationFromVisit = (visit: Visit) => {
    return {
      name: visit.address,
      lat: currentLocation.lat + (Math.random() * 0.03 - 0.015),
      lng: currentLocation.lng + (Math.random() * 0.03 - 0.015)
    };
  };

  const handleStartVisit = (visit: Visit) => {
    setVisits(prev => 
      prev.map(v => 
        v.id === visit.id ? { ...v, status: 'in-progress' } : v
      )
    );
    
    setSelectedVisit({ ...visit, status: 'in-progress' });
    setStatusValue("busy");
    
    toast({
      title: "Visit Started",
      description: `You have started the visit with ${visit.patientName}`,
    });
  };

  const handleCompleteVisit = () => {
    if (!selectedVisit) return;
    
    setVisits(prev => 
      prev.map(v => 
        v.id === selectedVisit.id ? { ...v, status: 'completed' } : v
      )
    );
    
    toast({
      title: "Visit Completed",
      description: `Visit with ${selectedVisit.patientName} has been marked as completed`,
      variant: "success",
    });
    
    setSelectedVisit(null);
    setStatusValue("available");
  };

  const handleCancelVisit = (visit: Visit) => {
    setVisits(prev => 
      prev.map(v => 
        v.id === visit.id ? { ...v, status: 'cancelled' } : v
      )
    );
    
    toast({
      title: "Visit Cancelled",
      description: `Visit with ${visit.patientName} has been cancelled`,
      variant: "destructive",
    });
    
    if (selectedVisit?.id === visit.id) {
      setSelectedVisit(null);
    }
  };

  const getPriorityBadge = (priority: string) => {
    return priority === 'urgent' ? (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Urgent</Badge>
    ) : (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Standard</Badge>
    );
  };

  const filteredVisits = visits.filter(visit => {
    if (activeTab === 'upcoming') {
      return visit.status === 'scheduled';
    } else if (activeTab === 'completed') {
      return visit.status === 'completed';
    } else if (activeTab === 'all') {
      return true;
    }
    return false;
  });

  const completedCount = visits.filter(v => v.status === 'completed').length;
  const totalCount = visits.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const statusOptions = [
    { value: "available", label: "Available", color: "bg-green-500" },
    { value: "busy", label: "Busy", color: "bg-yellow-500" },
    { value: "offline", label: "Offline", color: "bg-gray-500" }
  ];

  return (
    <DashboardLayout
      title="Home Care Nurse Portal" 
      description="Manage your home visits and patient care"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-medisync-blue overflow-hidden">
            <MapComponent 
              destination={selectedVisit ? getDestinationFromVisit(selectedVisit) : undefined} 
            />
          </Card>
          
          {selectedVisit ? (
            <Card className="border-2 border-medisync-red">
              <CardHeader className="bg-medisync-light-red">
                <CardTitle className="flex justify-between">
                  <span>Current Visit</span>
                  {selectedVisit.priority === 'urgent' && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      URGENT CARE
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-medium">{selectedVisit.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedVisit.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Scheduled Time</p>
                      <p className="font-medium">{selectedVisit.time}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="text-sm text-gray-500">Reason for Visit</p>
                      <p className="font-medium">{selectedVisit.reason}</p>
                    </div>
                    
                    <div className="mt-6 flex flex-col gap-3">
                      <Button variant="outline" className="gap-2">
                        <Phone size={16} />
                        Call Patient
                      </Button>
                      <Button 
                        className="gap-2 bg-green-600 hover:bg-green-700"
                        onClick={handleCompleteVisit}
                      >
                        <CheckCircle size={16} />
                        Complete Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Visit Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Select a visit from your scheduled visits to start your care session.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-md text-center">
                    <Calendar size={24} className="mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium">View Schedule</h3>
                    <p className="text-xs mt-1 text-gray-500">Check your upcoming appointments</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-md text-center">
                    <MapPin size={24} className="mx-auto mb-2 text-amber-600" />
                    <h3 className="font-medium">Start Visit</h3>
                    <p className="text-xs mt-1 text-gray-500">Begin your home care visit</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-md text-center">
                    <CheckCircle size={24} className="mx-auto mb-2 text-green-600" />
                    <h3 className="font-medium">Complete Care</h3>
                    <p className="text-xs mt-1 text-gray-500">Mark visit as completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Nurse Status</span>
                <Badge 
                  variant="outline" 
                  className={`
                    ${statusValue === 'available' ? 'bg-green-50 text-green-700 border-green-200' : 
                      statusValue === 'busy' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-gray-50 text-gray-700 border-gray-200'}
                  `}
                >
                  {statusValue === 'available' ? 'Available' : 
                   statusValue === 'busy' ? 'Busy' : 'Offline'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {statusOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setStatusValue(option.value as "available" | "busy" | "offline")}
                    className={`flex-1 flex flex-col items-center p-2 rounded-md border-2 transition-all ${
                      statusValue === option.value ? 
                        'border-medisync-blue bg-blue-50' : 
                        'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${option.color} mb-1`}></div>
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Today's Progress</span>
                  <span>{completedCount} of {totalCount} visits</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Home Visits</CardTitle>
              <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                {filteredVisits.length > 0 ? (
                  <div className="divide-y">
                    {filteredVisits.map(visit => (
                      <div 
                        key={visit.id} 
                        className={`p-4 ${
                          visit.status === 'scheduled' ? 'hover:bg-gray-50 cursor-pointer' : ''
                        }`}
                        onClick={() => {
                          if (visit.status === 'scheduled') {
                            setSelectedVisit(visit);
                          }
                        }}
                      >
                        <div className="flex justify-between">
                          <div className="flex gap-3 items-start">
                            <div className="rounded-full bg-gray-100 p-2">
                              <User size={16} className="text-gray-700" />
                            </div>
                            <div>
                              <h4 className="font-medium">{visit.patientName}</h4>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                <Clock size={12} />
                                <span>{visit.time}</span>
                              </div>
                              <p className="text-sm mt-1">{visit.reason}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            {getPriorityBadge(visit.priority)}
                            {visit.status === 'scheduled' && (
                              <div className="mt-3 flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelVisit(visit);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  className="h-7 px-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartVisit(visit);
                                  }}
                                >
                                  Start
                                </Button>
                              </div>
                            )}
                            {visit.status === 'in-progress' && (
                              <Button
                                size="sm"
                                className="h-7 px-2 bg-green-600 hover:bg-green-700 mt-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCompleteVisit();
                                }}
                              >
                                Complete
                              </Button>
                            )}
                            {visit.status === 'completed' && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-3">
                                Completed
                              </Badge>
                            )}
                            {visit.status === 'cancelled' && (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 mt-3">
                                Cancelled
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>No visits found</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog size={18} />
                Skills & Specialties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-medisync-blue">Wound Care</Badge>
                <Badge className="bg-medisync-blue">Medication Administration</Badge>
                <Badge className="bg-medisync-blue">Vital Signs</Badge>
                <Badge className="bg-medisync-blue">IV Therapy</Badge>
                <Badge className="bg-medisync-blue">Elder Care</Badge>
                <Badge className="bg-medisync-blue">Catheter Care</Badge>
                <Badge className="bg-medisync-blue">Post-surgery Care</Badge>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Medication Certifications</h3>
                <div className="flex items-center gap-3 p-2 rounded-md bg-green-50">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <Pill size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Advanced Medication Administration</p>
                    <p className="text-xs text-gray-600">Certified until Dec 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NursePortal;
