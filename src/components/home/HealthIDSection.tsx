
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';

export const HealthIDSection = () => {
  const { t } = useLanguage();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="orangeGradient" cx="20%" cy="20%" r="80%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 126, 29, 0.1)" />
                <stop offset="100%" stopColor="rgba(255, 126, 29, 0)" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#orangeGradient)" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`transform transition-all duration-1000 ease-out ${
              isInView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <Badge className="mb-4 bg-medisync-orange/10 text-medisync-dark-orange border-medisync-orange hover:bg-medisync-orange/20">
              {t('uniqueHealthID')}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-medisync-black">
              {t('secureDigitalIdentity')}
            </h2>
            <p className="text-lg mb-8 text-medisync-dark-gray">
              {t('healthIDDescription')}
            </p>
            
            <div className="space-y-4 mb-8">
              <BenefitItem text={t('healthIDBenefit1')} />
              <BenefitItem text={t('healthIDBenefit2')} />
              <BenefitItem text={t('healthIDBenefit3')} />
              <BenefitItem text={t('healthIDBenefit4')} />
            </div>
            
            <Button 
              className="btn-touch bg-medisync-orange hover:bg-medisync-dark-orange text-white px-8 py-6 text-lg btn-hover-effect"
            >
              {t('getYourHealthID')} <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
          
          <div 
            className={`transform transition-all duration-1000 ease-out ${
              isInView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-medisync-orange/10 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-medisync-orange/20"></div>
              
              {/* Health ID Card */}
              <Card className="bg-gradient-to-br from-medisync-white to-medisync-light-gray p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-medisync-orange/20 relative z-10 rotate-3 transform transition-transform hover:rotate-0 hover:scale-105 duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-medisync-orange/10 p-3 rounded-full">
                    <Shield size={32} className="text-medisync-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-medisync-black">
                    {t('nepalHealthID')}
                  </h3>
                </div>
                
                <div className="bg-medisync-orange/5 p-4 rounded-xl mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-medisync-dark-gray mb-1">{t('idHolder')}</p>
                      <p className="font-semibold text-medisync-black">SHARMA ANITA</p>
                    </div>
                    <div>
                      <p className="text-xs text-medisync-dark-gray mb-1">{t('dateOfBirth')}</p>
                      <p className="font-semibold text-medisync-black">15 APR 1985</p>
                    </div>
                    <div>
                      <p className="text-xs text-medisync-dark-gray mb-1">{t('bloodGroup')}</p>
                      <p className="font-semibold text-medisync-black">O+</p>
                    </div>
                    <div>
                      <p className="text-xs text-medisync-dark-gray mb-1">{t('idNumber')}</p>
                      <p className="font-semibold text-medisync-black">NP12345678</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-medisync-orange/10 rounded-xl">
                  <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-2xs text-gray-600">QR CODE</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-medisync-black">{t('scanToVerify')}</p>
                    <p className="text-xs text-medisync-dark-gray">{t('scanDescription')}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-medisync-dark-gray">{t('issuedBy')}: {t('ministryOfHealth')}</p>
                  <div className="bg-medisync-orange/10 px-3 py-1 rounded-full">
                    <p className="text-xs font-medium text-medisync-dark-orange">{t('validated')}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 bg-medisync-orange/10 p-1 rounded-full flex-shrink-0">
        <CheckCircle size={16} className="text-medisync-orange" />
      </div>
      <p className="text-medisync-dark-gray">{text}</p>
    </div>
  );
};
