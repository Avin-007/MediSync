
import React from 'react';
import Header from '@/components/Header';
import RoleSelection from '@/components/RoleSelection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ambulance, Activity, Map, Shield, UserCheck, HeartPulse, Pill, Stethoscope, Brain, ShoppingCart, HomeIcon, CalendarCheck, AlertCircle } from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
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
                  <span className="text-medisync-blue">Medi</span>
                  <span className="text-medisync-red">Sync</span>
                  <span className="block mt-2">Complete Healthcare Platform</span>
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                  Your all-in-one solution for emergency response, health monitoring, 
                  symptom tracking, and connecting with healthcare providers.
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
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Badge icon={Brain} text="AI-Powered" />
                <Badge icon={Map} text="Real-time Tracking" />
                <Badge icon={AlertCircle} text="Emergency Response" />
                <Badge icon={ShoppingCart} text="Medication Delivery" />
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-medisync-light-blue rounded-full blur-xl opacity-50"></div>
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-medisync-light-red rounded-full blur-xl opacity-50"></div>
              <Card className="shadow-2xl border-t-4 border-t-medisync-blue overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-center">Select Your Role</CardTitle>
                  <CardDescription className="text-center">
                    Access specialized features based on your role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleSelection />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core features section */}
          <div className="pt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Comprehensive Healthcare Features
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
              MediSync offers a complete suite of healthcare tools for patients, medical professionals, and emergency services
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="AI Health Assistant" 
                description="Get intelligent recommendations, track symptoms, and monitor your health with our AI-powered system"
                Icon={Brain}
                className="border-b-medisync-blue"
              />
              <FeatureCard 
                title="Emergency Services" 
                description="Request emergency medical help with real-time tracking and traffic optimization for ambulances"
                Icon={HeartPulse}
                className="border-b-medisync-red"
              />
              <FeatureCard 
                title="Medication Marketplace" 
                description="Order prescriptions, over-the-counter medications and healthcare products with home delivery"
                Icon={Pill}
                className="border-b-medisync-blue"
              />
            </div>
          </div>
          
          {/* How it works section */}
          <div className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              How MediSync Works For You
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Our platform connects all aspects of healthcare into one seamless experience
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 space-y-8">
                <StepCard 
                  number="01"
                  title="Track Your Health"
                  description="Monitor symptoms, medications, and vital signs with our AI-powered tracking system"
                />
                <StepCard 
                  number="02"
                  title="Connect With Professionals"
                  description="Find and communicate with doctors, hospitals and specialists based on your needs"
                />
                <StepCard 
                  number="03"
                  title="Manage Medications"
                  description="Order prescriptions through our marketplace and get them delivered to your doorstep"
                />
                <StepCard 
                  number="04"
                  title="Emergency Response"
                  description="Request emergency services with real-time tracking and optimized routing"
                />
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -right-4 -bottom-4 w-full h-full border-2 border-medisync-blue rounded-2xl"></div>
                  <Card className="overflow-hidden">
                    <AspectRatio ratio={4/3}>
                      <div className="w-full h-full bg-gradient-to-br from-medisync-light-blue to-medisync-light-red flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                          alt="MediSync Platform" 
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
              Solutions for Every Healthcare Stakeholder
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
              MediSync provides specialized tools for everyone involved in healthcare
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <RoleHighlightCard
                title="Patients"
                description="Track symptoms, connect with doctors, and manage medications"
                Icon={UserCheck}
                bgClass="bg-blue-50"
                iconClass="text-blue-500"
              />
              <RoleHighlightCard
                title="Doctors & Nurses"
                description="Manage patients, schedules, and respond to home visit requests"
                Icon={Stethoscope}
                bgClass="bg-green-50"
                iconClass="text-green-500"
              />
              <RoleHighlightCard
                title="Emergency Services"
                description="Optimize routes, coordinate with hospitals, and respond quickly"
                Icon={Ambulance}
                bgClass="bg-red-50"
                iconClass="text-red-500"
              />
              <RoleHighlightCard
                title="Hospitals & Pharmacies"
                description="Manage resources, inventories, and coordinate emergency response"
                Icon={HomeIcon}
                bgClass="bg-purple-50"
                iconClass="text-purple-500"
              />
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="py-8">
            <Card className="bg-gradient-to-r from-medisync-blue to-medisync-red text-white overflow-hidden">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold">Ready to Transform Your Healthcare Experience?</h2>
                  <p className="text-white/90 max-w-md">
                    Join thousands of users who rely on MediSync for their healthcare needs.
                  </p>
                </div>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 min-w-[150px]">
                  Sign Up Now
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
      <div className="w-10 h-10 rounded-full bg-medisync-blue text-white flex items-center justify-center font-bold shrink-0">
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
