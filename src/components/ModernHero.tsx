
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, CheckCircle, Heart, Activity, Shield, Plus } from 'lucide-react';
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
    { icon: Activity, color: 'text-purple-500', value: '24/7', label: 'Monitoring' }
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

      {/* Animated Heartbeat Line Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-1/2 left-0 w-full h-32 transform -translate-y-1/2 opacity-10" viewBox="0 0 1200 100">
          <motion.path
            d="M0,50 L200,50 L220,20 L240,80 L260,10 L280,90 L300,50 L1200,50"
            stroke="url(#heartbeat-gradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <defs>
            <linearGradient id="heartbeat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Medical Hearts with Heartbeat Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10
            }}
            animate={{ 
              y: -50,
              x: Math.random() * window.innerWidth
            }}
            transition={{ 
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart 
                className="text-red-400/30" 
                size={Math.random() * 20 + 20} 
                fill="currentColor"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Animated Health Pulse Circles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-blue-300/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Floating medical icons with health themes */}
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
          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="text-red-300/40" size={40} fill="currentColor" />
          </motion.div>
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
          <Activity className="text-green-300/40" size={35} />
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
          <Shield className="text-blue-300/40" size={32} />
        </motion.div>

        {/* Additional medical plus signs */}
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-2/3 right-1/3"
        >
          <Plus className="text-red-300/40" size={28} />
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
                
                {/* Heartbeat pulse animation */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 text-red-500"
                >
                  <Heart size={32} fill="currentColor" />
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
                      <Heart size={20} fill="currentColor" />
                    </motion.div>
                  </Button>
                </motion.div>
              )}
            </motion.div>
            
            {/* Health Metrics Display with heartbeat animations */}
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
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 text-center relative overflow-hidden"
                >
                  {/* Pulse background for heart health */}
                  {metric.label === 'Heart Health' && (
                    <motion.div
                      className="absolute inset-0 bg-red-100/50"
                      animate={{
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  <motion.div
                    animate={{ 
                      rotate: index % 2 === 0 ? [0, 360] : [360, 0],
                      scale: metric.label === 'Heart Health' ? [1, 1.1, 1] : [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: metric.label === 'Heart Health' ? 1.2 : 8,
                      repeat: Infinity,
                      ease: metric.label === 'Heart Health' ? "easeInOut" : "linear"
                    }}
                    className="relative z-10"
                  >
                    <metric.icon className={`${metric.color} mx-auto mb-2`} size={24} />
                  </motion.div>
                  <div className="text-lg font-bold text-gray-900 relative z-10">{metric.value}</div>
                  <div className="text-xs text-gray-600 relative z-10">{metric.label}</div>
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
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <Heart size={20} className="text-white" fill="currentColor" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-gray-900">Health Dashboard</h3>
                        <p className="text-xs text-gray-500">Real-time monitoring</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.2,
                        repeat: Infinity
                      }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                  </div>
                  
                  {/* Vital Signs with heartbeat animations */}
                  <div className="space-y-4">
                    {[
                      { label: 'Heart Rate', value: '72 BPM', color: 'bg-red-100 text-red-800', progress: 72, isHeart: true },
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
                        {vital.isHeart && (
                          <motion.div
                            className="absolute inset-0 bg-red-200/30"
                            animate={{
                              opacity: [0, 0.5, 0]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
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
                  
                  {/* Activity Chart Mockup with heartbeat-like bars */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Activity</h4>
                    <div className="flex items-end justify-between h-16 gap-1">
                      {[40, 65, 45, 80, 60, 95, 70].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${height}%`,
                            backgroundColor: index === 3 ? ['#3b82f6', '#ef4444', '#3b82f6'] : '#3b82f6'
                          }}
                          transition={{ 
                            duration: 0.8,
                            delay: 2 + index * 0.1,
                            backgroundColor: {
                              duration: 1.2,
                              repeat: index === 3 ? Infinity : 0,
                              ease: "easeInOut"
                            }
                          }}
                          className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm flex-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating notification cards with health themes */}
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
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      duration: 1.2,
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
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart size={16} className="text-red-500" fill="currentColor" />
                  </motion.div>
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
