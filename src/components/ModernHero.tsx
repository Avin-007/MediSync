
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, CheckCircle, Heart, Activity, Shield, Stethoscope, Pill, Database, Video, Calendar } from 'lucide-react';
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
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const healthFeatures = [
    { icon: Stethoscope, label: "Virtual Consultations", color: "text-blue-500" },
    { icon: Database, label: "HL7 FHIR Integration", color: "text-green-500" },
    { icon: Activity, label: "Real-time Monitoring", color: "text-purple-500" },
    { icon: Shield, label: "HIPAA Compliant", color: "text-orange-500" }
  ];

  const telehealthStats = [
    { number: "100K+", label: "Patients Connected" },
    { number: "500+", label: "Healthcare Providers" },
    { number: "24/7", label: "Medical Support" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % healthFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center">
      {/* Medical DNA Helix Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dna-helix" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0Q10 10 20 0M0 20Q10 30 20 20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              <circle cx="5" cy="5" r="1" fill="currentColor"/>
              <circle cx="15" cy="15" r="1" fill="currentColor"/>
              <circle cx="5" cy="25" r="1" fill="currentColor"/>
              <circle cx="15" cy="35" r="1" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dna-helix)"/>
        </svg>
      </div>

      {/* Floating Medical Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0
            }}
            animate={{ 
              y: -50,
              x: Math.random() * window.innerWidth,
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            {React.createElement(
              [Heart, Stethoscope, Pill, Activity, Shield][Math.floor(Math.random() * 5)],
              { 
                size: Math.random() * 20 + 20, 
                className: `text-blue-300/40` 
              }
            )}
          </motion.div>
        ))}
      </div>

      {/* Animated Medical Cross */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 text-red-300/30"
      >
        <div className="w-20 h-20 relative">
          <div className="absolute inset-x-1/2 inset-y-0 w-6 bg-current transform -translate-x-1/2 rounded"></div>
          <div className="absolute inset-y-1/2 inset-x-0 h-6 bg-current transform -translate-y-1/2 rounded"></div>
        </div>
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* HL7 FHIR Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium">
                <Database size={16} className="mr-2" />
                HL7 FHIR Certified • HIPAA Compliant
              </Badge>
            </motion.div>
            
            {/* Main heading */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                    मेडि
                  </span>
                  <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent">
                    सिंक
                  </span>
                </h1>
                
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 text-green-500"
                >
                  <Stethoscope size={32} />
                </motion.div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Advanced Telehealth
                <span className="block text-2xl lg:text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-normal mt-2">
                  Platform with HL7 Integration
                </span>
              </h2>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Next-generation healthcare platform with HL7 FHIR standards, AI-powered diagnostics, real-time telemedicine, and seamless electronic health record integration across Nepal's healthcare ecosystem.
            </motion.p>
            
            {/* CTA Buttons */}
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
                      className="bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 hover:from-blue-600 hover:via-blue-700 hover:to-green-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform transition-all duration-300"
                      onClick={onShowAuth}
                    >
                      Access Telehealth Portal
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
                      <Video className="mr-2" size={20} />
                      Virtual Consultation Demo
                    </Button>
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform transition-all"
                    onClick={onShowHealthID}
                  >
                    Open Health Dashboard
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
            
            {/* Rotating Health Features */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {healthFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border text-center transition-all ${
                    currentFeature === index ? 'border-blue-300 shadow-lg' : 'border-gray-100'
                  }`}
                >
                  <motion.div
                    animate={currentFeature === index ? { 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <feature.icon className={`${feature.color} mx-auto mb-2`} size={24} />
                  </motion.div>
                  <div className="text-xs font-medium text-gray-700">{feature.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Trust indicators */}
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
                <span className="text-sm text-gray-600">4.9/5 Healthcare Rating</span>
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
                <span className="text-sm text-gray-600">HL7 FHIR Certified</span>
              </div>
            </motion.div>
          </div>
          
          {/* Right content - Interactive Telehealth Dashboard */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main telehealth interface mockup */}
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
                  {/* Telehealth Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <Stethoscope size={20} className="text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-gray-900">Telehealth Portal</h3>
                        <p className="text-xs text-gray-500">HL7 FHIR Enabled</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        backgroundColor: ['#22c55e', '#3b82f6', '#22c55e']
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                  </div>
                  
                  {/* Virtual Consultation Interface */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Video className="text-blue-500" size={20} />
                        <span className="font-medium">Active Consultation</span>
                        <Badge className="bg-green-100 text-green-800">Live</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-200 rounded aspect-video flex items-center justify-center">
                          <span className="text-xs text-gray-600">Doctor View</span>
                        </div>
                        <div className="bg-gray-200 rounded aspect-video flex items-center justify-center">
                          <span className="text-xs text-gray-600">Patient View</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* HL7 Data Exchange */}
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="text-green-500" size={16} />
                        <span className="text-sm font-medium">HL7 FHIR Data Exchange</span>
                      </div>
                      <div className="space-y-1">
                        {['Patient Demographics', 'Medical History', 'Lab Results', 'Prescriptions'].map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ 
                              delay: 2 + index * 0.3,
                              duration: 1
                            }}
                            className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded"
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Real-time Monitoring */}
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-purple-500" size={16} />
                        <span className="text-sm font-medium">Real-time Vitals</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Heart Rate: <strong>72 BPM</strong></span>
                        <span>SpO2: <strong>98%</strong></span>
                      </div>
                      <div className="mt-2 h-2 bg-purple-200 rounded">
                        <motion.div
                          animate={{ width: ['0%', '100%', '0%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="h-full bg-purple-500 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating feature cards */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    <Shield size={16} className="text-green-500" />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700">HIPAA Secure</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Smart Scheduling</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {telehealthStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHero;
