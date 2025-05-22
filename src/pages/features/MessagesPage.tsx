
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MessagesPage = () => {
  const { user } = useAuth();
  
  // Role-specific title
  const getRoleSpecificTitle = () => {
    switch(user?.role) {
      case 'user':
        return 'My Messages';
      case 'ambulance':
        return 'Communication Center';
      case 'hospital':
        return 'Hospital Communications';
      case 'traffic':
        return 'Traffic Coordination';
      case 'nurse':
        return 'Care Communications';
      default:
        return 'Messages';
    }
  };

  return (
    <DashboardLayout
      title={getRoleSpecificTitle()}
      description="Communicate with healthcare providers and services"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <CardTitle className="mb-6 text-2xl">Messaging Center</CardTitle>
              <p className="text-gray-500">
                Communication features are being developed and will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
