
import React from 'react';
import { Card } from '@/components/ui/card';
import { Ambulance, Hospital, User, AlertTriangle, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradientClass: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, path, gradientClass }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="p-4 sm:p-6 cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
      onClick={() => navigate(path)}
    >
      <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
        <div className={`ios-icon ${gradientClass} w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center`}>
          <div className="text-white relative z-10">
            {icon}
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

const ResponsiveRoleSelection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 sm:space-y-8">
      {!isAuthenticated && (
        <div className="bg-red-50 border border-red-200 p-4 sm:p-6 rounded-xl flex items-start gap-3 mb-6">
          <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">{t('authenticationRequired')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('fullAccessFeatures')}
            </p>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {t('goToLogin')}
            </Button>
          </div>
        </div>
      )}
      
      <div className="responsive-grid">
        <RoleCard
          title={t('ambulanceDriver')}
          description={t('ambulanceDriverDesc')}
          icon={<Ambulance size={32} />}
          path={isAuthenticated ? "/ambulance" : "/login"}
          gradientClass="gradient-ambulance"
        />
        <RoleCard
          title={t('hospitalAdmin')}
          description={t('hospitalAdminDesc')}
          icon={<Hospital size={32} />}
          path={isAuthenticated ? "/hospital" : "/login"}
          gradientClass="gradient-hospital"
        />
        <RoleCard
          title={t('userPatient')}
          description={t('userPatientDesc')}
          icon={<User size={32} />}
          path={isAuthenticated ? "/user" : "/login"}
          gradientClass="gradient-patient"
        />
        <RoleCard
          title={t('trafficAuthority')}
          description={t('trafficAuthorityDesc')}
          icon={<AlertTriangle size={32} />}
          path={isAuthenticated ? "/traffic" : "/login"}
          gradientClass="gradient-traffic"
        />
        <RoleCard
          title={t('homeCareNurse')}
          description={t('homeCareNurseDesc')}
          icon={<UserCog size={32} />}
          path={isAuthenticated ? "/nurse" : "/login"}
          gradientClass="gradient-nurse"
        />
      </div>
    </div>
  );
};

export default ResponsiveRoleSelection;
