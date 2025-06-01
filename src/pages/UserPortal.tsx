import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import HealthCard from '@/components/user/HealthCard';
import UserProfile from '@/components/user/UserProfile';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import HealthOverview from '@/components/user/HealthOverview';
import {
  LayoutDashboard,
  User,
  Notebook,
  AlertTriangle,
  Settings
} from 'lucide-react';

const UserPortal = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <HealthOverview />;
      case 'health-card':
        return <HealthCard />;
      case 'profile':
        return <UserProfile />;
      case 'emergency':
        return <EmergencyRequest />;
      default:
        return <HealthOverview />;
    }
  };

  const menuItems = [
    {
      id: 'overview',
      title: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'health-card',
      title: 'Health Card',
      icon: Notebook,
    },
    {
      id: 'profile',
      title: 'Profile & Security',
      icon: User,
    },
    {
      id: 'emergency',
      title: 'Emergency Request',
      icon: AlertTriangle,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <DashboardLayout 
      title="Patient Portal" 
      menuItems={menuItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default UserPortal;
