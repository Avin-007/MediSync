
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Ambulance, 
  Hospital, 
  TestTube, 
  Stethoscope, 
  MapPin, 
  Heart, 
  Phone, 
  MessageSquare, 
  Clock,
  Star,
  Shield,
  Zap,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ModernFeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const coreFeatures = [
    {
      icon: <Brain size={32} />,
      title: "AI Health Assistant",
      description: "Smart symptom analysis and personalized health recommendations",
      color: "from-purple-500 to-purple-600",
      path: "/user"
    },
    {
      icon: <Ambulance size={32} />,
      title: "Emergency Response",
      description: "24/7 emergency services with real-time ambulance tracking",
      color: "from-red-500 to-red-600",
      path: "/ambulance"
    },
    {
      icon: <Hospital size={32} />,
      title: "Hospital Network",
      description: "Connected network of hospitals and healthcare providers",
      color: "from-blue-500 to-blue-600",
      path: "/hospital"
    },
    {
      icon: <TestTube size={32} />,
      title: "Lab Services",
      description: "Book lab tests, get reports, and track health metrics",
      color: "from-green-500 to-green-600",
      path: "/user"
    }
  ];

  const quickServices = [
    {
      icon: <Stethoscope size={24} />,
      title: "Find Doctors",
      description: "Available specialists near you",
      badge: "Online",
      badgeColor: "bg-green-500"
    },
    {
      icon: <MapPin size={24} />,
      title: "Nearby Hospitals",
      description: "Locate healthcare facilities",
      badge: "GPS",
      badgeColor: "bg-blue-500"
    },
    {
      icon: <Phone size={24} />,
      title: "Telemedicine",
      description: "Virtual consultations",
      badge: "24/7",
      badgeColor: "bg-purple-500"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Health Chat",
      description: "Secure messaging with doctors",
      badge: "Secure",
      badgeColor: "bg-indigo-500"
    }
  ];

  const stats = [
    { icon: <Heart size={24} />, number: "50K+", label: "Happy Patients" },
    { icon: <Hospital size={24} />, number: "200+", label: "Partner Hospitals" },
    { icon: <Stethoscope size={24} />, number: "500+", label: "Expert Doctors" },
    { icon: <Clock size={24} />, number: "24/7", label: "Emergency Care" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2">
            <Zap size={16} className="mr-2" />
            Core Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Complete Healthcare
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need for modern healthcare management in one integrated platform
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-white/80 backdrop-blur-sm overflow-hidden"
              onClick={() => isAuthenticated ? navigate(feature.path) : {}}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:text-blue-500">
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Quick Access Services</h3>
            <p className="text-lg text-gray-600">Instant access to essential healthcare services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
              <Card key={index} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      {service.icon}
                    </div>
                    <Badge className={`${service.badgeColor} text-white text-xs`}>
                      {service.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trusted by Thousands</h3>
            <p className="text-xl text-white/90">Making healthcare accessible across Nepal</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    {React.cloneElement(stat.icon, { className: "text-white" })}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturesSection;
