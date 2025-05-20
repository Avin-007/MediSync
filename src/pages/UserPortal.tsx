
import React, { useState } from 'react';
import MapComponent from '@/components/MapComponent';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import EmergencyStatus from '@/components/user/EmergencyStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertCircle, Clock, BarChart, Brain, Stethoscope, ShoppingCart, Home, PhoneCall as Phone
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import HealthOverview from '@/components/user/HealthOverview';
import SymptomTracker from '@/components/user/SymptomTracker';
import DoctorFinder from '@/components/user/DoctorFinder';
import MedicationMarketplace from '@/components/user/MedicationMarketplace';

const UserPortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hasActiveEmergency, setHasActiveEmergency] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <TabsTrigger value="dashboard" className="relative">
            <BarChart size={16} className="mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="emergency" className="relative">
            <AlertCircle size={16} className="mr-2" />
            Emergency
            {hasActiveEmergency && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="health" className="relative">
            <Brain size={16} className="mr-2" />
            Health AI
          </TabsTrigger>
          <TabsTrigger value="doctors" className="relative">
            <Stethoscope size={16} className="mr-2" />
            Doctors
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="relative">
            <ShoppingCart size={16} className="mr-2" />
            Marketplace
          </TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <HealthOverview />
        </TabsContent>
        
        {/* Emergency Tab */}
        <TabsContent value="emergency" className="m-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-2 border-medisync-blue overflow-hidden">
                <MapComponent 
                  emergencies={hasActiveEmergency ? [{ name: "Active Emergency", lat: 34.052235, lng: -118.243683 }] : []} 
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
        
        {/* Health AI Tab */}
        <TabsContent value="health" className="m-0 space-y-6">
          <SymptomTracker />
        </TabsContent>
        
        {/* Doctors Tab */}
        <TabsContent value="doctors" className="m-0 space-y-6">
          <DoctorFinder />
        </TabsContent>
        
        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="m-0 space-y-6">
          <MedicationMarketplace />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserPortal;
