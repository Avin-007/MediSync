
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

const UserPortal = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user } = useAuth();

  const quickStats = [
    { label: 'Health Score', value: '94%', color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Appointments', value: '3', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Reports', value: '12', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Consultations', value: '8', color: 'text-orange-600', bgColor: 'bg-orange-100' }
  ];

  const telehealthServices = [
    { 
      title: 'Video Consultation', 
      description: 'Connect with doctors virtually',
      icon: Video,
      color: 'bg-blue-500',
      available: true
    },
    { 
      title: 'HL7 Records Exchange', 
      description: 'Secure health data sharing',
      icon: Database,
      color: 'bg-green-500',
      available: true
    },
    { 
      title: 'Remote Monitoring', 
      description: 'IoT device integration',
      icon: Activity,
      color: 'bg-purple-500',
      available: true
    },
    { 
      title: 'AI Health Analysis', 
      description: 'Smart health insights',
      icon: Stethoscope,
      color: 'bg-orange-500',
      available: true
    }
  ];

  const upcomingAppointments = [
    {
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      time: 'Today, 2:00 PM',
      type: 'Video Call',
      urgent: false
    },
    {
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      time: 'Tomorrow, 10:30 AM',
      type: 'In-Person',
      urgent: true
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 mt-1">Your health journey continues today</p>
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity
            }}
          >
            <Heart size={48} className="text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <CardContent className="p-4">
                <div className={`${stat.bgColor} ${stat.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Telehealth Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="text-blue-500" size={24} />
            Telehealth Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {telehealthServices.map((service, index) => (
              <motion.div
                key={service.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border rounded-xl cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`${service.color} rounded-lg p-2`}>
                    <service.icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  {service.available && (
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="text-purple-500" size={24} />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-l-4 ${
                  appointment.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{appointment.doctor}</h3>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <p className="text-sm font-medium text-blue-600">{appointment.time}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={appointment.type === 'Video Call' ? 'default' : 'secondary'}>
                      {appointment.type === 'Video Call' ? <Video size={12} className="mr-1" /> : <MapPin size={12} className="mr-1" />}
                      {appointment.type}
                    </Badge>
                    {appointment.urgent && (
                      <Badge className="ml-2 bg-red-100 text-red-800">Urgent</Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Video, label: 'Start Video Call', color: 'bg-blue-500' },
              { icon: Camera, label: 'Upload Report', color: 'bg-green-500' },
              { icon: Pill, label: 'Medication', color: 'bg-purple-500' },
              { icon: Phone, label: 'Emergency', color: 'bg-red-500' }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} text-white p-4 rounded-xl flex flex-col items-center gap-2 transition-all`}
              >
                <action.icon size={24} />
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* HL7 Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="text-green-500" size={24} />
            HL7 FHIR Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Health Records Sync</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <Progress value={95} className="h-2" />
            <p className="text-sm text-gray-600">
              Your health data is securely synced across all connected healthcare providers using HL7 FHIR standards.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'health-card':
        return <HealthCard />;
      case 'profile':
        return <UserProfile />;
      case 'emergency':
        return <EmergencyRequest />;
      default:
        return renderDashboard();
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
