
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LayoutDashboard,
  User,
  Notebook,
  AlertTriangle,
  Settings,
  Stethoscope,
  Heart,
  Activity,
  Calendar,
  MessageSquare,
  Video,
  FileText,
  Shield,
  Database,
  Bell,
  Pill,
  Users,
  MapPin,
  Camera,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import HealthCard from '@/components/user/HealthCard';
import UserProfile from '@/components/user/UserProfile';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import HealthOverview from '@/components/user/HealthOverview';
import BloodDonation from '@/components/user/BloodDonation';
import FamilyRecords from '@/components/user/FamilyRecords';

const UserPortal = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <HealthOverview />;
      case 'health-card':
        return <HealthCard />;
      case 'profile':
        return <UserProfile />;
      case 'emergency':
        return <EmergencyRequest />;
      case 'blood-donation':
        return <BloodDonation />;
      case 'family-records':
        return <FamilyRecords />;
      default:
        return <HealthOverview />;
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'health-card',
      title: 'Health Card',
      icon: Notebook,
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
      id: 'profile',
      title: 'Profile & Security',
      icon: User,
    },
    {
      id: 'emergency',
      title: 'Emergency',
      icon: AlertTriangle,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-white shadow-xl border-r min-h-screen"
        >
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Stethoscope size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Patient Portal</h2>
                <p className="text-sm text-gray-600">HL7 FHIR Enabled</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.title}</span>
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
