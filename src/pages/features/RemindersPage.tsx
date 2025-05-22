
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RemindersPage = () => {
  const { user } = useAuth();
  
  // Role-specific title
  const getRoleSpecificTitle = () => {
    switch(user?.role) {
      case 'user':
        return 'My Reminders';
      case 'ambulance':
        return 'Service Reminders';
      case 'hospital':
        return 'Hospital Reminders';
      case 'traffic':
        return 'Traffic Management Reminders';
      case 'nurse':
        return 'Care Reminders';
      default:
        return 'Reminders';
    }
  };

  return (
    <DashboardLayout
      title={getRoleSpecificTitle()}
      description="Never forget what's important"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <CardTitle className="mb-6 text-2xl">Reminders</CardTitle>
              <p className="text-gray-500">
                Reminder features are being developed and will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RemindersPage;
