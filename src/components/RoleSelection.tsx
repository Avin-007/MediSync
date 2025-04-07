
import React from 'react';
import { Card } from './ui/card';
import { Ambulance, Hospital, User, AlertTriangle, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

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
        <div className={`p-3 rounded-full ${color.includes('blue') ? 'bg-medisync-light-blue' : 'bg-medisync-light-red'}`}>
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

  return (
    <div className="space-y-6">
      {!isAuthenticated && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start gap-3 mb-6">
          <AlertTriangle className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
          <div className="space-y-2">
            <h3 className="font-medium">Authentication Required</h3>
            <p className="text-sm text-gray-600">
              For full access to all features, please login to your account.
            </p>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
            >
              Go to Login
            </Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoleCard
          title="Ambulance Driver"
          description="Access navigation, emergency routes, and traffic synchronization"
          icon={<Ambulance size={32} className="text-medisync-blue" />}
          path={isAuthenticated ? "/ambulance" : "/login"}
          color="border-medisync-blue"
        />
        <RoleCard
          title="Hospital Admin"
          description="Manage resources, coordinate ambulances, and monitor emergencies"
          icon={<Hospital size={32} className="text-medisync-red" />}
          path={isAuthenticated ? "/hospital" : "/login"}
          color="border-medisync-red"
        />
        <RoleCard
          title="User / Patient"
          description="Request ambulance services or medical assistance"
          icon={<User size={32} className="text-medisync-blue" />}
          path={isAuthenticated ? "/user" : "/login"}
          color="border-medisync-blue"
        />
        <RoleCard
          title="Traffic Authority"
          description="Manage traffic signals and clear routes for emergency vehicles"
          icon={<AlertTriangle size={32} className="text-medisync-red" />}
          path={isAuthenticated ? "/traffic" : "/login"}
          color="border-medisync-red"
        />
        <RoleCard
          title="Home Care Nurse"
          description="Provide medical services through home visits and remote care"
          icon={<UserCog size={32} className="text-medisync-blue" />}
          path={isAuthenticated ? "/nurse" : "/login"}
          color="border-medisync-blue"
        />
      </div>
    </div>
  );
};

export default RoleSelection;
