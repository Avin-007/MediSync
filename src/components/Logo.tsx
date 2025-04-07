
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="h-8 w-8 bg-medisync-blue rounded-full flex items-center justify-center">
          <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
            <div className="h-4 w-4 bg-medisync-red rounded-full"></div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-medisync-red rounded-full animate-pulse-slow"></div>
      </div>
      <div className="font-bold text-xl">
        <span className="text-medisync-blue">Medi</span>
        <span className="text-medisync-red">Sync</span>
      </div>
    </div>
  );
};

export default Logo;
