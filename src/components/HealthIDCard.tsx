
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Star, Heart, Activity, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HealthIDCard: React.FC = () => {
  const { user } = useAuth();
  
  const healthPoints = 2450; // Mock health points
  const healthLevel = "Excellent";
  
  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white border-0 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <CardContent className="p-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm font-medium text-white/80">Digital Health ID</h3>
            <p className="text-2xl font-bold">MediSync</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-white/80" />
            <Badge className="bg-white/20 text-white border-0">Verified</Badge>
          </div>
        </div>
        
        {/* User Info */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-2xl font-bold">{user?.name || "John Doe"}</p>
            <p className="text-white/80">ID: {user?.id || "MED-2024-001"}</p>
          </div>
          
          {/* Health Points */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-red-300" fill="currentColor" />
              <div>
                <p className="text-sm text-white/80">Health Points</p>
                <p className="text-xl font-bold">{healthPoints.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">Status</p>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-300" fill="currentColor" />
                <p className="font-semibold">{healthLevel}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* QR Code and Stats */}
        <div className="flex justify-between items-end">
          <div className="bg-white p-3 rounded-xl">
            <QrCode size={60} className="text-gray-900" />
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Activity size={16} />
              <span>Last checkup: 15 days ago</span>
            </div>
            <div className="text-xs text-white/70">
              Valid until: Dec 2025
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-300/10 rounded-full blur-xl"></div>
      </CardContent>
    </Card>
  );
};

export default HealthIDCard;
