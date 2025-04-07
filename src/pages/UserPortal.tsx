
import React, { useState } from 'react';
import MapComponent from '@/components/MapComponent';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import EmergencyStatus from '@/components/user/EmergencyStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Clock, FileText, Phone, User, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  type: string;
  doctor: string;
}

const UserPortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hasActiveEmergency, setHasActiveEmergency] = useState(false);
  const [activeTab, setActiveTab] = useState('emergency');

  // In a real app, we would get the user's current location
  const emergencyLocations = [
    { name: "Active Emergency", lat: 34.052235, lng: -118.243683 }
  ];
  
  // Sample medical records data
  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      title: 'Annual Physical Examination',
      date: '2025-03-15',
      type: 'Check-up',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      title: 'Flu Vaccination',
      date: '2025-02-10',
      type: 'Vaccination',
      doctor: 'Dr. Michael Chang'
    },
    {
      id: '3',
      title: 'Blood Work Results',
      date: '2025-01-25',
      type: 'Laboratory',
      doctor: 'Dr. Emily Rivera'
    },
  ];
  
  const handleRequestSubmit = (requestType: string) => {
    setHasActiveEmergency(true);
    
    toast({
      title: `${requestType === 'ambulance' ? 'Ambulance' : 'Nurse'} Requested`,
      description: `Your ${requestType} request has been submitted successfully. Help is on the way.`,
    });
  };

  const handleCancelEmergency = () => {
    setHasActiveEmergency(false);
    
    toast({
      title: "Request Cancelled",
      description: "Your emergency request has been cancelled.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <DashboardLayout 
      title="Patient Portal" 
      description={`Welcome back, ${user?.name}`}
      headerActions={
        hasActiveEmergency ? (
          <Badge variant="destructive" className="text-md px-4 py-1">
            Emergency Active
          </Badge>
        ) : null
      }
    >
      <Tabs defaultValue="emergency" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid sm:grid-cols-3 gap-4">
          <TabsTrigger value="emergency" className="relative">
            <AlertCircle size={16} className="mr-2" />
            Emergency Services
            {hasActiveEmergency && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="records">
            <FileText size={16} className="mr-2" />
            Medical Records
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar size={16} className="mr-2" />
            Appointments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="emergency" className="m-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-2 border-medisync-blue overflow-hidden">
                <MapComponent 
                  emergencies={hasActiveEmergency ? emergencyLocations : []} 
                />
              </Card>
            </div>
            <div className="space-y-6">
              {hasActiveEmergency ? (
                <EmergencyStatus 
                  active={true} 
                  onCancel={handleCancelEmergency}
                />
              ) : (
                <EmergencyRequest 
                  onSubmit={handleRequestSubmit}
                />
              )}
              
              {!hasActiveEmergency && (
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-100 rounded-md flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Emergency Hotline</h3>
                          <p className="text-2xl font-bold text-red-600">911</p>
                        </div>
                        <Button 
                          size="icon" 
                          className="rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                        >
                          <Phone size={18} />
                        </Button>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Medical Support</h3>
                          <p className="text-sm">+1 (555) 123-4567</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-100"
                        >
                          <Phone size={18} />
                        </Button>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-100 rounded-md flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Nurse On-Call</h3>
                          <p className="text-sm">+1 (555) 987-6543</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="rounded-full border-green-200 text-green-600 hover:bg-green-100"
                        >
                          <Phone size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="records" className="m-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.map(record => (
                  <div 
                    key={record.id} 
                    className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">{record.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          {formatDate(record.date)}
                        </div>
                        <Badge variant="outline" className="text-xs font-normal">
                          {record.type}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <User size={12} className="mr-1" />
                          {record.doctor}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
                
                <div className="flex justify-center pt-2">
                  <Button variant="outline">View All Medical Records</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Amoxicillin 500mg</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Take 1 capsule every 8 hours with food</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock size={12} className="mr-1" />
                    Refills: 2 remaining
                  </div>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Lisinopril 10mg</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Take 1 tablet daily in the morning</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock size={12} className="mr-1" />
                    Refills: 5 remaining
                  </div>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Ibuprofen 200mg</h3>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700">Expired</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Take 1-2 tablets every 6 hours as needed for pain</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock size={12} className="mr-1" />
                    Expired on: April 1, 2025
                  </div>
                </div>
                
                <div className="flex justify-center pt-2">
                  <Button variant="outline">Request Refill</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="m-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Dental Check-up</h3>
                    <Badge>Apr 15</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Dr. Mark Stevens - Dental Care Center</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock size={12} className="mr-1" />
                    10:30 AM
                  </div>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Eye Examination</h3>
                    <Badge>Apr 22</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Dr. Lisa Wong - Vision Care</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock size={12} className="mr-1" />
                    2:15 PM
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-3">
                  <Button variant="outline">Reschedule</Button>
                  <Button>Book New Appointment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Home Care Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Nurse Home Visit</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">Scheduled</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Nurse Robert Smith</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Clock size={12} className="mr-1" />
                      Tomorrow, 11:00 AM
                    </div>
                  </div>
                  
                  <Button className="w-full bg-medisync-blue hover:bg-medisync-blue/90" onClick={() => setActiveTab('emergency')}>
                    Request New Home Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emergency History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Ambulance Transport</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Central Hospital Emergency</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Clock size={12} className="mr-1" />
                      March 28, 2025
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 pt-2">
                    <p>No other emergency services in your history.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserPortal;
