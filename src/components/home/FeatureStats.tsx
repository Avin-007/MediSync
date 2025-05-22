
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Hospital, Ambulance, Phone } from 'lucide-react';

export const FeatureStats = () => {
  const { t } = useLanguage();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-medisync-orange text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            icon={Users}
            value="100,000+"
            label={t('activeUsers')}
            isInView={isInView}
            delay={0}
          />
          <StatCard 
            icon={Hospital}
            value="250+"
            label={t('partneredHospitals')}
            isInView={isInView}
            delay={100}
          />
          <StatCard 
            icon={Ambulance}
            value="500+"
            label={t('emergencyResponses')}
            isInView={isInView}
            delay={200}
          />
          <StatCard 
            icon={Phone}
            value="24/7"
            label={t('supportAvailable')}
            isInView={isInView}
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  isInView: boolean;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, isInView, delay }) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transform transition-all duration-700 ease-out ${
        isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-3 bg-white/20 p-3 rounded-full">
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
};
