
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Ambulance, Calendar, HeartPulse, MessageSquare, Pill, Wallet } from 'lucide-react';

export const FeaturedServices = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      id: 1,
      icon: HeartPulse,
      title: t('healthMonitoring'),
      description: t('healthMonitoringDesc'),
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 2,
      icon: Calendar,
      title: t('appointmentBooking'),
      description: t('appointmentBookingDesc'),
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      icon: Wallet,
      title: t('healthCard'),
      description: t('healthCardDesc'),
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 4,
      icon: Ambulance,
      title: t('emergencyServices'),
      description: t('emergencyServicesDesc'),
      color: 'bg-amber-100 text-amber-600',
    },
    {
      id: 5,
      icon: MessageSquare,
      title: t('inAppCommunication'),
      description: t('inAppCommunicationDesc'),
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 6,
      icon: Pill,
      title: t('medicationMarketplace'),
      description: t('medicationMarketplaceDesc'),
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <Badge className="mb-4 bg-medisync-orange/10 text-medisync-dark-orange border-medisync-orange hover:bg-medisync-orange/20">
            {t('features')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-medisync-black">
            {t('comprehensiveHealthcareFeatures')}
          </h2>
          <p className="text-lg text-medisync-dark-gray max-w-3xl mx-auto">
            {t('mediSyncOffersFeatures')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, color, delay }) => {
  return (
    <Card 
      className="border-none shadow-lg hover:shadow-xl transition-all duration-300 touch-effect hover:-translate-y-2 animate-on-scroll"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-8">
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6`}>
          <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-medisync-black">{title}</h3>
        <p className="text-medisync-dark-gray">{description}</p>
      </CardContent>
    </Card>
  );
};
