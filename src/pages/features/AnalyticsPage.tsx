
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsPage = () => {
  const { user } = useAuth();
  const role = user?.role || '';

  // Role-specific title
  const getRoleSpecificTitle = () => {
    switch(role) {
      case 'user':
        return 'Personal Health Analytics';
      case 'ambulance':
        return 'Ambulance Service Analytics';
      case 'hospital':
        return 'Hospital Performance Analytics';
      case 'traffic':
        return 'Traffic Management Analytics';
      case 'nurse':
        return 'Care Delivery Analytics';
      default:
        return 'Analytics Dashboard';
    }
  };

  return (
    <DashboardLayout
      title={getRoleSpecificTitle()}
      description="Track key metrics and performance indicators"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <CardTitle className="mb-6 text-2xl">Analytics Dashboard</CardTitle>
              <p className="text-gray-500">
                Analytics features are being developed and will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
