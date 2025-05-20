
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cloud, Thermometer, Wind, CloudRain, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WeatherHealthAlerts = () => {
  const { t, language } = useLanguage();

  // Mock data - in a real app, these would come from an API
  const weatherData = {
    temperature: '25°C',
    condition: language === 'en' ? 'Partly Cloudy' : 'आंशिक रूपमा बादल',
    airQuality: {
      index: 78,
      status: language === 'en' ? 'Moderate' : 'मध्यम',
    },
    alerts: [
      {
        type: 'flu',
        risk: language === 'en' ? 'Moderate' : 'मध्यम',
        advice: language === 'en' 
          ? 'Seasonal flu is active in Kathmandu Valley' 
          : 'काठमाडौं उपत्यकामा मौसमी फ्लू सक्रिय छ',
      },
      {
        type: 'viral',
        risk: language === 'en' ? 'High' : 'उच्च',
        advice: language === 'en' 
          ? 'COVID-19 cases increasing in urban areas'
          : 'शहरी क्षेत्रहरूमा कोभिड-१९ का केसहरू बढ्दै छन्',
      },
      {
        type: 'air',
        risk: language === 'en' ? 'High' : 'उच्च',
        advice: language === 'en'
          ? 'Poor air quality in Kathmandu today'
          : 'आज काठमाडौंमा हावाको खराब गुणस्तर',
      }
    ]
  };

  const getAirQualityColor = (index: number) => {
    if (index <= 50) return 'bg-green-100 text-green-800';
    if (index <= 100) return 'bg-yellow-100 text-yellow-800';
    if (index <= 150) return 'bg-orange-100 text-orange-800';
    if (index <= 200) return 'bg-red-100 text-red-800';
    return 'bg-purple-100 text-purple-800';
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'Low' || risk === 'कम') return 'bg-green-100 text-green-800';
    if (risk === 'Moderate' || risk === 'मध्यम') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="border-nepal-blue shadow-md">
      <CardHeader className="bg-nepal-blue/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-nepal-blue">
            {t('weather')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Cloud className="text-nepal-blue" />
            <span className="font-medium">{weatherData.temperature}</span>
          </div>
        </div>
        <CardDescription>
          {weatherData.condition}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-2">
            <Wind className="text-gray-600" />
            <span>{t('airQuality')}</span>
          </div>
          <Badge className={getAirQualityColor(weatherData.airQuality.index)}>
            {weatherData.airQuality.index} - {weatherData.airQuality.status}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-nepal-crimson" />
            {t('viralHazard')}
          </h3>
          
          {weatherData.alerts.map((alert, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between mb-1">
                <span className="font-medium">
                  {alert.type === 'flu' ? t('fluAlert') : 
                   alert.type === 'viral' ? t('viralHazard') : 
                   t('airQuality')}
                </span>
                <Badge className={getRiskColor(alert.risk)}>
                  {alert.risk}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{alert.advice}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between">
        <Button variant="outline" className="text-nepal-blue border-nepal-blue">
          {t('precautions')}
        </Button>
        <Button className="bg-nepal-blue hover:bg-nepal-blue/90">
          {t('viewBalance')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WeatherHealthAlerts;
