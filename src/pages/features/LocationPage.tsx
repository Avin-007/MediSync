
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LocationPage = () => {
  const { user } = useAuth();
  
  // Role-specific title
  const getRoleSpecificTitle = () => {
    switch(user?.role) {
      case 'user':
        return 'Health Facilities';
      case 'ambulance':
        return 'Emergency Locations';
      case 'hospital':
        return 'Facility Map';
      case 'traffic':
        return 'Traffic Management Map';
      case 'nurse':
        return 'Care Locations';
      default:
        return 'Locations';
    }
  };

  return (
    <DashboardLayout
      title={getRoleSpecificTitle()}
      description="Find and manage healthcare locations"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <CardTitle className="mb-6 text-2xl">Location Services</CardTitle>
              <p className="text-gray-500">
                Location features are being developed and will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LocationPage;
