
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

export const PartnersSection = () => {
  const { t } = useLanguage();
  
  // In a real project, these would be actual hospital/partner logos
  const partners = [
    { id: 1, name: "Bir Hospital", logo: "BH" },
    { id: 2, name: "Tribhuvan University Teaching Hospital", logo: "TUTH" },
    { id: 3, name: "Patan Hospital", logo: "PH" },
    { id: 4, name: "Nepal Medical College", logo: "NMC" },
    { id: 5, name: "B&B Hospital", logo: "B&B" },
    { id: 6, name: "Grande International Hospital", logo: "GIH" },
    { id: 7, name: "Civil Service Hospital", logo: "CSH" },
    { id: 8, name: "Kathmandu Medical College", logo: "KMC" },
  ];
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <Badge className="mb-4 bg-medisync-orange/10 text-medisync-dark-orange border-medisync-orange hover:bg-medisync-orange/20">
            {t('trustedBy')}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-medisync-black">
            {t('ourPartners')}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 animate-on-scroll">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white p-6 h-24 flex items-center justify-center rounded-lg border border-gray-200 hover:border-medisync-orange hover:shadow-md transition-all"
            >
              <div className="text-xl font-bold text-medisync-dark-gray">{partner.logo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
