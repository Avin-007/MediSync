
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ambulance, Bell, HeartPulse, Hospital, MessageSquare, Shield, Stethoscope, Traffic, User, Wallet } from 'lucide-react';

const SystemFlowDiagram = () => {
  const { t } = useLanguage();
  
  return (
    <div className="overflow-hidden relative mx-auto">
      <div className="max-w-6xl mx-auto px-4">
        {/* Central Platform */}
        <div className="flex justify-center mb-20 relative">
          <div className="bg-medisync-orange rounded-xl p-6 shadow-lg w-72 text-center text-white z-10 touch-effect transform hover:scale-105 transition-transform duration-300">
            <Shield size={40} className="mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">{t('medisyncPlatform')}</h3>
            <p className="text-sm">{t('centralizedHealthPlatform')}</p>
          </div>
          
          {/* Decorative radiation lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 border-2 border-dashed border-medisync-orange/30 rounded-full animate-spin" style={{ animationDuration: '100s' }}></div>
            <div className="absolute w-72 h-72 border-2 border-dashed border-medisync-orange/20 rounded-full animate-spin" style={{ animationDuration: '70s', animationDirection: 'reverse' }}></div>
          </div>
        </div>
        
        {/* User Groups */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
          <FlowNode 
            icon={User}
            title={t('patients')} 
            features={[t('healthMonitoring'), t('appointmentBooking'), t('digitalHealthCard')]}
            color="from-blue-500 to-blue-600"
          />
          
          <FlowNode 
            icon={Stethoscope}
            title={t('healthcareProfessionals')} 
            features={[t('patientManagement'), t('scheduleManagement'), t('medicalRecordAccess')]}
            color="from-green-500 to-green-600"
          />
          
          <FlowNode 
            icon={Ambulance}
            title={t('ambulanceServices')} 
            features={[t('emergencyDispatch'), t('patientTracking'), t('hospitalCoordination')]}
            color="from-red-500 to-red-600"
          />
          
          <FlowNode 
            icon={Traffic}
            title={t('trafficAuthority')} 
            features={[t('routeClearing'), t('congestionManagement'), t('emergencyCoordination')]}
            color="from-amber-500 to-amber-600"
          />
          
          <FlowNode 
            icon={User}
            title={t('nurses')} 
            features={[t('patientCare'), t('homeVisits'), t('medicationManagement')]}
            color="from-purple-500 to-purple-600"
          />
        </div>
        
        {/* Key Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureNode icon={Wallet} title={t('healthCard')} />
          <FeatureNode icon={MessageSquare} title={t('inAppCommunication')} />
          <FeatureNode icon={Bell} title={t('instantAlerts')} />
          <FeatureNode icon={HeartPulse} title={t('emergencyResponse')} />
        </div>
      </div>
    </div>
  );
};

interface FlowNodeProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  features: string[];
  color: string;
}

const FlowNode: React.FC<FlowNodeProps> = ({ icon: Icon, title, features, color }) => {
  return (
    <div className="flex flex-col items-center animate-on-scroll">
      <div className={`w-full p-5 rounded-xl shadow-lg bg-gradient-to-br ${color} text-white text-center touch-effect transform hover:scale-105 transition-transform duration-300`}>
        <div className="bg-white/20 rounded-full p-3 inline-flex mb-3">
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="font-bold mb-3">{title}</h3>
        <ul className="text-xs space-y-2 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 w-1.5 h-1.5 bg-white rounded-full"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface FeatureNodeProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
}

const FeatureNode: React.FC<FeatureNodeProps> = ({ icon: Icon, title }) => {
  return (
    <div className="bg-gradient-to-r from-medisync-orange to-medisync-dark-orange p-0.5 rounded-lg shadow-lg animate-on-scroll touch-effect">
      <div className="bg-white rounded-lg p-4 flex items-center gap-3 h-full">
        <div className="bg-medisync-orange/10 p-2 rounded-lg">
          <Icon size={24} className="text-medisync-orange" />
        </div>
        <h4 className="font-medium text-medisync-black">{title}</h4>
      </div>
    </div>
  );
};

export default SystemFlowDiagram;
