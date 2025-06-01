
import React, { useState } from 'react';
import Header from '@/components/Header';
import ModernLogo from '@/components/ModernLogo';
import ModernHero from '@/components/ModernHero';
import ModernFeaturesSection from '@/components/ModernFeaturesSection';
import ResponsiveRoleSelection from '@/components/home/ResponsiveRoleSelection';
import IntegratedAuth from '@/components/IntegratedAuth';
import HealthIDCard from '@/components/HealthIDCard';
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
  Activity
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

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
      rating: 5
    },
    {
      name: "Ram Bahadur",
      role: "Patient",
      location: "Pokhara", 
      text: "Getting emergency help has never been easier. The ambulance reached me in just 8 minutes!",
      rating: 5
    }
  ];

  const offers = [
    {
      title: "Free Health Checkup",
      description: "Complete health package for new users",
      badge: "50% OFF",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "24/7 Telemedicine",
      description: "Connect with doctors anytime",
      badge: "FREE",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Lab Tests at Home",
      description: "Sample collection at your doorstep",
      badge: "NEW",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Updated Header with Modern Logo */}
      <header className="border-b bg-white/95 backdrop-blur-md py-4 px-6 flex items-center justify-between sticky top-0 z-40">
        <ModernLogo />
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="hidden sm:flex"
          >
            Features
          </Button>
          <Button 
            variant="ghost" 
            className="hidden sm:flex"
          >
            About
          </Button>
          
          {!isAuthenticated ? (
            <Button 
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              Get Started
            </Button>
          ) : (
            <Button 
              onClick={() => setShowHealthID(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <Heart className="mr-2" size={16} />
              My Health ID
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <ModernHero 
        onShowAuth={() => setShowAuth(true)}
        onShowHealthID={() => setShowHealthID(true)}
      />

      {/* Features Section */}
      <ModernFeaturesSection />

      {/* Role Selection Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 px-4 py-2">
              <Users size={16} className="mr-2" />
              Access by Role
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
          </div>
          <ResponsiveRoleSelection />
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 px-4 py-2">
              <Zap size={16} className="mr-2" />
              Limited Time Offers
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Exclusive Health
              <span className="block text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                Promotions
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${offer.color}`}></div>
                <CardContent className="p-8 text-center">
                  <Badge className={`mb-4 bg-gradient-to-r ${offer.color} text-white text-sm px-3 py-1`}>
                    {offer.badge}
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{offer.title}</h3>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  <Button className={`w-full bg-gradient-to-r ${offer.color} text-white hover:opacity-90`}>
                    Claim Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role} • {testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nepal Heritage Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Flag size={64} className="mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Proudly Serving
            <span className="block">नेपाल</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Bridging traditional healthcare with modern technology to serve every corner of Nepal
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-4" />
              <div className="text-2xl font-bold">77 Districts</div>
              <div className="text-white/80">Coverage</div>
            </div>
            <div className="text-center">
              <Clock size={32} className="mx-auto mb-4" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-white/80">Emergency</div>
            </div>
            <div className="text-center">
              <Phone size={32} className="mx-auto mb-4" />
              <div className="text-2xl font-bold">5 Languages</div>
              <div className="text-white/80">Support</div>
            </div>
            <div className="text-center">
              <Activity size={32} className="mx-auto mb-4" />
              <div className="text-2xl font-bold">ISO Certified</div>
              <div className="text-white/80">Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Your Healthcare?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are already experiencing better healthcare with MediSync
            </p>
            {!isAuthenticated ? (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all"
                onClick={() => setShowAuth(true)}
              >
                Start Your Health Journey <ArrowRight className="ml-3" size={24} />
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-12 py-6 text-xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all"
                onClick={() => setShowHealthID(true)}
              >
                Access Your Dashboard <Heart className="ml-3" size={24} />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuth && (
        <IntegratedAuth onClose={() => setShowAuth(false)} />
      )}

      {/* Health ID Modal */}
      {showHealthID && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <Button
              variant="ghost"
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              onClick={() => setShowHealthID(false)}
            >
              ✕ Close
            </Button>
            <HealthIDCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
