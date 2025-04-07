
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ArrowRight, Clock, MapPin, RotateCw, ThumbsUp, TrafficCone } from 'lucide-react';
import MapComponent from '@/components/MapComponent';

interface EmergencyRoute {
  id: string;
  ambulanceId: string;
  startLocation: string;
  endLocation: string;
  status: 'pending' | 'cleared' | 'completed';
  priority: 'standard' | 'urgent' | 'critical';
  estimatedArrival: string;
  createdAt: Date;
}

const TrafficPortal = () => {
  const { toast } = useToast();
  const [selectedRoute, setSelectedRoute] = useState<EmergencyRoute | null>(null);
  const [routes, setRoutes] = useState<EmergencyRoute[]>([
    {
      id: '1',
      ambulanceId: 'AMB-101',
      startLocation: '123 Main St',
      endLocation: 'Central Hospital',
      status: 'pending',
      priority: 'critical',
      estimatedArrival: '10 minutes',
      createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: '2',
      ambulanceId: 'AMB-102',
      startLocation: '456 Oak Ave',
      endLocation: 'Memorial Hospital',
      status: 'pending',
      priority: 'urgent',
      estimatedArrival: '15 minutes',
      createdAt: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
    },
    {
      id: '3',
      ambulanceId: 'AMB-103',
      startLocation: '789 Elm St',
      endLocation: 'City Medical Center',
      status: 'cleared',
      priority: 'standard',
      estimatedArrival: '8 minutes',
      createdAt: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
    },
    {
      id: '4',
      ambulanceId: 'AMB-104',
      startLocation: '101 Pine Rd',
      endLocation: 'General Hospital',
      status: 'completed',
      priority: 'urgent',
      estimatedArrival: '12 minutes',
      createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
  ]);

  // Mock destination for map
  const [destination, setDestination] = useState<{ name: string; lat: number; lng: number } | undefined>();

  // Add a route to the map when selected
  useEffect(() => {
    if (selectedRoute) {
      setDestination({
        name: selectedRoute.endLocation,
        lat: 34.052235 + (Math.random() * 0.02 - 0.01),
        lng: -118.243683 + (Math.random() * 0.02 - 0.01)
      });
    } else {
      setDestination(undefined);
    }
  }, [selectedRoute]);

  const handleClearRoute = (route: EmergencyRoute) => {
    setRoutes(prev => 
      prev.map(r => 
        r.id === route.id ? { ...r, status: 'cleared' } : r
      )
    );
    
    setSelectedRoute(prev => prev?.id === route.id ? { ...route, status: 'cleared' } : prev);
    
    toast({
      title: "Route Cleared",
      description: `Route for ${route.ambulanceId} has been cleared for emergency transit`,
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'critical':
        return <Badge variant="destructive">CRITICAL</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">URGENT</Badge>;
      default:
        return <Badge variant="outline">STANDARD</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      case 'cleared':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Cleared</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Traffic Authority Portal" 
      description="Manage traffic signals and clear routes for emergency vehicles"
      headerActions={
        selectedRoute && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Selected Route:</span>
            {getPriorityBadge(selectedRoute.priority)}
          </div>
        )
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-2 border-medisync-blue overflow-hidden">
            {destination ? (
              <MapComponent destination={destination} />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center bg-gray-50 p-6">
                <MapPin size={48} className="text-gray-300 mb-3" />
                <h3 className="text-lg font-medium">No Route Selected</h3>
                <p className="text-gray-500 text-center mt-1">
                  Select a route from the Emergency Routes panel to view it on the map
                </p>
              </div>
            )}
          </Card>
          
          {selectedRoute && (
            <Card className="mt-6 border-2 border-medisync-red">
              <CardHeader className="bg-medisync-light-red">
                <CardTitle className="flex items-center justify-between">
                  <span>Active Emergency Route</span>
                  {getPriorityBadge(selectedRoute.priority)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Ambulance ID</p>
                      <p className="font-medium">{selectedRoute.ambulanceId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="mt-1">{getStatusBadge(selectedRoute.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Arrival</p>
                      <p className="font-medium">{selectedRoute.estimatedArrival}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{selectedRoute.startLocation}</p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{selectedRoute.endLocation}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedRoute(null)}
                  >
                    Close Details
                  </Button>
                  
                  {selectedRoute.status === 'pending' ? (
                    <Button 
                      className="gap-2 bg-green-600 hover:bg-green-700"
                      onClick={() => handleClearRoute(selectedRoute)}
                    >
                      <ThumbsUp size={16} />
                      Clear Route
                    </Button>
                  ) : selectedRoute.status === 'cleared' ? (
                    <div className="flex items-center text-green-700">
                      <ThumbsUp size={16} className="mr-2" />
                      Route Cleared
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      Emergency Completed
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Routes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="pending">
                <div className="border-b px-3">
                  <TabsList>
                    <TabsTrigger value="pending" className="relative">
                      Pending
                      {routes.filter(r => r.status === 'pending').length > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {routes.filter(r => r.status === 'pending').length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="cleared">Cleared</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="pending" className="m-0">
                  {routes.filter(r => r.status === 'pending').length > 0 ? (
                    <div className="divide-y">
                      {routes
                        .filter(route => route.status === 'pending')
                        .map(route => (
                          <div 
                            key={route.id} 
                            className="p-3 hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedRoute(route)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{route.ambulanceId}</h4>
                                  {getPriorityBadge(route.priority)}
                                </div>
                                <p className="text-sm mt-1">{route.startLocation} → {route.endLocation}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                  <Clock size={12} />
                                  {formatTime(route.createdAt)}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClearRoute(route);
                                }}
                              >
                                Clear
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No pending routes</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="cleared" className="m-0">
                  {routes.filter(r => r.status === 'cleared').length > 0 ? (
                    <div className="divide-y">
                      {routes
                        .filter(route => route.status === 'cleared')
                        .map(route => (
                          <div 
                            key={route.id} 
                            className="p-3 hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedRoute(route)}
                          >
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">{route.ambulanceId}</h4>
                                <p className="text-sm text-gray-500 mt-1">{route.startLocation} → {route.endLocation}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                  <Clock size={12} />
                                  {formatTime(route.createdAt)}
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Cleared
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No cleared routes</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="all" className="m-0">
                  {routes.length > 0 ? (
                    <div className="divide-y">
                      {routes.map(route => (
                        <div 
                          key={route.id} 
                          className="p-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedRoute(route)}
                        >
                          <div className="flex justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{route.ambulanceId}</h4>
                                {route.priority === 'critical' && getPriorityBadge(route.priority)}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{route.startLocation} → {route.endLocation}</p>
                            </div>
                            {getStatusBadge(route.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No routes found</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrafficCone size={18} />
                Traffic Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium">Main Street & Broadway</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Current: Green E/W</span>
                    <Button size="sm" variant="outline" className="gap-1">
                      <RotateCw size={14} />
                      Override
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium">5th Avenue & Park Place</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Current: Green N/S</span>
                    <Button size="sm" variant="outline" className="gap-1">
                      <RotateCw size={14} />
                      Override
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer bg-yellow-50">
                  <h3 className="font-medium">Highway 101 Exit 24</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <AlertCircle size={14} className="text-amber-500 mr-1" />
                      <span className="text-sm text-amber-700">Congestion Alert</span>
                    </div>
                    <Button size="sm" className="gap-1 bg-amber-500 hover:bg-amber-600">
                      <RotateCw size={14} />
                      Clear
                    </Button>
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

export default TrafficPortal;
