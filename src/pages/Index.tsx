
import React from 'react';
import Header from '@/components/Header';
import RoleSelection from '@/components/RoleSelection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ambulance, Activity, Map, Shield, UserCheck, HeartPulse, Pill, Stethoscope, Brain, ShoppingCart, HomeIcon, CalendarCheck, AlertCircle, Mountain, Flag } from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero section */}
          <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-12">
            <div className="md:w-1/2 space-y-6 mt-8 md:mt-0">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-nepal-royal-blue">Medi</span>
                  <span className="text-nepal-crimson">Sync</span>
                  <span className="block mt-2">{t('completeHealthcare')}</span>
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                  {t('healthcareDescription')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-nepal-royal-blue hover:bg-nepal-royal-blue/90 gap-2">
                  {t('getStarted')} <ArrowRight size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-nepal-crimson text-nepal-crimson hover:bg-nepal-crimson/10">
                  {t('learnMore')}
                </Button>
              </div>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Badge icon={Brain} text={t('aiPowered')} />
                <Badge icon={Map} text={t('realTimeTracking')} />
                <Badge icon={AlertCircle} text={t('emergencyResponse')} />
                <Badge icon={ShoppingCart} text={t('medicationDelivery')} />
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-nepal-royal-blue/20 rounded-full blur-xl opacity-50"></div>
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-nepal-crimson/20 rounded-full blur-xl opacity-50"></div>
              <Card className="shadow-2xl border-t-4 border-t-nepal-royal-blue overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-center">{t('selectYourRole')}</CardTitle>
                  <CardDescription className="text-center">
                    {t('accessSpecializedFeatures')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleSelection />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Nepal-themed banner */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-nepal-royal-blue/90 to-nepal-crimson/80 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Nepal Mountains" 
              className="w-full h-52 md:h-64 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6 text-center">
              <Flag size={40} className="mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('nepalHealthInitiative')}</h2>
              <p className="max-w-3xl text-white/90">
                {t('nepalHealthInitiativeDescription')}
              </p>
            </div>
          </div>

          {/* Core features section */}
          <div className="pt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              {t('comprehensiveHealthcareFeatures')}
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
              {t('mediSyncOffersFeatures')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title={t('aiHealthAssistant')} 
                description={t('aiHealthAssistantDesc')}
                Icon={Brain}
                className="border-b-nepal-royal-blue"
              />
              <FeatureCard 
                title={t('emergencyServices')} 
                description={t('emergencyServicesDesc')}
                Icon={HeartPulse}
                className="border-b-nepal-crimson"
              />
              <FeatureCard 
                title={t('medicationMarketplace')} 
                description={t('medicationMarketplaceDesc')}
                Icon={Pill}
                className="border-b-nepal-mountain-green"
              />
            </div>
          </div>
          
          {/* How it works section */}
          <div className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              {t('howMediSyncWorks')}
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              {t('ourPlatformConnects')}
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 space-y-8">
                <StepCard 
                  number="01"
                  title={t('trackYourHealth')}
                  description={t('trackYourHealthDesc')}
                />
                <StepCard 
                  number="02"
                  title={t('connectWithProfessionals')}
                  description={t('connectWithProfessionalsDesc')}
                />
                <StepCard 
                  number="03"
                  title={t('manageMediactions')}
                  description={t('manageMediactionsDesc')}
                />
                <StepCard 
                  number="04"
                  title={t('emergencyResponse')}
                  description={t('emergencyResponseDesc')}
                />
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -right-4 -bottom-4 w-full h-full border-2 border-nepal-royal-blue rounded-2xl"></div>
                  <Card className="overflow-hidden">
                    <AspectRatio ratio={4/3}>
                      <div className="w-full h-full bg-gradient-to-br from-nepal-royal-blue/20 to-nepal-crimson/20 flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                          alt="Healthcare in Nepal" 
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                    </AspectRatio>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions for stakeholders */}
          <div className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              {t('solutionsForStakeholders')}
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
              {t('mediSyncProvidesTools')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <RoleHighlightCard
                title={t('patients')}
                description={t('patientsDesc')}
                Icon={UserCheck}
                bgClass="bg-blue-50"
                iconClass="text-nepal-royal-blue"
              />
              <RoleHighlightCard
                title={t('doctorsAndNurses')}
                description={t('doctorsAndNursesDesc')}
                Icon={Stethoscope}
                bgClass="bg-green-50"
                iconClass="text-nepal-mountain-green"
              />
              <RoleHighlightCard
                title={t('emergencyServices')}
                description={t('emergencyServicesRoleDesc')}
                Icon={Ambulance}
                bgClass="bg-red-50"
                iconClass="text-nepal-crimson"
              />
              <RoleHighlightCard
                title={t('hospitalsAndPharmacies')}
                description={t('hospitalsAndPharmaciesDesc')}
                Icon={HomeIcon}
                bgClass="bg-purple-50"
                iconClass="text-purple-500"
              />
            </div>
          </div>
          
          {/* Nepal-specific features */}
          <div className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              {t('designedForNepal')}
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
              {t('designedForNepalDesc')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-nepal-himalayan-snow to-white overflow-hidden border-nepal-royal-blue">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-nepal-royal-blue/10 flex-shrink-0">
                    <Mountain size={32} className="text-nepal-royal-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{t('remoteRegionAccess')}</h3>
                    <p className="text-gray-600">{t('remoteRegionAccessDesc')}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-nepal-himalayan-snow to-white overflow-hidden border-nepal-crimson">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-nepal-crimson/10 flex-shrink-0">
                    <AlertCircle size={32} className="text-nepal-crimson" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{t('disasterResponseInfrastructure')}</h3>
                    <p className="text-gray-600">{t('disasterResponseInfrastructureDesc')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="py-8">
            <Card className="bg-gradient-to-r from-nepal-royal-blue to-nepal-crimson text-white overflow-hidden">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold">{t('readyToTransform')}</h2>
                  <p className="text-white/90 max-w-md">
                    {t('joinThousands')}
                  </p>
                </div>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 min-w-[150px]">
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

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon, className = "" }) => {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 border-b-4 ${className}`}>
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Icon size={24} className="text-gray-700" />
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

interface RoleHighlightCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
  bgClass: string;
  iconClass: string;
}

const RoleHighlightCard: React.FC<RoleHighlightCardProps> = ({ title, description, Icon, bgClass, iconClass }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center mb-4`}>
        <Icon size={24} className={iconClass} />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full bg-nepal-royal-blue text-white flex items-center justify-center font-bold shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

interface BadgeProps {
  icon: React.ComponentType<LucideProps>;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ icon: Icon, text }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 gap-1.5">
      <Icon size={12} />
      {text}
    </div>
  );
};

export default Index;
