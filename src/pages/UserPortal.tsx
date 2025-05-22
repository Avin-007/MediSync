
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
  Droplet, Users, Wallet, CloudRain, CalendarCheck, MessageSquare, Bell
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
    // In a real app, would open a dialog to add a new event
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
          <Badge variant="destructive" className="text-md px-4 py-1">
            {t('active')} {t('emergency')}
          </Badge>
        ) : null
      }
    >
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-2">
          <TabsTrigger value="dashboard" className="relative">
            <BarChart size={16} className="mr-2" />
            {t('dashboard')}
          </TabsTrigger>
          <TabsTrigger value="emergency" className="relative">
            <AlertCircle size={16} className="mr-2" />
            {t('emergency')}
            {hasActiveEmergency && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="health" className="relative">
            <Brain size={16} className="mr-2" />
            {t('health')}
          </TabsTrigger>
          <TabsTrigger value="doctors" className="relative">
            <Stethoscope size={16} className="mr-2" />
            {t('doctors')}
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="relative">
            <ShoppingCart size={16} className="mr-2" />
            {t('marketplace')}
          </TabsTrigger>
          <TabsTrigger value="blood" className="relative">
            <Droplet size={16} className="mr-2" />
            {t('bloodDonation')}
          </TabsTrigger>
          <TabsTrigger value="family" className="relative">
            <Users size={16} className="mr-2" />
            {t('familyRecords')}
          </TabsTrigger>
          <TabsTrigger value="communication" className="relative">
            <MessageSquare size={16} className="mr-2" />
            {t('communication')}
          </TabsTrigger>
          <TabsTrigger value="payments" className="relative">
            <Wallet size={16} className="mr-2" />
            {t('payments')}
          </TabsTrigger>
          <TabsTrigger value="weather" className="relative">
            <CloudRain size={16} className="mr-2" />
            {t('weather')}
          </TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <HealthOverview />
            </div>
            <div>
              <HealthCard />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherHealthAlerts />
            <HealthEvents />
          </div>
        </TabsContent>
        
        {/* Emergency Tab */}
        <TabsContent value="emergency" className="m-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-2 border-nepal-crimson overflow-hidden">
                <MapComponent 
                  emergencies={hasActiveEmergency ? [{ name: language === 'en' ? "Active Emergency" : "सक्रिय आपतकालीन", lat: 27.7172, lng: 85.3240 }] : []} 
                />
              </Card>
            </div>
            <div className="space-y-6">
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
                    <CardTitle>{t('emergencyContacts')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-100 rounded-md flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{language === 'en' ? 'Emergency Hotline' : 'आपतकालीन हटलाइन'}</h3>
                          <p className="text-2xl font-bold text-red-600">102</p>
                        </div>
                        <Button 
                          size="icon" 
                          className="rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                        >
                          <PhoneCall size={18} />
                        </Button>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{language === 'en' ? 'Medical Support' : 'चिकित्सा सहायता'}</h3>
                          <p className="text-sm">+977-1-4476225</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-100"
                        >
                          <PhoneCall size={18} />
                        </Button>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-100 rounded-md flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{language === 'en' ? 'Nurse On-Call' : 'नर्स अन-कल'}</h3>
                          <p className="text-sm">+977-1-4478215</p>
                        </div>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="rounded-full border-green-200 text-green-600 hover:bg-green-100"
                        >
                          <PhoneCall size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Health AI Tab */}
        <TabsContent value="health" className="m-0 space-y-6">
          <SymptomTracker />
        </TabsContent>
        
        {/* Doctors Tab */}
        <TabsContent value="doctors" className="m-0 space-y-6">
          <DoctorFinder />
        </TabsContent>
        
        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="m-0 space-y-6">
          <MedicationMarketplace />
        </TabsContent>
        
        {/* Blood Donation Tab */}
        <TabsContent value="blood" className="m-0 space-y-6">
          <BloodDonation />
        </TabsContent>
        
        {/* Family Records Tab */}
        <TabsContent value="family" className="m-0 space-y-6">
          <FamilyRecords />
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="m-0 space-y-6">
          <InAppCommunication />
        </TabsContent>
        
        {/* Payments Tab */}
        <TabsContent value="payments" className="m-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PaymentCenter />
            </div>
            <div>
              <HealthCard />
            </div>
          </div>
        </TabsContent>
        
        {/* Weather Alerts Tab */}
        <TabsContent value="weather" className="m-0 space-y-6">
          <WeatherHealthAlerts />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserPortal;
