
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane, MapPin, Clock, Package, Battery, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DroneDelivery {
  id: string;
  medication: string;
  destination: string;
  status: 'preparing' | 'in_flight' | 'delivered' | 'failed';
  estimatedTime: number;
  progress: number;
  battery: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface AvailableDrone {
  id: string;
  name: string;
  battery: number;
  location: string;
  capacity: number;
  status: 'available' | 'busy' | 'maintenance';
}

const DroneDelivery: React.FC = () => {
  const { toast } = useToast();
  const [deliveries, setDeliveries] = useState<DroneDelivery[]>([]);
  const [availableDrones, setAvailableDrones] = useState<AvailableDrone[]>([]);
  const [newDelivery, setNewDelivery] = useState({
    medication: '',
    destination: '',
    priority: 'medium'
  });

  useEffect(() => {
    // Simulate active deliveries
    setDeliveries([
      {
        id: '1',
        medication: 'Epinephrine Auto-Injector',
        destination: 'Kathmandu University Hospital',
        status: 'in_flight',
        estimatedTime: 8,
        progress: 65,
        battery: 78,
        priority: 'critical'
      },
      {
        id: '2',
        medication: 'Insulin Vials',
        destination: 'Patan Hospital Emergency',
        status: 'preparing',
        estimatedTime: 12,
        progress: 0,
        battery: 95,
        priority: 'high'
      }
    ]);

    setAvailableDrones([
      {
        id: '1',
        name: 'MediDrone-Alpha',
        battery: 95,
        location: 'Central Pharmacy Hub',
        capacity: 2.5,
        status: 'available'
      },
      {
        id: '2',
        name: 'MediDrone-Beta',
        battery: 82,
        location: 'City Hospital',
        capacity: 5.0,
        status: 'busy'
      },
      {
        id: '3',
        name: 'MediDrone-Gamma',
        battery: 45,
        location: 'Emergency Depot',
        capacity: 1.8,
        status: 'available'
      }
    ]);

    // Simulate delivery progress updates
    const interval = setInterval(() => {
      setDeliveries(prev => prev.map(delivery => {
        if (delivery.status === 'in_flight' && delivery.progress < 100) {
          const newProgress = Math.min(delivery.progress + 5, 100);
          const newStatus = newProgress === 100 ? 'delivered' : 'in_flight';
          return {
            ...delivery,
            progress: newProgress,
            status: newStatus,
            estimatedTime: Math.max(0, delivery.estimatedTime - 1)
          };
        }
        return delivery;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateDelivery = () => {
    if (!newDelivery.medication || !newDelivery.destination) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const availableDrone = availableDrones.find(drone => drone.status === 'available' && drone.battery > 50);
    
    if (!availableDrone) {
      toast({
        title: "No Drones Available",
        description: "All drones are currently busy or require charging.",
        variant: "destructive"
      });
      return;
    }

    const delivery: DroneDelivery = {
      id: Date.now().toString(),
      medication: newDelivery.medication,
      destination: newDelivery.destination,
      status: 'preparing',
      estimatedTime: Math.floor(Math.random() * 20) + 5,
      progress: 0,
      battery: availableDrone.battery,
      priority: newDelivery.priority as any
    };

    setDeliveries(prev => [delivery, ...prev]);
    setNewDelivery({ medication: '', destination: '', priority: 'medium' });

    toast({
      title: "Delivery Scheduled",
      description: `Drone delivery has been scheduled for ${newDelivery.medication}.`
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_flight': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDroneStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-amber-100 text-amber-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Delivery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Schedule Drone Delivery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="medication">Medication/Supplies</Label>
              <Input
                id="medication"
                placeholder="Enter medication name"
                value={newDelivery.medication}
                onChange={(e) => setNewDelivery(prev => ({ ...prev, medication: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Enter delivery address"
                value={newDelivery.destination}
                onChange={(e) => setNewDelivery(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={newDelivery.priority} onValueChange={(value) => setNewDelivery(prev => ({ ...prev, priority: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="critical">Critical/Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreateDelivery} className="w-full">
            Schedule Drone Delivery
          </Button>
        </CardContent>
      </Card>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-green-600" />
            Active Deliveries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{delivery.medication}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {delivery.destination}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(delivery.priority)}>
                    {delivery.priority}
                  </Badge>
                  <Badge className={getStatusColor(delivery.status)}>
                    {delivery.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              
              {delivery.status === 'in_flight' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Delivery Progress</span>
                    <span>{delivery.progress}%</span>
                  </div>
                  <Progress value={delivery.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ETA: {delivery.estimatedTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Battery className="h-3 w-3" />
                      {delivery.battery}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Drones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-purple-600" />
            Drone Fleet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableDrones.map((drone) => (
              <div key={drone.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{drone.name}</h3>
                  <Badge className={getDroneStatusColor(drone.status)}>
                    {drone.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {drone.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Battery className="h-3 w-3" />
                      {drone.battery}%
                    </span>
                    <span>{drone.capacity}kg capacity</span>
                  </div>
                  {drone.battery < 50 && (
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertCircle className="h-3 w-3" />
                      Low battery
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DroneDelivery;
