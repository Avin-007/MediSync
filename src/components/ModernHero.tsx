
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, CheckCircle, Heart, Activity, Shield, Pulse, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

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

  const healthMetrics = [
    { icon: Heart, color: 'text-red-500', value: '98%', label: 'Heart Health' },
    { icon: Activity, color: 'text-green-500', value: '95%', label: 'Vital Signs' },
    { icon: Shield, color: 'text-blue-500', value: '100%', label: 'Data Security' },
    { icon: Pulse, color: 'text-purple-500', value: '24/7', label: 'Monitoring' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center">
      {/* Medical Cross Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="medical-cross" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M8 4h4v12h-4zM4 8h12v4H4z" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-cross)"/>
        </svg>
      </div>

      {/* Animated health particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10
            }}
            animate={{ 
              y: -10,
              x: Math.random() * window.innerWidth
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4"
        >
          <Heart className="text-red-300/30" size={40} />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/3 right-1/4"
        >
          <Activity className="text-green-300/30" size={35} />
        </motion.div>
        
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 left-1/3"
        >
          <Shield className="text-blue-300/30" size={32} />
        </motion.div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Ministry Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 text-sm font-medium">
                <CheckCircle size={16} className="mr-2" />
                Nepal Ministry of Health Approved
              </Badge>
            </motion.div>
            
            {/* Main heading with pulse animation */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold leading-tight"
                  animate={{ 
                    textShadow: [
                      '0 0 0 rgba(59, 130, 246, 0)',
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 0 rgba(59, 130, 246, 0)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                    मेडि
                  </span>
                  <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                    सिंक
                  </span>
                </motion.h1>
                
                {/* Plus icon animation */}
                <motion.div
                  animate={{ 
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 text-red-500"
                >
                  <Plus size={24} />
                </motion.div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Your Digital Health
                <span className="block text-2xl lg:text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-normal mt-2">
                  Companion & Guardian
                </span>
              </h2>
            </motion.div>
            
            {/* Description with typewriter effect */}
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Revolutionary healthcare platform connecting patients, hospitals, and emergency services across Nepal with AI-powered assistance and real-time health monitoring.
            </motion.p>
            
            {/* CTA Buttons with hover animations */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {!isAuthenticated ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform transition-all duration-300"
                      onClick={onShowAuth}
                    >
                      Start Your Health Journey
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-2"
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 text-lg hover:border-green-600"
                      onClick={onShowHealthID}
                    >
                      <Play className="mr-2" size={20} />
                      See Health ID Demo
                    </Button>
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform transition-all"
                    onClick={onShowHealthID}
                  >
                    Access My Health Dashboard
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="ml-2"
                    >
                      <Heart size={20} />
                    </motion.div>
                  </Button>
                </motion.div>
              )}
            </motion.div>
            
            {/* Health Metrics Display */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {healthMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 text-center"
                >
                  <motion.div
                    animate={{ 
                      rotate: index % 2 === 0 ? [0, 360] : [360, 0]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <metric.icon className={`${metric.color} mx-auto mb-2`} size={24} />
                  </motion.div>
                  <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Trust indicators with animations */}
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <Star size={16} className="text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(34, 197, 94, 0.4)',
                      '0 0 0 10px rgba(34, 197, 94, 0)',
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="rounded-full"
                >
                  <Shield size={16} className="text-green-500" />
                </motion.div>
                <span className="text-sm text-gray-600">ISO 27001 Certified</span>
              </div>
            </motion.div>
          </div>
          
          {/* Right content - Interactive Health Dashboard Mockup */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main device mockup with health dashboard */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl"
              >
                <div className="bg-white rounded-[2.5rem] p-6 h-[500px] overflow-hidden">
                  {/* Health Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <Heart size={20} className="text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-gray-900">Health Dashboard</h3>
                        <p className="text-xs text-gray-500">Real-time monitoring</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                  </div>
                  
                  {/* Vital Signs */}
                  <div className="space-y-4">
                    {[
                      { label: 'Heart Rate', value: '72 BPM', color: 'bg-red-100 text-red-800', progress: 72 },
                      { label: 'Blood Pressure', value: '120/80', color: 'bg-blue-100 text-blue-800', progress: 85 },
                      { label: 'Oxygen Level', value: '98%', color: 'bg-green-100 text-green-800', progress: 98 },
                      { label: 'Health Score', value: '95/100', color: 'bg-purple-100 text-purple-800', progress: 95 }
                    ].map((vital, index) => (
                      <motion.div
                        key={vital.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className={`${vital.color} rounded-lg p-3 relative overflow-hidden`}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <span className="font-medium text-sm">{vital.label}</span>
                          <span className="font-bold">{vital.value}</span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${vital.progress}%` }}
                          transition={{ 
                            duration: 2,
                            delay: 1.5 + index * 0.2,
                            ease: "easeOut"
                          }}
                          className="absolute bottom-0 left-0 h-1 bg-current opacity-30"
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Activity Chart Mockup */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Activity</h4>
                    <div className="flex items-end justify-between h-16 gap-1">
                      {[40, 65, 45, 80, 60, 95, 70].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ 
                            duration: 0.8,
                            delay: 2 + index * 0.1
                          }}
                          className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm flex-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating notification cards */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="w-3 h-3 bg-green-500 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">All Systems Healthy</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border"
              >
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm font-medium text-gray-700">24/7 Monitoring</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
