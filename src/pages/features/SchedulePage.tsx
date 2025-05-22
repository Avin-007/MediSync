
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SchedulePage = () => {
  const { user } = useAuth();
  
  // Role-specific title
  const getRoleSpecificTitle = () => {
    switch(user?.role) {
      case 'user':
        return 'Personal Schedule';
      case 'ambulance':
        return 'Service Schedule';
      case 'hospital':
        return 'Facility Schedule';
      case 'traffic':
        return 'Traffic Management Schedule';
      case 'nurse':
        return 'Care Schedule';
      default:
        return 'Schedule';
    }
  };

  return (
    <DashboardLayout
      title={getRoleSpecificTitle()}
      description="Manage your appointments, meetings, and reminders"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <CardTitle className="mb-6 text-2xl">Schedule Management</CardTitle>
              <p className="text-gray-500">
                Schedule management features are being developed and will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePage;
