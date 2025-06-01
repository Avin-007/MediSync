
import React from 'react';
import { Heart, Plus } from 'lucide-react';

const ModernLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Main logo container */}
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          {/* Medical cross */}
          <Plus size={20} className="text-white relative z-10" strokeWidth={3} />
          {/* Pulse indicator */}
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
            <Heart size={10} className="text-white animate-pulse" fill="currentColor" />
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 h-10 w-10 bg-blue-500/30 rounded-2xl blur-md animate-pulse"></div>
      </div>
      <div className="font-bold text-2xl tracking-tight">
        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Medi</span>
        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Sync</span>
      </div>
    </div>
  );
};

export default ModernLogo;
