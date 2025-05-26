import React, { useState, useEffect } from 'react';
import MapComponent from '@/components/MapComponent';
import EmergencyRequest from '@/components/user/EmergencyRequest';
import EmergencyStatus from '@/components/user/EmergencyStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertCircle, Clock, BarChart, Brain, Stethoscope, ShoppingCart, PhoneCall, 
  Droplet, Users, Wallet, CloudRain, CalendarCheck, MessageSquare, Bell,
  Plane, Shield, Activity, Heart, TrendingUp, Zap, TestTube, Bed, User
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import HealthOverview from '@/components/user/HealthOverview';
import SymptomTracker from '@/components/user/SymptomTracker';
import DoctorFinder from '@/components/user/DoctorFinder';
import MedicationMarketplace from '@/components/user/MedicationMarketplace';
import BloodDonation from '@/components/user/BloodDonation';
import FamilyRecords from '@/components/user/FamilyRecords';
import PaymentCenter from '@/components/user/PaymentCenter';
import WeatherHealthAlerts from '@/components/user/WeatherHealthAlerts';
import HealthCard from '@/components/user/HealthCard';
import InAppCommunication from '@/components/user/InAppCommunication';
import HealthEvents from '@/components/user/HealthEvents';
import AnalyticsWidget from '@/components/dashboard/AnalyticsWidget';
import RemindersWidget from '@/components/dashboard/RemindersWidget';
import ScheduleWidget from '@/components/dashboard/ScheduleWidget';

// Import new comprehensive features
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

const UserPortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [hasActiveEmergency, setHasActiveEmergency] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reminders, setReminders] = useState([
    { 
      id: '1', 
      title: language === 'en' ? 'Take Blood Pressure Medication' : 'रक्तचाप औषधि लिनुहोस्', 
      time: '08:00 AM', 
      priority: 'high' as const, 
      completed: false 
    },
    { 
      id: '2', 
      title: language === 'en' ? 'Doctor Appointment' : 'डाक्टर भेट्ने समय', 
      time: '10:30 AM', 
      priority: 'medium' as const, 
      completed: false 
    },
    { 
      id: '3', 
      title: language === 'en' ? 'Drink Water' : 'पानी पिउनुहोस्', 
      time: '12:00 PM', 
      priority: 'low' as const, 
      completed: true 
    }
  ]);
  
  const [scheduleEvents, setScheduleEvents] = useState([
    { 
      id: '1',
      title: language === 'en' ? 'Annual Health Checkup' : 'वार्षिक स्वास्थ्य जाँच',
      time: '09:00 AM - 10:30 AM',
      location: 'Bir Hospital',
      assignee: 'Dr. Sharma',
      status: 'upcoming' as const,
      type: 'appointment' as const
    },
    { 
      id: '2',
      title: language === 'en' ? 'Blood Test Results' : 'रगत परीक्षण परिणाम',
      time: '02:00 PM - 02:30 PM',
      location: 'Lab Department',
      assignee: 'Dr. Poudel',
      status: 'upcoming' as const,
      type: 'appointment' as const
    }
  ]);

  // Mock analytics data
  const healthTrendsData = [
    { name: 'Jan', bp: 120, glucose: 100, weight: 70 },
    { name: 'Feb', bp: 125, glucose: 105, weight: 72 },
    { name: 'Mar', bp: 123, glucose: 103, weight: 71 },
    { name: 'Apr', bp: 130, glucose: 110, weight: 73 },
    { name: 'May', bp: 127, glucose: 108, weight: 72 },
  ];

  const handleRequestSubmit = (requestType: string) => {
    setHasActiveEmergency(true);
    
    toast({
      title: language === 'en' 
        ? `${requestType === 'ambulance' ? 'Ambulance' : 'Nurse'} Requested` 
        : `${requestType === 'ambulance' ? 'एम्बुलेन्स' : 'नर्स'} अनुरोध गरियो`,
      description: language === 'en'
        ? `Your ${requestType} request has been submitted successfully. Help is on the way.`
        : `तपाईंको ${requestType === 'ambulance' ? 'एम्बुलेन्स' : 'नर्स'} अनुरोध सफलतापूर्वक पेश गरिएको छ। सहयोग आउँदैछ।`,
    });
  };

  const handleCancelEmergency = () => {
    setHasActiveEmergency(false);
    
    toast({
      title: t('cancel'),
      description: language === 'en'
        ? "Your emergency request has been cancelled."
        : "तपाईंको आपतकालीन अनुरोध रद्द गरिएको छ।",
    });
  };

  const handleCompleteReminder = (id: string) => {
    setReminders(prev => 
      prev.map(r => r.id === id ? { ...r, completed: true } : r)
    );
  };

  const handleAddScheduleEvent = () => {
    toast({
      title: t('scheduleEvent'),
      description: t('scheduleEventDescription'),
    });
  };

  // Update language-dependent state when language changes
  useEffect(() => {
    setReminders(prev => prev.map(r => ({
      ...r,
      title: r.id === '1' 
        ? (language === 'en' ? 'Take Blood Pressure Medication' : 'रक्तचाप औषधि लिनुहोस्')
        : r.id === '2'
          ? (language === 'en' ? 'Doctor Appointment' : 'डाक्टर भेट्ने समय')
          : (language === 'en' ? 'Drink Water' : 'पानी पिउनुहोस्')
    })));

    setScheduleEvents(prev => prev.map(e => ({
      ...e,
      title: e.id === '1'
        ? (language === 'en' ? 'Annual Health Checkup' : 'वार्षिक स्वास्थ्य जाँच')
        : (language === 'en' ? 'Blood Test Results' : 'रगत परीक्षण परिणाम')
    })));
  }, [language]);

  return (
    <DashboardLayout 
      title={t('patientPortal')} 
      description={`${t('welcome')}, ${user?.name}`}
      headerActions={
        hasActiveEmergency ? (
          <Badge variant="destructive" className="text-sm sm:text-md px-3 sm:px-4 py-1">
            {t('active')} {t('emergency')}
          </Badge>
        ) : null
      }
    >
      <div className="space-y-4 sm:space-y-6">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Responsive tab list with overflow scroll on mobile */}
          <div className="w-full overflow-x-auto">
            <TabsList className="inline-flex w-max min-w-full grid-cols-none gap-1 p-1 h-auto">
              <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <BarChart size={14} />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap relative">
                <AlertCircle size={14} />
                <span className="hidden sm:inline">Emergency</span>
                <span className="sm:hidden">SOS</span>
                {hasActiveEmergency && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </TabsTrigger>
              <TabsTrigger value="lab-services" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <TestTube size={14} />
                <span className="hidden sm:inline">Lab Services</span>
                <span className="sm:hidden">Lab</span>
              </TabsTrigger>
              <TabsTrigger value="hospital-services" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Bed size={14} />
                <span className="hidden sm:inline">Hospitals</span>
                <span className="sm:hidden">Hospital</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Bell size={14} />
                <span className="hidden sm:inline">Reports</span>
                <span className="sm:hidden">Reports</span>
              </TabsTrigger>
              <TabsTrigger value="ai-health" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Brain size={14} />
                <span className="hidden sm:inline">AI Health</span>
                <span className="sm:hidden">AI</span>
              </TabsTrigger>
              <TabsTrigger value="iot" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Activity size={14} />
                <span className="hidden sm:inline">IoT Devices</span>
                <span className="sm:hidden">IoT</span>
              </TabsTrigger>
              <TabsTrigger value="blockchain" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Shield size={14} />
                <span className="hidden sm:inline">Records</span>
                <span className="sm:hidden">Records</span>
              </TabsTrigger>
              <TabsTrigger value="telemedicine" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Stethoscope size={14} />
                <span className="hidden sm:inline">Telemedicine</span>
                <span className="sm:hidden">Tele</span>
              </TabsTrigger>
              <TabsTrigger value="drone" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Plane size={14} />
                <span className="hidden sm:inline">Drone</span>
                <span className="sm:hidden">Drone</span>
              </TabsTrigger>
              <TabsTrigger value="mental-health" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Heart size={14} />
                <span className="hidden sm:inline">Mental Health</span>
                <span className="sm:hidden">Mental</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Users size={14} />
                <span className="hidden sm:inline">Community</span>
                <span className="sm:hidden">Community</span>
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <ShoppingCart size={14} />
                <span className="hidden sm:inline">Marketplace</span>
                <span className="sm:hidden">Shop</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <MessageSquare size={14} />
                <span className="hidden sm:inline">Communication</span>
                <span className="sm:hidden">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                <Wallet size={14} />
                <span className="hidden sm:inline">Payments</span>
                <span className="sm:hidden">Pay</span>
              </TabsTrigger>
            </TabsList>
          </div>
        
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <HealthOverview />
              </div>
              <div>
                <HealthCard />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnalyticsWidget 
                title={t('healthTrends')}
                data={healthTrendsData}
                chartType="area"
                categories={['bp', 'glucose', 'weight']}
              />
              <RemindersWidget 
                reminders={reminders}
                onComplete={handleCompleteReminder}
              />
              <ScheduleWidget 
                events={scheduleEvents}
                onAddEvent={handleAddScheduleEvent}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <WeatherHealthAlerts />
              <HealthEvents />
            </div>
          </TabsContent>
          
          {/* Emergency Tab */}
          <TabsContent value="emergency" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              <div className="xl:col-span-2">
                <Card className="border-2 border-nepal-crimson overflow-hidden">
                  <MapComponent 
                    emergencies={hasActiveEmergency ? [{ name: language === 'en' ? "Active Emergency" : "सक्रिय आपतकालीन", lat: 27.7172, lng: 85.3240 }] : []} 
                  />
                </Card>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {hasActiveEmergency ? (
                  <EmergencyStatus 
                    active={true} 
                    onCancel={handleCancelEmergency}
                  />
                ) : (
                  <EmergencyRequest 
                    onSubmit={handleRequestSubmit}
                  />
                )}
                
                {!hasActiveEmergency && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">{t('emergencyContacts')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 sm:p-4 bg-red-50 border border-red-100 rounded-md flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">{language === 'en' ? 'Emergency Hotline' : 'आपतकालीन हटलाइन'}</h3>
                            <p className="text-xl sm:text-2xl font-bold text-red-600">102</p>
                          </div>
                          <Button 
                            size="icon" 
                            className="rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 h-10 w-10 sm:h-12 sm:w-12"
                          >
                            <PhoneCall size={16} className="sm:w-5 sm:h-5" />
                          </Button>
                        </div>
                        <div className="p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">{language === 'en' ? 'Medical Support' : 'चिकित्सा सहायता'}</h3>
                            <p className="text-xs sm:text-sm">+977-1-4476225</p>
                          </div>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-100 h-10 w-10 sm:h-12 sm:w-12"
                          >
                            <PhoneCall size={16} className="sm:w-5 sm:h-5" />
                          </Button>
                        </div>
                        <div className="p-3 sm:p-4 bg-green-50 border border-green-100 rounded-md flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">{language === 'en' ? 'Nurse On-Call' : 'नर्स अन-कल'}</h3>
                            <p className="text-xs sm:text-sm">+977-1-4478215</p>
                          </div>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="rounded-full border-green-200 text-green-600 hover:bg-green-100 h-10 w-10 sm:h-12 sm:w-12"
                          >
                            <PhoneCall size={16} className="sm:w-5 sm:h-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* All other tabs - keep existing structure but ensure responsive spacing */}
          <TabsContent value="lab-services" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <LabServices />
          </TabsContent>

          <TabsContent value="hospital-services" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <HospitalServices />
          </TabsContent>

          <TabsContent value="reports" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <ReportNotifications />
          </TabsContent>

          <TabsContent value="ai-health" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <HealthPredictor />
          </TabsContent>

          <TabsContent value="iot" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <DeviceMonitoring />
          </TabsContent>

          <TabsContent value="blockchain" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <HealthRecords />
          </TabsContent>

          <TabsContent value="telemedicine" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <VirtualConsultation />
          </TabsContent>

          <TabsContent value="drone" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <DroneDelivery />
          </TabsContent>

          <TabsContent value="mental-health" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <MentalHealthSupport />
          </TabsContent>

          <TabsContent value="community" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <HealthNetwork />
          </TabsContent>
          
          <TabsContent value="marketplace" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <MedicationMarketplace />
          </TabsContent>

          <TabsContent value="communication" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <InAppCommunication />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <PaymentCenter />
              </div>
              <div>
                <HealthCard />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserPortal;
