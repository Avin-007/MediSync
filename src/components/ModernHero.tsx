
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, CheckCircle, Heart, Activity, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface ModernHeroProps {
  onShowAuth: () => void;
  onShowHealthID: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onShowAuth, onShowHealthID }) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "200+", label: "Partner Hospitals" },
    { number: "1000+", label: "Emergency Responses" },
    { number: "24/7", label: "Support Available" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating medical icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-1/4 left-1/4 text-red-300/20 animate-bounce" size={32} />
        <Activity className="absolute top-1/3 right-1/4 text-blue-300/20 animate-bounce delay-300" size={28} />
        <Shield className="absolute bottom-1/3 left-1/3 text-green-300/20 animate-bounce delay-700" size={30} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium">
                <CheckCircle size={16} className="mr-2" />
                Nepal Ministry of Health Approved
              </Badge>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4 animate-fade-in delay-200">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">मेडि</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">सिंक</span>
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Complete Healthcare
                <span className="block text-2xl lg:text-3xl text-gray-600 font-normal mt-2">
                  At Your Fingertips
                </span>
              </h2>
            </div>
            
            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl animate-fade-in delay-300">
              Revolutionary healthcare platform connecting patients, hospitals, and emergency services across Nepal with AI-powered assistance.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-400">
              {!isAuthenticated ? (
                <>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    onClick={onShowAuth}
                  >
                    Get Started <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-4 text-lg"
                    onClick={onShowHealthID}
                  >
                    <Play className="mr-2" size={20} />
                    See Health ID
                  </Button>
                </>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  onClick={onShowHealthID}
                >
                  View My Health ID <Heart className="ml-2" size={20} />
                </Button>
              )}
            </div>
            
            {/* Stats carousel */}
            <div className="animate-fade-in delay-500">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-center transition-all duration-500">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stats[currentStat].number}
                    </div>
                    <div className="text-gray-600 text-sm">{stats[currentStat].label}</div>
                  </div>
                  <div className="flex space-x-1">
                    {stats.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStat ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 animate-fade-in delay-600">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-500" />
                <span className="text-sm text-gray-600">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Interactive visual */}
          <div className="relative animate-fade-in delay-700">
            <div className="relative">
              {/* Main device mockup */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                <div className="bg-white rounded-[2.5rem] p-8 h-96 flex flex-col justify-center items-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart size={32} className="text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">Health Dashboard</h3>
                    <p className="text-gray-600">Real-time monitoring</p>
                  </div>
                  <div className="w-full space-y-3">
                    <div className="bg-green-100 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-green-800 font-medium">Heart Rate</span>
                      <span className="text-green-600 font-bold">72 BPM</span>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-blue-800 font-medium">Blood Pressure</span>
                      <span className="text-blue-600 font-bold">120/80</span>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-purple-800 font-medium">Health Score</span>
                      <span className="text-purple-600 font-bold">95/100</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-4 shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Online</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-4 shadow-lg animate-bounce delay-500">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm font-medium text-gray-700">24/7 Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
