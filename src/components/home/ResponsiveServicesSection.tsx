
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  Hospital, 
  TestTube, 
  MapPin, 
  Percent, 
  Gift,
  Brain,
  Heart,
  Pill,
  Clock,
  Phone,
  Star
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const ResponsiveServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      id: 'ai-assistance',
      title: t('aiAssistance'),
      description: t('aiAssistanceDesc'),
      icon: <Brain size={28} />,
      gradientClass: 'gradient-lab',
      path: '/user'
    },
    {
      id: 'lab-services',
      title: t('labServices'),
      description: 'Book lab tests, get reports, track results',
      icon: <TestTube size={28} />,
      gradientClass: 'gradient-lab',
      path: '/user'
    },
    {
      id: 'doctor-availability',
      title: 'Doctor Availability',
      description: 'Find available doctors, book appointments',
      icon: <Stethoscope size={28} />,
      gradientClass: 'gradient-doctor',
      path: '/user'
    },
    {
      id: 'nearby-hospitals',
      title: 'Nearby Hospitals',
      description: 'Locate hospitals, check services, get directions',
      icon: <Hospital size={28} />,
      gradientClass: 'gradient-hospital',
      path: '/user'
    }
  ];

  const offers = [
    {
      id: 'health-checkup',
      title: '50% Off Health Checkup',
      description: 'Complete health package at discounted rates',
      icon: <Heart size={24} />,
      badge: '50% OFF',
      color: 'bg-red-500'
    },
    {
      id: 'lab-tests',
      title: 'Free Home Collection',
      description: 'No charges for sample collection at home',
      icon: <TestTube size={24} />,
      badge: 'FREE',
      color: 'bg-green-500'
    },
    {
      id: 'consultation',
      title: '24/7 Consultation',
      description: 'Round the clock medical consultation',
      icon: <Phone size={24} />,
      badge: '24/7',
      color: 'bg-blue-500'
    },
    {
      id: 'medication',
      title: 'Medicine Delivery',
      description: 'Get medicines delivered to your doorstep',
      icon: <Pill size={24} />,
      badge: 'FAST',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Main Services Section */}
      <section className="responsive-section">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            {t('features')}
          </Badge>
          <h2 className="responsive-heading font-bold mb-4 text-gray-900">
            Healthcare Services
          </h2>
          <p className="responsive-text text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare solutions at your fingertips
          </p>
        </div>
        
        <div className="responsive-grid">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white/80 backdrop-blur-sm"
              onClick={() => navigate(service.path)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`ios-icon ${service.gradientClass} w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center`}>
                  <div className="text-white relative z-10">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                  {service.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-gray-50"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Offers and Promotions Section */}
      <section className="responsive-section bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
            Special Offers
          </Badge>
          <h2 className="responsive-heading font-bold mb-4 text-gray-900">
            Exclusive Promotions
          </h2>
          <p className="responsive-text text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take advantage of our limited-time healthcare offers
          </p>
        </div>
        
        <div className="responsive-grid">
          {offers.map((offer) => (
            <Card 
              key={offer.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white/90 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 ${offer.color} rounded-xl flex items-center justify-center`}>
                    <div className="text-white">
                      {offer.icon}
                    </div>
                  </div>
                  <Badge className={`${offer.color} text-white hover:opacity-90`}>
                    {offer.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">{offer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                  {offer.description}
                </p>
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  size="sm"
                >
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="responsive-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600 text-sm sm:text-base">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600 text-sm sm:text-base">Expert Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600 text-sm sm:text-base">Partner Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm sm:text-base">Emergency Care</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsiveServicesSection;
