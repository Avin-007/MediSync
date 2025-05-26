import React from 'react';
import Header from '@/components/Header';
import ResponsiveRoleSelection from '@/components/home/ResponsiveRoleSelection';
import ResponsiveServicesSection from '@/components/home/ResponsiveServicesSection';
import FlowDiagram from '@/components/FlowDiagram';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ambulance, Activity, Map, Shield, UserCheck, HeartPulse, Pill, 
  Stethoscope, Brain, ShoppingCart, HomeIcon, CalendarCheck, 
  AlertCircle, Mountain, Flag, Wallet, Phone, MessageSquare, Users } from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Hero section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 space-y-8 lg:space-y-0">
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <div>
                <h1 className="responsive-heading font-bold leading-tight">
                  <span className="text-nepal-royal-blue">मेडि</span>
                  <span className="text-nepal-crimson">सिंक</span>
                  <span className="text-nepal-royal-blue block mt-2">{t('completeHealthcare')}</span>
                </h1>
                <p className="mt-4 text-gray-600 responsive-text leading-relaxed">
                  {t('healthcareDescription')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-nepal-royal-blue hover:bg-nepal-royal-blue/90 gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  {t('getStarted')} <ArrowRight size={20} />
                </Button>
                <Button size="lg" variant="outline" className="border-nepal-crimson text-nepal-crimson hover:bg-nepal-crimson/10 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  {t('learnMore')}
                </Button>
              </div>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
                <Badge icon={Brain} text={t('aiPowered')} />
                <Badge icon={Map} text={t('realTimeTracking')} />
                <Badge icon={AlertCircle} text={t('emergencyResponse')} />
                <Badge icon={Phone} text={t('inAppCalling')} />
                <Badge icon={MessageSquare} text={t('inAppMessaging')} />
                <Badge icon={Wallet} text={t('healthCard')} />
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6 w-20 h-20 sm:w-24 sm:h-24 bg-nepal-royal-blue/20 rounded-full blur-xl opacity-50"></div>
              <div className="absolute -left-4 -bottom-4 sm:-left-6 sm:-bottom-6 w-24 h-24 sm:w-32 sm:h-32 bg-nepal-crimson/20 rounded-full blur-xl opacity-50"></div>
              <Card className="shadow-2xl border-t-4 border-t-nepal-royal-blue overflow-hidden">
                <CardHeader className="responsive-card">
                  <CardTitle className="text-center text-lg sm:text-xl lg:text-2xl">{t('selectYourRole')}</CardTitle>
                  <CardDescription className="text-center text-sm sm:text-base">
                    {t('accessSpecializedFeatures')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="responsive-card">
                  <ResponsiveRoleSelection />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services Section */}
          <ResponsiveServicesSection />

          {/* Nepal-themed banner */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-nepal-royal-blue/90 to-nepal-crimson/80 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Nepal Mountains" 
              className="w-full h-40 sm:h-52 md:h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white responsive-card text-center">
              <Flag size={32} className="mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{t('nepalHealthInitiative')}</h2>
              <p className="max-w-3xl text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                {t('nepalHealthInitiativeDescription')}
              </p>
            </div>
          </div>
          
          {/* Flow Diagram */}
          <div className="pt-4 sm:pt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
              {t('howMediSyncWorks')}
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto responsive-text leading-relaxed">
              {t('ourPlatformConnects')}
            </p>
            
            <FlowDiagram />
          </div>
          
          {/* Core features section */}
          <div className="pt-4 sm:pt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
              {t('comprehensiveHealthcareFeatures')}
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto responsive-text leading-relaxed">
              {t('mediSyncOffersFeatures')}
            </p>
            
            <div className="responsive-grid">
              <FeatureCard 
                title={t('uniqueHealthID')}
                description={t('uniqueHealthIDDescription')}
                Icon={Shield}
                className="border-b-nepal-royal-blue"
              />
              <FeatureCard 
                title={t('emergencyServices')} 
                description={t('emergencyServicesDesc')}
                Icon={HeartPulse}
                className="border-b-nepal-crimson"
              />
              <FeatureCard 
                title={t('healthCardFeature')} 
                description={t('healthCardFeatureDesc')}
                Icon={Wallet}
                className="border-b-nepal-mountain-green"
              />
              <FeatureCard 
                title={t('medicationMarketplace')} 
                description={t('medicationMarketplaceDesc')}
                Icon={Pill}
                className="border-b-nepal-royal-blue"
              />
              <FeatureCard 
                title={t('inAppCommunication')} 
                description={t('inAppCommunicationDesc')}
                Icon={MessageSquare}
                className="border-b-nepal-crimson"
              />
              <FeatureCard 
                title={t('aiAssistance')} 
                description={t('aiAssistanceDesc')}
                Icon={Brain}
                className="border-b-nepal-mountain-green"
              />
            </div>
          </div>

          {/* User roles section - Made responsive */}
          <div className="py-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
              {t('solutionsForStakeholders')}
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto responsive-text leading-relaxed">
              {t('mediSyncProvidesTools')}
            </p>
            
            <Tabs defaultValue="patients" className="mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-8 w-full">
                <TabsTrigger value="patients" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                  <UserCheck size={14} />
                  <span className="hidden sm:inline">{t('patients')}</span>
                  <span className="sm:hidden">Patients</span>
                </TabsTrigger>
                <TabsTrigger value="healthcare" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Stethoscope size={14} />
                  <span className="hidden sm:inline">{t('healthcareProfessionals')}</span>
                  <span className="sm:hidden">Doctors</span>
                </TabsTrigger>
                <TabsTrigger value="emergency" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Ambulance size={14} />
                  <span className="hidden sm:inline">{t('emergencyServices')}</span>
                  <span className="sm:hidden">Emergency</span>
                </TabsTrigger>
                <TabsTrigger value="hospital" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Hospital size={14} />
                  <span className="hidden sm:inline">{t('hospitals')}</span>
                  <span className="sm:hidden">Hospitals</span>
                </TabsTrigger>
                <TabsTrigger value="government" className="gap-1 sm:gap-2 text-xs sm:text-sm col-span-2 lg:col-span-1">
                  <Shield size={14} />
                  <span className="hidden sm:inline">{t('government')}</span>
                  <span className="sm:hidden">Gov</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Keep existing tab content but make it responsive */}
              <TabsContent value="patients">
                <Card className="border-nepal-royal-blue">
                  <div className="lg:grid lg:grid-cols-5 items-center">
                    <div className="col-span-2 bg-nepal-royal-blue/10 responsive-card h-full flex flex-col justify-center">
                      <div className="mb-4">
                        <UserCheck size={32} className="text-nepal-royal-blue sm:w-12 sm:h-12" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('patients')}</h3>
                      <p className="text-gray-600 responsive-text">{t('patientsDetailedDesc')}</p>
                    </div>
                    <div className="col-span-3 responsive-card">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">{t('patientFeatures')}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FeatureListItem icon={HeartPulse} text={t('healthMonitoring')} />
                        <FeatureListItem icon={CalendarCheck} text={t('appointmentBooking')} />
                        <FeatureListItem icon={Pill} text={t('medicationReminders')} />
                        <FeatureListItem icon={Wallet} text={t('digitalHealthCard')} />
                        <FeatureListItem icon={AlertCircle} text={t('emergencyAssistance')} />
                        <FeatureListItem icon={MessageSquare} text={t('doctorConsultations')} />
                        <FeatureListItem icon={Map} text={t('nearbyHealthFacilities')} />
                        <FeatureListItem icon={Shield} text={t('secureHealthRecords')} />
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              {/* Keep other existing tab content */}
              <TabsContent value="healthcare">
                <Card className="border-nepal-crimson">
                  <div className="lg:grid lg:grid-cols-5 items-center">
                    <div className="col-span-2 bg-nepal-crimson/10 responsive-card h-full flex flex-col justify-center">
                      <div className="mb-4">
                        <Stethoscope size={32} className="text-nepal-crimson sm:w-12 sm:h-12" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('healthcareProfessionals')}</h3>
                      <p className="text-gray-600 responsive-text">{t('healthcareProfessionalsDetailedDesc')}</p>
                    </div>
                    <div className="col-span-3 responsive-card">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">{t('healthcareFeatures')}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FeatureListItem icon={Users} text={t('patientManagement')} />
                        <FeatureListItem icon={CalendarCheck} text={t('scheduleManagement')} />
                        <FeatureListItem icon={MessageSquare} text={t('secureMessaging')} />
                        <FeatureListItem icon={Brain} text={t('aiDiagnosticAssistance')} />
                        <FeatureListItem icon={Shield} text={t('medicalRecordAccess')} />
                        <FeatureListItem icon={Phone} text={t('telemedicineTools')} />
                        <FeatureListItem icon={Activity} text={t('patientMonitoring')} />
                        <FeatureListItem icon={HomeIcon} text={t('remoteConsultations')} />
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="emergency">
                <Card className="border-nepal-mountain-green">
                  <div className="lg:grid lg:grid-cols-5 items-center">
                    <div className="col-span-2 bg-green-50 responsive-card h-full flex flex-col justify-center">
                      <div className="mb-4">
                        <Ambulance size={32} className="text-green-600 sm:w-12 sm:h-12" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('emergencyServices')}</h3>
                      <p className="text-gray-600 responsive-text">{t('emergencyServicesDetailedDesc')}</p>
                    </div>
                    <div className="col-span-3 responsive-card">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">{t('emergencyFeatures')}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FeatureListItem icon={Map} text={t('realTimeTracking')} />
                        <FeatureListItem icon={AlertCircle} text={t('priorityDispatch')} />
                        <FeatureListItem icon={Brain} text={t('smartRouting')} />
                        <FeatureListItem icon={Shield} text={t('patientDataAccess')} />
                        <FeatureListItem icon={Activity} text={t('vitalSignsMonitoring')} />
                        <FeatureListItem icon={Hospital} text={t('hospitalCoordination')} />
                        <FeatureListItem icon={MessageSquare} text={t('instantCommunication')} />
                        <FeatureListItem icon={Users} text={t('teamCoordination')} />
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="hospital">
                <Card className="border-blue-500">
                  <div className="lg:grid lg:grid-cols-5 items-center">
                    <div className="col-span-2 bg-blue-50 responsive-card h-full flex flex-col justify-center">
                      <div className="mb-4">
                        <Hospital size={32} className="text-blue-600 sm:w-12 sm:h-12" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('hospitals')}</h3>
                      <p className="text-gray-600 responsive-text">{t('hospitalsDetailedDesc')}</p>
                    </div>
                    <div className="col-span-3 responsive-card">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">{t('hospitalFeatures')}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FeatureListItem icon={Users} text={t('patientFlowManagement')} />
                        <FeatureListItem icon={Wallet} text={t('digitalPayments')} />
                        <FeatureListItem icon={Shield} text={t('medicalRecordSystem')} />
                        <FeatureListItem icon={Brain} text={t('resourceOptimization')} />
                        <FeatureListItem icon={AlertCircle} text={t('emergencyPreparedness')} />
                        <FeatureListItem icon={Activity} text={t('performanceAnalytics')} />
                        <FeatureListItem icon={Stethoscope} text={t('staffManagement')} />
                        <FeatureListItem icon={ShoppingCart} text={t('inventoryTracking')} />
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="government">
                <Card className="border-purple-500">
                  <div className="lg:grid lg:grid-cols-5 items-center">
                    <div className="col-span-2 bg-purple-50 responsive-card h-full flex flex-col justify-center">
                      <div className="mb-4">
                        <Shield size={32} className="text-purple-600 sm:w-12 sm:h-12" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('government')}</h3>
                      <p className="text-gray-600 responsive-text">{t('governmentDetailedDesc')}</p>
                    </div>
                    <div className="col-span-3 responsive-card">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">{t('governmentFeatures')}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FeatureListItem icon={Activity} text={t('populationHealthMetrics')} />
                        <FeatureListItem icon={AlertCircle} text={t('diseaseOutbreakMonitoring')} />
                        <FeatureListItem icon={Shield} text={t('nationalHealthID')} />
                        <FeatureListItem icon={Brain} text={t('healthcareAnalytics')} />
                        <FeatureListItem icon={Map} text={t('resourceDistribution')} />
                        <FeatureListItem icon={Flag} text={t('policyImplementation')} />
                        <FeatureListItem icon={Users} text={t('citizenHealthTracking')} />
                        <FeatureListItem icon={Mountain} text={t('remoteAreaCoverage')} />
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Nepal-specific features - Made responsive */}
          <div className="py-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
              {t('designedForNepal')}
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto responsive-text leading-relaxed">
              {t('designedForNepalDesc')}
            </p>
            
            <div className="responsive-grid">
              <Card className="bg-gradient-to-br from-nepal-himalayan-snow to-white overflow-hidden border-nepal-royal-blue">
                <CardContent className="responsive-card flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-nepal-royal-blue/10 flex-shrink-0 mb-4">
                    <Mountain size={24} className="text-nepal-royal-blue sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">{t('remoteRegionAccess')}</h3>
                  <p className="text-gray-600 responsive-text">{t('remoteRegionAccessDesc')}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-nepal-himalayan-snow to-white overflow-hidden border-nepal-crimson">
                <CardContent className="responsive-card flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-nepal-crimson/10 flex-shrink-0 mb-4">
                    <AlertCircle size={24} className="text-nepal-crimson sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">{t('disasterResponseInfrastructure')}</h3>
                  <p className="text-gray-600 responsive-text">{t('disasterResponseInfrastructureDesc')}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-nepal-himalayan-snow to-white overflow-hidden border-nepal-mountain-green">
                <CardContent className="responsive-card flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-green-100 flex-shrink-0 mb-4">
                    <Wallet size={24} className="text-green-600 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">{t('digitalHealthCard')}</h3>
                  <p className="text-gray-600 responsive-text">{t('digitalHealthCardDesc')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section - Made responsive */}
          <div className="py-4 sm:py-8">
            <Card className="bg-gradient-to-r from-nepal-royal-blue to-nepal-crimson text-white overflow-hidden">
              <CardContent className="responsive-card flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{t('readyToTransform')}</h2>
                  <p className="text-white/90 max-w-md responsive-text">
                    {t('joinThousands')}
                  </p>
                </div>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 min-w-[150px] text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  {t('signUpNow')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper components to keep the file organized
const Hospital = (props: LucideProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
    <path d="m9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
    <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"></path>
    <path d="M10 2v4"></path>
    <path d="M14 2v4"></path>
  </svg>
);

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon, className = "" }) => {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 border-b-4 ${className}`}>
      <CardContent className="responsive-card">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Icon size={20} className="text-gray-700 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-500 responsive-text">{description}</p>
      </CardContent>
    </Card>
  );
};

interface FeatureListItemProps {
  icon: React.ComponentType<LucideProps>;
  text: string;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ icon: Icon, text }) => {
  return (
    <li className="flex items-start gap-2">
      <Icon size={14} className="mt-1 text-nepal-royal-blue sm:w-4 sm:h-4" />
      <span className="text-sm sm:text-base">{text}</span>
    </li>
  );
};

interface BadgeProps {
  icon: React.ComponentType<LucideProps>;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ icon: Icon, text }) => {
  return (
    <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 gap-1 sm:gap-1.5">
      <Icon size={10} className="sm:w-3 sm:h-3" />
      <span className="text-xs sm:text-sm">{text}</span>
    </div>
  );
};

export default Index;
