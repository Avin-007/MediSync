
import React from 'react';
import Header from '@/components/Header';
import RoleSelection from '@/components/RoleSelection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ambulance, Activity, Map, Shield, UserCheck, HeartPulse } from 'lucide-react';
import { LucideProps } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero section */}
          <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-12">
            <div className="md:w-1/2 space-y-6 mt-8 md:mt-0">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-medisync-blue">Medi</span>
                  <span className="text-medisync-red">Sync</span>
                  <span className="block mt-2">Emergency Response System</span>
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                  Streamlining emergency response with real-time coordination between ambulances, 
                  hospitals, traffic authorities, and patients.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-medisync-blue hover:bg-medisync-blue/90 gap-2">
                  Get Started <ArrowRight size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-medisync-light-blue rounded-full blur-xl opacity-50"></div>
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-medisync-light-red rounded-full blur-xl opacity-50"></div>
              <Card className="shadow-2xl border-t-4 border-t-medisync-blue overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-center">Select Your Role</CardTitle>
                  <CardDescription className="text-center">
                    Access specialized features based on your role in the emergency response network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleSelection />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features section */}
          <div className="pt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Integrated Emergency Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Emergency Route Optimization" 
                description="Priority routing and traffic light synchronization for ambulances with real-time updates"
                Icon={Map}
                className="border-b-medisync-blue"
              />
              <FeatureCard 
                title="On-Demand Medical Services" 
                description="Request ambulances or qualified nurses for home visits with just a few taps"
                Icon={HeartPulse}
                className="border-b-medisync-red"
              />
              <FeatureCard 
                title="Real-time Coordination" 
                description="Connect hospitals, ambulances, traffic authorities and healthcare providers seamlessly"
                Icon={Activity}
                className="border-b-medisync-blue"
              />
            </div>
          </div>

          {/* Role highlights section */}
          <div className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Solutions for Every Stakeholder
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <RoleHighlightCard
                title="Ambulance Drivers"
                description="Optimized routes with traffic control coordination"
                Icon={Ambulance}
                bgClass="bg-blue-50"
                iconClass="text-blue-500"
              />
              <RoleHighlightCard
                title="Traffic Authorities"
                description="Real-time alerts for emergency vehicle routing"
                Icon={Shield}
                bgClass="bg-green-50"
                iconClass="text-green-500"
              />
              <RoleHighlightCard
                title="Hospital Admins"
                description="Resource management and coordination dashboard"
                Icon={Activity}
                bgClass="bg-purple-50"
                iconClass="text-purple-500"
              />
              <RoleHighlightCard
                title="Patients"
                description="Request emergency services with real-time tracking"
                Icon={UserCheck}
                bgClass="bg-red-50"
                iconClass="text-red-500"
              />
            </div>
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

export default Index;
