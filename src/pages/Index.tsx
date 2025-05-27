
import React from 'react';
import Header from '@/components/Header';
import ResponsiveRoleSelection from '@/components/home/ResponsiveRoleSelection';
import ResponsiveServicesSection from '@/components/home/ResponsiveServicesSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Map, AlertCircle, Phone, MessageSquare, Wallet, Flag, Shield, HeartPulse } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-blue-600">मेडि</span>
                <span className="text-red-500">सिंक</span>
                <div className="text-gray-900 mt-2">{t('completeHealthcare')}</div>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('healthcareDescription')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                {t('getStarted')} <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-4 text-lg">
                {t('learnMore')}
              </Button>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-6">
              <FeatureBadge icon={Brain} text={t('aiPowered')} />
              <FeatureBadge icon={Map} text={t('realTimeTracking')} />
              <FeatureBadge icon={AlertCircle} text={t('emergencyResponse')} />
              <FeatureBadge icon={Phone} text={t('inAppCalling')} />
              <FeatureBadge icon={MessageSquare} text={t('inAppMessaging')} />
              <FeatureBadge icon={Wallet} text={t('healthCard')} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Role Selection Section */}
          <section className="space-y-8">
            <div className="text-center">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                {t('selectYourRole')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('accessSpecializedFeatures')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose your role to access tailored features and services
              </p>
            </div>
            <ResponsiveRoleSelection />
          </section>

          {/* Services Section */}
          <ResponsiveServicesSection />

          {/* Quick Stats */}
          <section className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-lg text-gray-600">
                Making healthcare accessible across Nepal
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <StatCard number="50K+" label="Active Users" color="text-blue-600" />
              <StatCard number="200+" label="Partner Hospitals" color="text-green-600" />
              <StatCard number="1000+" label="Emergency Responses" color="text-red-600" />
              <StatCard number="24/7" label="Support Available" color="text-purple-600" />
            </div>
          </section>

          {/* Core Features */}
          <section className="space-y-8">
            <div className="text-center">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                Core Features
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Healthcare Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need for modern healthcare management in one platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={Shield}
                title="Unique Health ID"
                description="Secure digital identity for all your medical records"
                color="bg-blue-500"
              />
              <FeatureCard 
                icon={HeartPulse}
                title="Emergency Services"
                description="24/7 emergency response and ambulance tracking"
                color="bg-red-500"
              />
              <FeatureCard 
                icon={Wallet}
                title="Digital Health Card"
                description="Instant access to your health information anywhere"
                color="bg-green-500"
              />
              <FeatureCard 
                icon={Brain}
                title="AI Health Assistant"
                description="Smart health recommendations and symptom analysis"
                color="bg-purple-500"
              />
              <FeatureCard 
                icon={MessageSquare}
                title="Secure Communication"
                description="Direct messaging with healthcare providers"
                color="bg-indigo-500"
              />
              <FeatureCard 
                icon={Map}
                title="Location Services"
                description="Find nearby hospitals and healthcare facilities"
                color="bg-orange-500"
              />
            </div>
          </section>

          {/* Nepal Heritage Banner */}
          <section className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-red-500/80"></div>
            <div className="relative z-10 text-white p-8 sm:p-12 text-center">
              <Flag size={48} className="mx-auto mb-6 text-white" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t('nepalHealthInitiative')}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t('nepalHealthInitiativeDescription')}
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 sm:p-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Ready to Transform Healthcare?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of users already experiencing better healthcare with MediSync
              </p>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Get Started Today
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Helper Components
interface FeatureBadgeProps {
  icon: React.ComponentType<any>;
  text: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ icon: Icon, text }) => {
  return (
    <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 gap-2">
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, color }) => {
  return (
    <div className="text-center">
      <div className={`text-3xl sm:text-4xl font-bold ${color} mb-2`}>{number}</div>
      <div className="text-gray-600 text-sm sm:text-base">{label}</div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;
