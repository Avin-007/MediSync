
import React from 'react';
import { Card } from './ui/card';
import { Ambulance, Hospital, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RoleCard
        title="Ambulance Driver"
        description="Access navigation, emergency routes, and traffic synchronization"
        icon={<Ambulance size={32} className="text-medisync-blue" />}
        path="/ambulance"
        color="border-medisync-blue"
      />
      <RoleCard
        title="Hospital Admin"
        description="Manage resources, coordinate ambulances, and monitor emergencies"
        icon={<Hospital size={32} className="text-medisync-red" />}
        path="/hospital"
        color="border-medisync-red"
      />
      <RoleCard
        title="User / Patient"
        description="Request ambulance services or medical assistance"
        icon={<User size={32} className="text-medisync-blue" />}
        path="/user"
        color="border-medisync-blue"
      />
    </div>
  );
};

export default RoleSelection;
