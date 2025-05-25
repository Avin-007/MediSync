
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Heart, Activity, Thermometer, Droplet, Wifi, WifiOff, AlertTriangle, Battery } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface IoTDevice {
  id: string;
  name: string;
  type: 'heart_monitor' | 'glucose_meter' | 'blood_pressure' | 'thermometer' | 'fitness_tracker';
  status: 'connected' | 'disconnected' | 'low_battery';
  battery: number;
  lastReading: string;
  value: number;
  unit: string;
  alertsEnabled: boolean;
}

interface VitalReading {
  timestamp: string;
  heartRate: number;
  bloodPressure: number;
  temperature: number;
  glucose: number;
}

const DeviceMonitoring: React.FC = () => {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [vitalHistory, setVitalHistory] = useState<VitalReading[]>([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Simulate IoT devices
    setDevices([
      {
        id: '1',
        name: 'Heart Rate Monitor',
        type: 'heart_monitor',
        status: 'connected',
        battery: 85,
        lastReading: '2 min ago',
        value: 72,
        unit: 'bpm',
        alertsEnabled: true
      },
      {
        id: '2',
        name: 'Blood Pressure Cuff',
        type: 'blood_pressure',
        status: 'connected',
        battery: 60,
        lastReading: '5 min ago',
        value: 120,
        unit: 'mmHg',
        alertsEnabled: true
      },
      {
        id: '3',
        name: 'Glucose Meter',
        type: 'glucose_meter',
        status: 'low_battery',
        battery: 15,
        lastReading: '1 hour ago',
        value: 95,
        unit: 'mg/dL',
        alertsEnabled: true
      },
      {
        id: '4',
        name: 'Smart Thermometer',
        type: 'thermometer',
        status: 'disconnected',
        battery: 0,
        lastReading: '2 days ago',
        value: 98.6,
        unit: '°F',
        alertsEnabled: false
      }
    ]);

    // Generate sample vital history
    const generateVitalHistory = () => {
      const history = [];
      for (let i = 23; i >= 0; i--) {
        history.push({
          timestamp: `${i}:00`,
          heartRate: 65 + Math.random() * 20,
          bloodPressure: 115 + Math.random() * 15,
          temperature: 98 + Math.random() * 2,
          glucose: 85 + Math.random() * 25
        });
      }
      return history;
    };

    setVitalHistory(generateVitalHistory());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => {
        if (device.status === 'connected') {
          return {
            ...device,
            value: generateRandomVital(device.type),
            lastReading: 'Just now'
          };
        }
        return device;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomVital = (type: string): number => {
    switch (type) {
      case 'heart_monitor': return 65 + Math.random() * 20;
      case 'blood_pressure': return 115 + Math.random() * 15;
      case 'glucose_meter': return 85 + Math.random() * 25;
      case 'thermometer': return 98 + Math.random() * 2;
      default: return 0;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'heart_monitor': return <Heart className="h-5 w-5" />;
      case 'blood_pressure': return <Activity className="h-5 w-5" />;
      case 'glucose_meter': return <Droplet className="h-5 w-5" />;
      case 'thermometer': return <Thermometer className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'low_battery': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleAlerts = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, alertsEnabled: !device.alertsEnabled }
        : device
    ));
  };

  const checkForAbnormalReadings = (value: number, type: string): boolean => {
    switch (type) {
      case 'heart_monitor': return value < 60 || value > 100;
      case 'blood_pressure': return value < 90 || value > 140;
      case 'glucose_meter': return value < 70 || value > 140;
      case 'thermometer': return value < 97 || value > 99.5;
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Device Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {devices.map((device) => (
          <Card key={device.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getDeviceIcon(device.type)}
                  <span className="font-medium text-sm">{device.name}</span>
                </div>
                {device.status === 'connected' ? (
                  <Wifi className="h-4 w-4 text-green-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(device.status)}>
                  {device.status.replace('_', ' ')}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Battery className="h-3 w-3" />
                  {device.battery}%
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold flex items-baseline justify-center gap-1">
                  {checkForAbnormalReadings(device.value, device.type) && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  <span className={checkForAbnormalReadings(device.value, device.type) ? 'text-red-600' : ''}>
                    {device.value.toFixed(1)}
                  </span>
                  <span className="text-sm font-normal text-gray-500">{device.unit}</span>
                </div>
                <p className="text-xs text-gray-500">{device.lastReading}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs">Alerts</span>
                <Switch 
                  checked={device.alertsEnabled}
                  onCheckedChange={() => toggleAlerts(device.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Alerts */}
      {emergencyAlerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Emergency alert triggered! Abnormal readings detected. Emergency services have been notified.
          </AlertDescription>
        </Alert>
      )}

      {/* Vital Signs Chart */}
      <Card>
        <CardHeader>
          <CardTitle>24-Hour Vital Signs Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Heart Rate" />
                <Line type="monotone" dataKey="bloodPressure" stroke="#3b82f6" name="Blood Pressure" />
                <Line type="monotone" dataKey="glucose" stroke="#10b981" name="Glucose" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Device Management */}
      <Card>
        <CardHeader>
          <CardTitle>Device Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" variant="outline">
            Add New Device
          </Button>
          <Button className="w-full" variant="outline">
            Sync All Devices
          </Button>
          <Button className="w-full" variant="outline">
            Export Health Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceMonitoring;
