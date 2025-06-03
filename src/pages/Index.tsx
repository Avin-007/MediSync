import React, { useState } from 'react';
import Header from '@/components/Header';
import ModernLogo from '@/components/ModernLogo';
import ModernHero from '@/components/ModernHero';
import ModernFeaturesSection from '@/components/ModernFeaturesSection';
import ResponsiveRoleSelection from '@/components/home/ResponsiveRoleSelection';
import IntegratedAuth from '@/components/IntegratedAuth';
import HealthIDCard from '@/components/HealthIDCard';
import AnimatedDoctorFinder from '@/components/home/AnimatedDoctorFinder';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Flag, 
  Heart, 
  Shield, 
  Zap,
  MapPin,
  Clock,
  Phone,
  Award,
  Users,
  Activity,
  Stethoscope,
  Ambulance,
  Hospital,
  Brain,
  Eye
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import ChatbotButton from '@/components/ai/ChatbotButton';

const Index = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showHealthID, setShowHealthID] = useState(false);

  const testimonials = [
    {
      name: "Dr. Anjana Sharma",
      role: "Cardiologist",
      location: "Kathmandu",
      text: "MediSync has revolutionized how we manage patient care. The real-time data sharing saves lives.",
      rating: 5,
      avatar: "AS"
    },
    {
      name: "Ram Bahadur",
      role: "Patient",
      location: "Pokhara", 
      text: "Getting emergency help has never been easier. The ambulance reached me in just 8 minutes!",
      rating: 5,
      avatar: "RB"
    },
    {
      name: "Dr. Sunita Rai",
      role: "Pediatrician", 
      location: "Chitwan",
      text: "The Health ID system helps me access patient history instantly. It's a game changer!",
      rating: 5,
      avatar: "SR"
    }
  ];

  const services = [
    {
      title: "Emergency Response",
      description: "24/7 ambulance and emergency medical services",
      icon: Ambulance,
      color: "from-red-500 to-red-600",
      delay: 0.1
    },
    {
      title: "Find Specialists",
      description: "Connect with top doctors and specialists",
      icon: Stethoscope,
      color: "from-blue-500 to-blue-600",
      delay: 0.2
    },
    {
      title: "Hospital Network",
      description: "Access to 200+ partner hospitals",
      icon: Hospital,
      color: "from-green-500 to-green-600",
      delay: 0.3
    },
    {
      title: "Health Monitoring",
      description: "AI-powered health tracking and insights",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      delay: 0.4
    }
  ];

  const healthStats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "200+", label: "Partner Hospitals", icon: Hospital },
    { number: "1000+", label: "Emergency Responses", icon: Ambulance },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Header */}
      <header className="border-b bg-white/95 backdrop-blur-md py-4 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <ModernLogo />
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="hidden sm:flex hover:bg-blue-50 hover:text-blue-600"
          >
            Features
          </Button>
          <Button 
            variant="ghost" 
            className="hidden sm:flex hover:bg-blue-50 hover:text-blue-600"
          >
            About
          </Button>
          
          {!isAuthenticated ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setShowAuth(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              >
                Get Started
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setShowHealthID(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
              >
                <Heart className="mr-2" size={16} />
                My Health ID
              </Button>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <ModernHero 
        onShowAuth={() => setShowAuth(true)}
        onShowHealthID={() => setShowHealthID(true)}
      />

      {/* Animated Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2">
              <Zap size={16} className="mr-2" />
              Quick Access Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Healthcare at
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
                Your Fingertips
              </span>
            </h2>
          </motion.div>
          
          {/* Animated Doctor Finder */}
          <div className="mb-12">
            <AnimatedDoctorFinder />
          </div>
          
          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: service.delay }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <service.icon size={32} className="text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <ModernFeaturesSection />

      {/* Health Statistics with Animations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by
              <span className="block text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                Healthcare Professionals
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {healthStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <stat.icon size={32} className="text-white" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 px-4 py-2">
              <Users size={16} className="mr-2" />
              Multi-Role Access
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="block text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                Healthcare Role
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access specialized features and services tailored to your healthcare needs
            </p>
          </motion.div>
          <ResponsiveRoleSelection />
        </div>
      </section>

      {/* Testimonials Section with Enhanced Animations */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-4 py-2">
              <Award size={16} className="mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Users
              <span className="block text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text">
                Are Saying
              </span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5
                }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star size={20} className="text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg"
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role} • {testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nepal Heritage Section with Enhanced Animations */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100],
                y: [0, Math.random() * 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flag size={64} className="mx-auto mb-8" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Proudly Serving
            <span className="block">नेपाल</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Bridging traditional healthcare with modern technology to serve every corner of Nepal
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { icon: MapPin, stat: "77 Districts", label: "Coverage" },
              { icon: Clock, stat: "24/7", label: "Emergency" },
              { icon: Phone, stat: "5 Languages", label: "Support" },
              { icon: Activity, stat: "ISO Certified", label: "Quality" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 2 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <item.icon size={32} className="mx-auto mb-4" />
                </motion.div>
                <div className="text-2xl font-bold">{item.stat}</div>
                <div className="text-white/80">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section with Enhanced Animations */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Transform
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Your Healthcare?
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of users who are already experiencing better healthcare with MediSync
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {!isAuthenticated ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-xl shadow-2xl hover:shadow-blue-500/25 transform transition-all"
                    onClick={() => setShowAuth(true)}
                  >
                    Start Your Health Journey
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-3"
                    >
                      <ArrowRight size={24} />
                    </motion.div>
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-12 py-6 text-xl shadow-2xl hover:shadow-green-500/25 transform transition-all"
                    onClick={() => setShowHealthID(true)}
                  >
                    Access Your Dashboard
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="ml-3"
                    >
                      <Heart size={24} />
                    </motion.div>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Auth Modal */}
      {showAuth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          <IntegratedAuth onClose={() => setShowAuth(false)} />
        </motion.div>
      )}

      {/* Enhanced Health ID Modal */}
      {showHealthID && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-black/20 rounded-full p-2 backdrop-blur-sm"
              onClick={() => setShowHealthID(false)}
            >
              ✕ Close
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HealthIDCard />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* AI Chatbot */}
      <ChatbotButton />
    </div>
  );
};

export default Index;
