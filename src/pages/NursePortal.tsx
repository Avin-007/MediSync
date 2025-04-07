
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Activity, Users, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

const NursePortal = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [assignedCases, setAssignedCases] = useState([
    { 
      id: 1, 
      patientName: "John Doe", 
      address: "123 Main St", 
      service: "Wound Dressing",
      timeRequested: "10:30 AM",
      status: "Assigned"
    },
    { 
      id: 2, 
      patientName: "Jane Smith", 
      address: "456 Oak Ave", 
      service: "Blood Pressure Check",
      timeRequested: "11:15 AM",
      status: "Completed"
    }
  ]);
  
  const { toast } = useToast();

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    
    toast({
      title: isAvailable ? "You're now offline" : "You're now available",
      description: isAvailable 
        ? "You won't receive any new home visit requests" 
        : "You'll now receive home visit requests",
    });
  };

  const completeCase = (id: number) => {
    const updatedCases = assignedCases.map(c => 
      c.id === id ? { ...c, status: "Completed" } : c
    );
    setAssignedCases(updatedCases);
    
    toast({
      title: "Case Completed",
      description: "You've marked this home visit as completed",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Nurse Portal</h1>
            <p className="text-gray-500">Manage your availability and home visit requests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-md md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="text-medisync-blue" size={18} />
                  Your Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center justify-between">
                  <Label htmlFor="nurse-availability" className="text-base">Available for Home Visits</Label>
                  <Switch 
                    id="nurse-availability" 
                    checked={isAvailable}
                    onCheckedChange={toggleAvailability}
                  />
                </div>
                
                <div className={`p-4 rounded-md ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="font-medium">{isAvailable ? 'You are currently online' : 'You are currently offline'}</p>
                  <p className="text-sm mt-1">{isAvailable 
                    ? 'You can receive home visit requests' 
                    : 'You won\'t receive any new requests'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="text-medisync-blue" size={16} />
                    <span>Today's visits: 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-medisync-blue" size={16} />
                    <span>Next available slot: 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-medisync-blue" size={16} />
                    <span>Current area: Downtown</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-medisync-blue" size={18} />
                  Assigned Home Visits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignedCases.map(caseItem => (
                  <Card key={caseItem.id} className={caseItem.status === "Completed" ? "bg-gray-50" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-medium">{caseItem.patientName}</p>
                          <p className="text-sm flex items-center gap-1">
                            <MapPin size={14} /> {caseItem.address}
                          </p>
                          <p className="text-sm">{caseItem.service}</p>
                          <p className="text-xs text-gray-500">Requested: {caseItem.timeRequested}</p>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className={`flex items-center gap-1 text-sm mb-2 ${
                            caseItem.status === "Completed" ? "text-green-600" : "text-medisync-red"
                          }`}>
                            {caseItem.status === "Completed" ? (
                              <><CheckCircle2 size={16} /> Completed</>
                            ) : (
                              <><AlertCircle size={16} /> Assigned</>
                            )}
                          </div>
                          
                          {caseItem.status !== "Completed" && (
                            <Button 
                              onClick={() => completeCase(caseItem.id)}
                              variant="outline" 
                              size="sm"
                              className="border-green-400 hover:bg-green-50 text-green-600"
                            >
                              Mark as Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {assignedCases.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <p>No assigned home visits</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NursePortal;
