
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Droplet, Phone, Search, Calendar, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const BloodDonation = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Mock data for blood availability
  const bloodTypes = [
    { type: 'A+', available: true, donors: 24 },
    { type: 'A-', available: true, donors: 8 },
    { type: 'B+', available: true, donors: 18 },
    { type: 'B-', available: false, donors: 3 },
    { type: 'AB+', available: true, donors: 12 },
    { type: 'AB-', available: false, donors: 2 },
    { type: 'O+', available: true, donors: 30 },
    { type: 'O-', available: true, donors: 10 },
  ];

  // Mock emergency donors
  const emergencyDonors = [
    { name: 'Aarav Sharma', bloodType: 'O-', distance: '1.2km', phone: '+977 98XXXXXXXX' },
    { name: 'Priya Tamang', bloodType: 'AB+', distance: '3.5km', phone: '+977 98XXXXXXXX' },
    { name: 'Rohan Thapa', bloodType: 'B+', distance: '5.1km', phone: '+977 98XXXXXXXX' },
  ];

  const handleDonateBlood = () => {
    toast({
      title: t('donateBlood'),
      description: language === 'en' 
        ? 'Thank you for your willingness to donate. A schedule request has been sent.'
        : 'रक्तदान गर्न तयार भएकोमा धन्यवाद। अनुरोध पठाइएको छ।',
    });
  };

  const handleContactDonor = (name: string) => {
    toast({
      title: t('contactDonor'),
      description: language === 'en'
        ? `Contacting ${name}. Please wait for confirmation.`
        : `${name} लाई सम्पर्क गरिंदै छ। कृपया पुष्टि को लागि प्रतीक्षा गर्नुहोस्।`,
    });
  };

  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <Card className="border-2 border-nepal-crimson overflow-hidden">
        <CardHeader className="bg-nepal-crimson text-white">
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-5 w-5" />
            {t('bloodDonation')}
          </CardTitle>
          <CardDescription className="text-white/80">
            {language === 'en' 
              ? 'Donate blood or find donors in emergency' 
              : 'रक्तदान गर्नुहोस् वा आपतकालीन स्थितिमा रक्तदाता पत्ता लगाउनुहोस्'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {bloodTypes.map((blood) => (
              <div 
                key={blood.type}
                className={`p-3 rounded-lg flex flex-col items-center justify-center 
                  ${blood.available 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'}`}
              >
                <div className="text-xl font-bold">{blood.type}</div>
                <div className={`text-xs ${blood.available ? 'text-green-600' : 'text-red-600'}`}>
                  {blood.available ? `${blood.donors} ${language === 'en' ? 'donors' : 'दाताहरू'}` : language === 'en' ? 'Needed' : 'आवश्यक'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-nepal-crimson" />
              {language === 'en' ? 'Emergency Donors Nearby' : 'नजिकका आपतकालीन दाताहरू'}
            </h3>
            
            <div className="space-y-2">
              {emergencyDonors.map((donor, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                  <div>
                    <div className="font-medium">{donor.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Droplet className="h-3 w-3" />
                      {donor.bloodType} • {donor.distance}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-nepal-crimson text-nepal-crimson"
                    onClick={() => handleContactDonor(donor.name)}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    {t('contactDonor')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-between">
          <Button 
            variant="outline" 
            className="gap-2 border-nepal-crimson text-nepal-crimson"
            onClick={handleDonateBlood}
          >
            <Calendar className="h-4 w-4" />
            {t('donateBlood')}
          </Button>
          <Button className="gap-2 bg-nepal-crimson hover:bg-nepal-crimson/90">
            <Search className="h-4 w-4" />
            {t('findBlood')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BloodDonation;
