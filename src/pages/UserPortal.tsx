
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, Activity, Brain, Stethoscope, TestTube, Ambulance, 
  Hospital, Users, MessageSquare, Wallet, Calendar, Bell,
  Grid3X3, List, Search, Filter, Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import HealthCard from '@/components/user/HealthCard';
import HealthOverview from '@/components/user/HealthOverview';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import EmergencyStatus from '@/components/user/EmergencyStatus';

// Import service components
import LabServices from '@/components/user/LabServices';
import HospitalServices from '@/components/user/HospitalServices';
import ReportNotifications from '@/components/user/ReportNotifications';
import HealthPredictor from '@/components/ai/HealthPredictor';
import HealthRecords from '@/components/blockchain/HealthRecords';
import DeviceMonitoring from '@/components/iot/DeviceMonitoring';
import DroneDelivery from '@/components/emergency/DroneDelivery';
import VirtualConsultation from '@/components/telemedicine/VirtualConsultation';
import HealthNetwork from '@/components/community/HealthNetwork';
import MentalHealthSupport from '@/components/mental-health/MentalHealthSupport';
import MedicationMarketplace from '@/components/user/MedicationMarketplace';
import InAppCommunication from '@/components/user/InAppCommunication';
import PaymentCenter from '@/components/user/PaymentCenter';

const UserPortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [hasActiveEmergency, setHasActiveEmergency] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: <Grid3X3 size={16} /> },
    { id: 'health', name: 'Health & Wellness', icon: <Heart size={16} /> },
    { id: 'emergency', name: 'Emergency', icon: <Ambulance size={16} /> },
    { id: 'medical', name: 'Medical Services', icon: <Stethoscope size={16} /> },
    { id: 'communication', name: 'Communication', icon: <MessageSquare size={16} /> },
    { id: 'finance', name: 'Payments', icon: <Wallet size={16} /> },
  ];

  const services = [
    {
      id: 'health-overview',
      name: 'Health Overview',
      description: 'View your complete health dashboard with vital stats',
      icon: <Activity size={24} />,
      category: 'health',
      color: 'from-blue-500 to-blue-600',
      component: 'health-overview'
    },
    {
      id: 'emergency',
      name: 'Emergency Services',
      description: '24/7 emergency response and ambulance services',
      icon: <Ambulance size={24} />,
      category: 'emergency',
      color: 'from-red-500 to-red-600',
      component: 'emergency',
      urgent: hasActiveEmergency
    },
    {
      id: 'ai-health',
      name: 'AI Health Assistant',
      description: 'Smart health predictions and recommendations',
      icon: <Brain size={24} />,
      category: 'health',
      color: 'from-purple-500 to-purple-600',
      component: 'ai-health'
    },
    {
      id: 'telemedicine',
      name: 'Virtual Consultations',
      description: 'Connect with doctors via video calls',
      icon: <Stethoscope size={24} />,
      category: 'medical',
      color: 'from-green-500 to-green-600',
      component: 'telemedicine'
    },
    {
      id: 'lab-services',
      name: 'Lab Services',
      description: 'Book tests, view reports, track health metrics',
      icon: <TestTube size={24} />,
      category: 'medical',
      color: 'from-cyan-500 to-cyan-600',
      component: 'lab-services'
    },
    {
      id: 'hospital-services',
      name: 'Hospital Network',
      description: 'Find hospitals, book appointments, manage visits',
      icon: <Hospital size={24} />,
      category: 'medical',
      color: 'from-indigo-500 to-indigo-600',
      component: 'hospital-services'
    },
    {
      id: 'health-network',
      name: 'Health Community',
      description: 'Connect with patients and health professionals',
      icon: <Users size={24} />,
      category: 'communication',
      color: 'from-pink-500 to-pink-600',
      component: 'community'
    },
    {
      id: 'communication',
      name: 'Secure Messaging',
      description: 'Chat securely with healthcare providers',
      icon: <MessageSquare size={24} />,
      category: 'communication',
      color: 'from-teal-500 to-teal-600',
      component: 'communication'
    },
    {
      id: 'payments',
      name: 'Payment Center',
      description: 'Manage payments, insurance, and billing',
      icon: <Wallet size={24} />,
      category: 'finance',
      color: 'from-amber-500 to-amber-600',
      component: 'payments'
    }
  ];

  const [activeService, setActiveService] = useState('health-overview');

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRequestSubmit = (requestType: string) => {
    setHasActiveEmergency(true);
    toast({
      title: `${requestType} Requested`,
      description: `Your ${requestType} request has been submitted successfully.`,
    });
  };

  const handleCancelEmergency = () => {
    setHasActiveEmergency(false);
    toast({
      title: "Emergency Cancelled",
      description: "Your emergency request has been cancelled.",
    });
  };

  const renderServiceContent = () => {
    switch (activeService) {
      case 'health-overview':
        return <HealthOverview />;
      case 'emergency':
        return (
          <div className="space-y-6">
            {hasActiveEmergency ? (
              <EmergencyStatus active={true} onCancel={handleCancelEmergency} />
            ) : (
              <EmergencyRequest onSubmit={handleRequestSubmit} />
            )}
          </div>
        );
      case 'ai-health':
        return <HealthPredictor />;
      case 'telemedicine':
        return <VirtualConsultation />;
      case 'lab-services':
        return <LabServices />;
      case 'hospital-services':
        return <HospitalServices />;
      case 'community':
        return <HealthNetwork />;
      case 'communication':
        return <InAppCommunication />;
      case 'payments':
        return <PaymentCenter />;
      default:
        return <HealthOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Heart size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MediSync
                  </h1>
                  <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {hasActiveEmergency && (
                <Badge variant="destructive" className="animate-pulse">
                  Emergency Active
                </Badge>
              )}
              <Button variant="outline" size="icon">
                <Bell size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Health Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <HealthCard />
              
              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Health Score</span>
                      <span className="font-bold text-green-600">95/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Upcoming</span>
                      <span className="font-bold text-blue-600">2 appts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Medications</span>
                      <span className="font-bold text-purple-600">3 active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Service Navigation */}
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-xl">Health Services</CardTitle>
                      <p className="text-gray-500">Access all your healthcare needs in one place</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 size={16} />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                      {serviceCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className="whitespace-nowrap"
                        >
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Services Grid/List */}
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" 
                    : "space-y-3"
                  }>
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className={`group cursor-pointer transition-all duration-300 ${
                          viewMode === 'grid'
                            ? 'bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1'
                            : 'bg-white rounded-lg p-3 border border-gray-100 hover:border-blue-200 hover:shadow-md flex items-center'
                        } ${activeService === service.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                        onClick={() => setActiveService(service.id)}
                      >
                        <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'items-center space-x-4 flex-1'}`}>
                          <div className={`${viewMode === 'grid' ? 'mb-3' : ''}`}>
                            <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                              {service.icon}
                            </div>
                          </div>
                          <div className={viewMode === 'grid' ? '' : 'flex-1'}>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{service.name}</h3>
                              {service.urgent && (
                                <Badge variant="destructive" className="text-xs animate-pulse">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className={`text-gray-600 ${viewMode === 'grid' ? 'text-sm' : 'text-xs'}`}>
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Service Content */}
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
                <CardContent className="p-6">
                  {renderServiceContent()}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
