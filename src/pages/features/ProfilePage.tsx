
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const ProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout
      title="My Profile"
      description={`Manage your personal information and settings, ${user?.name}`}
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <p className="text-gray-500 mb-2">
            This page is under construction. The profile functionality will be available soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
