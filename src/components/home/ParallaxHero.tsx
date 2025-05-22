
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const ParallaxHero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!parallaxContainerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const layers = parallaxContainerRef.current.querySelectorAll('.parallax-layer');
      
      layers.forEach((layer: Element) => {
        const speed = (layer as HTMLElement).dataset.speed || '1';
        const yPos = -(scrollPosition * parseFloat(speed));
        (layer as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);
  
  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="relative overflow-hidden h-screen min-h-[600px] max-h-[900px]" ref={parallaxContainerRef}>
      {/* Background layer */}
      <div 
        className="absolute inset-0 parallax-layer" 
        data-speed="0.1"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: -10,
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-medisync-orange/30 blur-3xl parallax-layer"
          data-speed="0.3"
        />
        <div 
          className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-medisync-orange/20 blur-3xl parallax-layer"
          data-speed="0.5"
        />
      </div>
      
      {/* Content layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-8 animate-slide-down parallax-layer" data-speed="0.2">
              <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                <span className="text-white font-medium flex items-center">
                  <CheckCircle size={16} className="text-medisync-orange mr-2" />
                  {t('nepalMinistryOfHealthApproved')}
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-slide-up parallax-layer" data-speed="0.1">
              <span className="text-medisync-orange">मेडि</span>
              <span className="text-white">सिंक</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto animate-slide-up parallax-layer" data-speed="0.15">
              {t('comprehensiveHealthSolution')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up parallax-layer" data-speed="0.2">
              <Button 
                size="lg" 
                className="btn-touch bg-medisync-orange hover:bg-medisync-dark-orange text-white text-lg px-8 py-6 btn-hover-effect"
                onClick={handleGetStarted}
              >
                {t('getStarted')} <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-touch border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                {t('learnMore')}
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 parallax-layer" data-speed="0.25">
              <FeatureBadge text={t('aiPowered')} />
              <FeatureBadge text={t('realTimeTracking')} />
              <FeatureBadge text={t('emergencyResponse')} />
              <FeatureBadge text={t('uniqueHealthID')} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-medisync-white to-transparent"
      ></div>
    </div>
  );
};

const FeatureBadge = ({ text }: { text: string }) => (
  <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
    <p className="text-white text-sm font-medium">{text}</p>
  </div>
);
