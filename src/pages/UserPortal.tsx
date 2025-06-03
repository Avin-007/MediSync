import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import HealthCard from '@/components/user/HealthCard';
import UserProfile from '@/components/user/UserProfile';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import HealthOverview from '@/components/user/HealthOverview';
import LabServices from '@/components/user/LabServices';
import HospitalServices from '@/components/user/HospitalServices';
import ReportNotifications from '@/components/user/ReportNotifications';
import SymptomTracker from '@/components/user/SymptomTracker';
import InAppCommunication from '@/components/user/InAppCommunication';
import BloodDonation from '@/components/user/BloodDonation';
import FamilyRecords from '@/components/user/FamilyRecords';
import MedicationMarketplace from '@/components/user/MedicationMarketplace';
import PaymentCenter from '@/components/user/PaymentCenter';
import WeatherHealthAlerts from '@/components/user/WeatherHealthAlerts';
import HealthEvents from '@/components/user/HealthEvents';
import DoctorFinder from '@/components/user/DoctorFinder';
import EmergencyStatus from '@/components/user/EmergencyStatus';
import {
  LayoutDashboard,
  User,
  Notebook,
  AlertTriangle,
  Settings,
  TestTube,
  Hospital,
  FileText,
  Bot,
  MessageSquare,
  Heart,
  Users,
  ShoppingCart,
  CreditCard,
  Cloud,
  Calendar,
  UserPlus,
  Activity,
  Stethoscope,
  Video,
  Brain,
  Gamepad2,
  Smartphone
} from 'lucide-react';

import ChatbotButton from '@/components/ai/ChatbotButton';

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
      case 'emergency-status':
        return <EmergencyStatus />;
      case 'lab-services':
        return <LabServices />;
      case 'hospital-services':
        return <HospitalServices />;
      case 'reports':
        return <ReportNotifications />;
      case 'ai-health':
        return <SymptomTracker />;
      case 'communication':
        return <InAppCommunication />;
      case 'blood-donation':
        return <BloodDonation />;
      case 'family-records':
        return <FamilyRecords />;
      case 'marketplace':
        return <MedicationMarketplace />;
      case 'payments':
        return <PaymentCenter />;
      case 'weather-alerts':
        return <WeatherHealthAlerts />;
      case 'health-events':
        return <HealthEvents />;
      case 'doctor-finder':
        return <DoctorFinder />;
      default:
        return <HealthOverview />;
    }
  };

  const menuItems = [
    {
      id: 'overview',
      title: 'Health Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'health-card',
      title: 'Health Card',
      icon: Notebook,
    },
    {
      id: 'emergency',
      title: 'Emergency Request',
      icon: AlertTriangle,
    },
    {
      id: 'emergency-status',
      title: 'Emergency Status',
      icon: Activity,
    },
    {
      id: 'lab-services',
      title: 'Lab Services',
      icon: TestTube,
    },
    {
      id: 'hospital-services',
      title: 'Hospital Services',
      icon: Hospital,
    },
    {
      id: 'reports',
      title: 'Reports & Results',
      icon: FileText,
    },
    {
      id: 'ai-health',
      title: 'AI Health Assistant',
      icon: Bot,
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: MessageSquare,
    },
    {
      id: 'doctor-finder',
      title: 'Find Doctors',
      icon: Stethoscope,
    },
    {
      id: 'blood-donation',
      title: 'Blood Donation',
      icon: Heart,
    },
    {
      id: 'family-records',
      title: 'Family Records',
      icon: Users,
    },
    {
      id: 'marketplace',
      title: 'Medication Store',
      icon: ShoppingCart,
    },
    {
      id: 'payments',
      title: 'Payment Center',
      icon: CreditCard,
    },
    {
      id: 'weather-alerts',
      title: 'Weather Health Alerts',
      icon: Cloud,
    },
    {
      id: 'health-events',
      title: 'Health Events',
      icon: Calendar,
    },
    {
      id: 'profile',
      title: 'Profile & Security',
      icon: User,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <>
      <DashboardLayout 
        title="Patient Portal" 
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      >
        {renderContent()}
      </DashboardLayout>
      
      {/* AI Chatbot for User Dashboard */}
      <ChatbotButton />
    </>
  );
};

export default UserPortal;
