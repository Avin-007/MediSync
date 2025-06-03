
import React from 'react';
import { Card } from '@/components/ui/card';
import { Ambulance, Hospital, User, AlertTriangle, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradientClass: string;
  delay: number;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, path, gradientClass, delay }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Card 
        className="p-6 cursor-pointer transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:bg-white/95 relative overflow-hidden group"
        onClick={() => navigate(path)}
      >
        {/* iOS-style background gradient overlay */}
        <div className={`absolute inset-0 opacity-5 ${gradientClass} group-hover:opacity-10 transition-opacity`}></div>
        
        <div className="flex flex-col items-center text-center gap-4 relative z-10">
          {/* iOS-style icon container */}
          <motion.div 
            className={`ios-icon-modern ${gradientClass} w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center relative overflow-hidden`}
            whileHover={{ 
              rotate: [0, -3, 3, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent rounded-2xl"></div>
            
            {/* Icon shadow */}
            <div className="absolute inset-0 bg-black/10 rounded-2xl blur-sm transform translate-y-1"></div>
            
            <motion.div 
              className="text-white relative z-10 drop-shadow-sm"
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.div>
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
              {description}
            </p>
          </div>
          
          {/* Subtle glow effect on hover */}
          <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity ${gradientClass} blur-xl`}></div>
        </div>
      </Card>
    </motion.div>
  );
};

const ResponsiveRoleSelection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {!isAuthenticated && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-6 rounded-2xl flex items-start gap-4 mb-8 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern id="warning-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#warning-pattern)"/>
            </svg>
          </div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={24} />
          </motion.div>
          <div className="space-y-4 relative z-10">
            <h3 className="font-semibold text-gray-900 text-lg">{t('authenticationRequired')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('fullAccessFeatures')}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg"
              >
                {t('goToLogin')}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <RoleCard
          title={t('ambulanceDriver')}
          description={t('ambulanceDriverDesc')}
          icon={<Ambulance size={36} />}
          path={isAuthenticated ? "/ambulance" : "/login"}
          gradientClass="bg-gradient-to-br from-red-500 via-red-600 to-orange-500"
          delay={0.1}
        />
        <RoleCard
          title={t('hospitalAdmin')}
          description={t('hospitalAdminDesc')}
          icon={<Hospital size={36} />}
          path={isAuthenticated ? "/hospital" : "/login"}
          gradientClass="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500"
          delay={0.2}
        />
        <RoleCard
          title={t('userPatient')}
          description={t('userPatientDesc')}
          icon={<User size={36} />}
          path={isAuthenticated ? "/user" : "/login"}
          gradientClass="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
          delay={0.3}
        />
        <RoleCard
          title={t('trafficAuthority')}
          description={t('trafficAuthorityDesc')}
          icon={<AlertTriangle size={36} />}
          path={isAuthenticated ? "/traffic" : "/login"}
          gradientClass="bg-gradient-to-br from-pink-500 via-rose-500 to-red-400"
          delay={0.4}
        />
        <RoleCard
          title={t('homeCareNurse')}
          description={t('homeCareNurseDesc')}
          icon={<UserCog size={36} />}
          path={isAuthenticated ? "/nurse" : "/login"}
          gradientClass="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500"
          delay={0.5}
        />
      </div>
    </div>
  );
};

export default ResponsiveRoleSelection;
