
import React from 'react';
import Header from '@/components/Header';
import RoleSelection from '@/components/RoleSelection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-medisync-blue">Medi</span>
              <span className="text-medisync-red">Sync</span>
              <span> Emergency</span>
            </h1>
            <p className="text-gray-500">
              Emergency vehicle routing, traffic management, and on-demand medical services
            </p>
          </div>

          <Card className="shadow-lg border-t-4 border-t-medisync-blue">
            <CardHeader>
              <CardTitle>Welcome to MediSync Emergency</CardTitle>
              <CardDescription>
                Select your role to access specialized features and functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleSelection />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              title="Emergency Route Optimization" 
              description="Priority routing and traffic light synchronization for ambulances"
              iconClass="bg-medisync-light-blue text-medisync-blue"
            />
            <FeatureCard 
              title="On-Demand Medical Services" 
              description="Request ambulances or qualified nurses for home visits"
              iconClass="bg-medisync-light-red text-medisync-red"
            />
            <FeatureCard 
              title="Real-time Coordination" 
              description="Connect hospitals, ambulances and healthcare providers"
              iconClass="bg-medisync-light-blue text-medisync-blue"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  iconClass: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, iconClass }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className={`w-12 h-12 rounded-full ${iconClass} flex items-center justify-center mb-4`}>
        <div className="w-6 h-6 rounded-full bg-current opacity-70"></div>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default Index;
