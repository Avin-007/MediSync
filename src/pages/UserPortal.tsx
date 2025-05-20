
import React, { useState } from 'react';
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
  Droplet, Users, Wallet, CloudRain
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

const UserPortal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [hasActiveEmergency, setHasActiveEmergency] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
        <TabsList className="grid grid-cols-2 sm:grid-cols-9 gap-2">
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
          <HealthOverview />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherHealthAlerts />
            <BloodDonation />
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
        
        {/* Payments Tab */}
        <TabsContent value="payments" className="m-0 space-y-6">
          <PaymentCenter />
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
