
import React from 'react';
import { Card } from './ui/card';
import { Ambulance, Hospital, User, AlertTriangle, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, path, color }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className={`p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 ${color}`}
      onClick={() => navigate(path)}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className={`p-3 rounded-full ${color.includes('royal-blue') ? 'bg-nepal-royal-blue-light' : 'bg-nepal-crimson-light'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </Card>
  );
};

const RoleSelection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {!isAuthenticated && (
        <div className="bg-nepal-crimson-light border border-nepal-crimson/20 p-4 rounded-lg flex items-start gap-3 mb-6">
          <AlertTriangle className="text-nepal-crimson mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium">{t('authenticationRequired')}</h3>
            <p className="text-sm text-gray-600">
              {t('fullAccessFeatures')}
            </p>
            <Button 
              onClick={() => navigate('/login')}
              variant="nepal-crimson-outline"
              className="border-nepal-crimson/70"
            >
              {t('goToLogin')}
            </Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoleCard
          title={t('ambulanceDriver')}
          description={t('ambulanceDriverDesc')}
          icon={<Ambulance size={32} className="text-nepal-royal-blue" />}
          path={isAuthenticated ? "/ambulance" : "/login"}
          color="border-nepal-royal-blue"
        />
        <RoleCard
          title={t('hospitalAdmin')}
          description={t('hospitalAdminDesc')}
          icon={<Hospital size={32} className="text-nepal-crimson" />}
          path={isAuthenticated ? "/hospital" : "/login"}
          color="border-nepal-crimson"
        />
        <RoleCard
          title={t('userPatient')}
          description={t('userPatientDesc')}
          icon={<User size={32} className="text-nepal-royal-blue" />}
          path={isAuthenticated ? "/user" : "/login"}
          color="border-nepal-royal-blue"
        />
        <RoleCard
          title={t('trafficAuthority')}
          description={t('trafficAuthorityDesc')}
          icon={<AlertTriangle size={32} className="text-nepal-crimson" />}
          path={isAuthenticated ? "/traffic" : "/login"}
          color="border-nepal-crimson"
        />
        <RoleCard
          title={t('homeCareNurse')}
          description={t('homeCareNurseDesc')}
          icon={<UserCog size={32} className="text-nepal-royal-blue" />}
          path={isAuthenticated ? "/nurse" : "/login"}
          color="border-nepal-royal-blue"
        />
      </div>
    </div>
  );
};

export default RoleSelection;
