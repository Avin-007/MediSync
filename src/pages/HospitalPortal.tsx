
import React, { useState } from 'react';
import MapComponent from '@/components/MapComponent';
import ResourceDashboard from '@/components/hospital/ResourceDashboard';
import EmergencyList from '@/components/hospital/EmergencyList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Ambulance, Bed, Search, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// In a real app, these would come from a backend API
const emergencyLocations = [
  { name: "Emergency #1", lat: 34.052235, lng: -118.243683 },
  { name: "Emergency #2", lat: 34.062235, lng: -118.253683 },
  { name: "Emergency #3", lat: 34.042235, lng: -118.233683 },
];

interface Staff {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'offline';
}

interface Room {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance';
}

const HospitalPortal = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for hospital staff
  const staffMembers: Staff[] = [
    { id: '1', name: 'Dr. Sarah Johnson', role: 'Emergency Physician', status: 'available' },
    { id: '2', name: 'Dr. Michael Chang', role: 'Cardiologist', status: 'busy' },
    { id: '3', name: 'Nurse David Wilson', role: 'Head Nurse', status: 'available' },
    { id: '4', name: 'Dr. Emily Rivera', role: 'Neurologist', status: 'offline' },
    { id: '5', name: 'Nurse Robert Smith', role: 'ER Nurse', status: 'available' },
  ];

  // Sample data for hospital rooms
  const rooms: Room[] = [
    { id: '1', name: 'ER Room 1', type: 'Emergency', status: 'available' },
    { id: '2', name: 'ER Room 2', type: 'Emergency', status: 'occupied' },
    { id: '3', name: 'ICU Bed 1', type: 'Intensive Care', status: 'occupied' },
    { id: '4', name: 'ICU Bed 2', type: 'Intensive Care', status: 'available' },
    { id: '5', name: 'OR 1', type: 'Operating Room', status: 'maintenance' },
  ];
  
  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const stats = {
    ambulancesAvailable: 4,
    ambulancesTotal: 6,
    nursesAvailable: 8,
    nursesTotal: 12,
    activeCalls: 3
  };
  
  const handleDispatchAmbulance = () => {
    toast({
      title: "Ambulance Dispatched",
      description: "An ambulance has been dispatched to the selected location.",
    });
  };
  
  const getStatusBadge = (status: 'available' | 'busy' | 'offline' | 'occupied' | 'maintenance') => {
    switch (status) {
      case 'available':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Available</Badge>;
      case 'busy':
      case 'occupied':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Busy</Badge>;
      case 'offline':
      case 'maintenance':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Offline</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout 
      title="Hospital Admin Portal"
      description="Monitor resources and manage emergency responses"
      headerActions={
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-medisync-blue hover:bg-medisync-blue/90 gap-2">
              <Ambulance size={16} />
              Dispatch Ambulance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Dispatch Ambulance</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="location">Pickup Location</Label>
                <Input id="location" placeholder="Enter pickup address" />
              </div>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="Enter destination hospital" />
              </div>
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <select 
                  id="priority" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="standard">Standard</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <Button onClick={handleDispatchAmbulance}>Dispatch Now</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-2 border-medisync-blue overflow-hidden">
            <MapComponent emergencies={emergencyLocations} />
          </Card>
        </div>
        <div>
          <ResourceDashboard stats={stats} />
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Management</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <EmergencyList />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between">
            <CardTitle>Hospital Resources</CardTitle>
            <div className="relative mt-2 sm:mt-0">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff or rooms..."
                className="pl-8 max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="staff">
              <div className="border-b px-3">
                <TabsList>
                  <TabsTrigger value="staff" className="flex gap-2">
                    <Users size={16} />
                    Staff
                  </TabsTrigger>
                  <TabsTrigger value="rooms" className="flex gap-2">
                    <Bed size={16} />
                    Rooms
                  </TabsTrigger>
                  <TabsTrigger value="ambulances" className="flex gap-2">
                    <Ambulance size={16} />
                    Ambulances
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="staff" className="m-0">
                <div className="divide-y">
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff) => (
                      <div key={staff.id} className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{staff.name}</h4>
                          <p className="text-sm text-muted-foreground">{staff.role}</p>
                        </div>
                        {getStatusBadge(staff.status)}
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No staff members found</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="rooms" className="m-0">
                <div className="divide-y">
                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                      <div key={room.id} className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{room.name}</h4>
                          <p className="text-sm text-muted-foreground">{room.type}</p>
                        </div>
                        {getStatusBadge(room.status)}
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No rooms found</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="ambulances" className="m-0">
                <div className="divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Ambulance #A-101</h4>
                      <p className="text-sm text-muted-foreground">Type: Advanced Life Support</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Available</Badge>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Ambulance #A-102</h4>
                      <p className="text-sm text-muted-foreground">Type: Basic Life Support</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En Route</Badge>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Ambulance #A-103</h4>
                      <p className="text-sm text-muted-foreground">Type: Advanced Life Support</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En Route</Badge>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Ambulance #A-104</h4>
                      <p className="text-sm text-muted-foreground">Type: Neonatal</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Available</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={18} className="text-medisync-red" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-red-800">ICU Approaching Capacity</h3>
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Critical</Badge>
                </div>
                <p className="text-sm text-red-700 mt-1">ICU is currently at 85% capacity. Please prepare overflow protocols.</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-amber-800">Staff Shortage: Cardiology</h3>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Warning</Badge>
                </div>
                <p className="text-sm text-amber-700 mt-1">Cardiology department is understaffed for the next shift.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HospitalPortal;
