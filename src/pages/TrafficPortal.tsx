
import React, { useState } from 'react';
import Header from '@/components/Header';
import MapComponent from '@/components/MapComponent';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, ToggleLeft, CheckCircle2 } from 'lucide-react';

const TrafficPortal = () => {
  const [activeRoutes, setActiveRoutes] = useState([
    { id: 1, from: "City Hospital", to: "Main Street 123", priority: "High", status: "Active" },
    { id: 2, from: "Central Clinic", to: "Park Avenue 45", priority: "Medium", status: "Pending" },
  ]);
  
  const { toast } = useToast();

  const emergencyLocations = [
    { name: "Emergency Route #1", lat: 34.052235, lng: -118.243683 },
    { name: "Emergency Route #2", lat: 34.062235, lng: -118.253683 },
  ];

  const clearRoute = (id: number) => {
    // Update route status
    const updatedRoutes = activeRoutes.map(route => 
      route.id === id ? { ...route, status: "Cleared" } : route
    );
    setActiveRoutes(updatedRoutes);
    
    toast({
      title: "Route Cleared",
      description: "Traffic signals have been synchronized for emergency vehicle",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Traffic Authority Portal</h1>
            <p className="text-gray-500">Manage and clear routes for emergency vehicles</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapComponent emergencies={emergencyLocations} />
            </div>
            <div>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="text-medisync-red" size={18} />
                    Active Emergency Routes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeRoutes.map(route => (
                    <Card key={route.id} className={`border ${
                      route.status === "Cleared" 
                        ? "border-green-500 bg-green-50" 
                        : route.priority === "High" 
                          ? "border-medisync-red bg-medisync-light-red" 
                          : "border-yellow-500 bg-yellow-50"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">From: {route.from}</p>
                            <p className="text-sm">To: {route.to}</p>
                            <p className="text-xs mt-2">
                              Priority: <span className={`font-medium ${
                                route.priority === "High" ? "text-medisync-red" : "text-yellow-600"
                              }`}>{route.priority}</span>
                            </p>
                          </div>
                          
                          <div>
                            {route.status === "Cleared" ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 size={18} className="mr-1" />
                                <span>Cleared</span>
                              </div>
                            ) : (
                              <Button 
                                onClick={() => clearRoute(route.id)}
                                className="bg-medisync-blue hover:bg-medisync-blue/90"
                                size="sm"
                              >
                                <ToggleLeft size={16} className="mr-1" /> 
                                Clear Route
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {activeRoutes.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      <p>No active emergency routes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrafficPortal;
