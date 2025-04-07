
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';

const StatusUpdater: React.FC = () => {
  const [status, setStatus] = useState('available');
  const { toast } = useToast();

  const statusOptions = [
    { value: 'available', label: 'Available', color: 'text-green-600' },
    { value: 'responding', label: 'Responding to Emergency', color: 'text-medisync-red' },
    { value: 'transporting', label: 'Transporting Patient', color: 'text-yellow-600' },
    { value: 'returning', label: 'Returning to Base', color: 'text-blue-600' },
    { value: 'offline', label: 'Offline/Maintenance', color: 'text-gray-600' },
  ];

  const updateStatus = () => {
    toast({
      title: "Status Updated",
      description: `Your status has been updated to ${statusOptions.find(opt => opt.value === status)?.label}`,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Ambulance Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className={option.color}>{option.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={`p-3 rounded-md ${getStatusColor(status)}`}>
          {getStatusMessage(status)}
        </div>
        
        <Button 
          onClick={updateStatus}
          className="w-full bg-medisync-blue hover:bg-medisync-blue/90"
        >
          Update Status
        </Button>
      </CardContent>
    </Card>
  );
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'responding':
      return 'bg-medisync-light-red text-medisync-red';
    case 'transporting':
      return 'bg-yellow-100 text-yellow-800';
    case 'returning':
      return 'bg-blue-100 text-blue-800';
    case 'offline':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case 'available':
      return 'You are available for new assignments';
    case 'responding':
      return 'You are responding to an emergency call';
    case 'transporting':
      return 'You are transporting a patient to a medical facility';
    case 'returning':
      return 'You are returning to base station';
    case 'offline':
      return 'You are currently offline or in maintenance';
    default:
      return '';
  }
}

export default StatusUpdater;
