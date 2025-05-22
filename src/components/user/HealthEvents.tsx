
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, MapPin, Users, HeartPulse, Clock, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Event {
  id: string;
  title: string;
  category: 'checkup' | 'donation' | 'campaign' | 'discount' | 'workshop';
  date: string;
  location: string;
  description: string;
  organizer: string;
  image?: string;
}

const HealthEvents: React.FC = () => {
  const { t } = useLanguage();
  
  // Mock health events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Free Health Checkup Camp',
      category: 'checkup',
      date: '2025-06-05',
      location: 'Patan Hospital, Lalitpur',
      description: 'Free health checkup including blood pressure, blood sugar, BMI, and basic physical examination.',
      organizer: 'Nepal Medical Association',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      title: 'Blood Donation Drive',
      category: 'donation',
      date: '2025-05-30',
      location: 'Bir Hospital, Kathmandu',
      description: 'Donate blood and help save lives. All blood types needed, especially O negative.',
      organizer: 'Nepal Red Cross Society',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      title: 'Diabetes Prevention Workshop',
      category: 'workshop',
      date: '2025-06-12',
      location: 'TUTH, Kathmandu',
      description: 'Learn about preventing diabetes through diet, exercise, and lifestyle changes.',
      organizer: 'National Diabetes Association',
      image: 'https://images.unsplash.com/photo-1573496546038-82f9c39f6365?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '4',
      title: '50% Off on Health Screenings',
      category: 'discount',
      date: '2025-05-25 to 2025-06-10',
      location: 'Mediciti Hospital, Kathmandu',
      description: 'Get 50% off on comprehensive health screenings including cardiac, diabetes, and cancer screenings.',
      organizer: 'Mediciti Hospital',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'checkup':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Free Checkup</Badge>;
      case 'donation':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Blood Donation</Badge>;
      case 'campaign':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Campaign</Badge>;
      case 'discount':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Discount</Badge>;
      case 'workshop':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Workshop</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString.includes('to')) {
      return dateString; // It's already a date range
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-nepal-royal-blue" />
          {t('healthEvents')}
        </CardTitle>
        <CardDescription>{t('upcomingHealthEventsAndDiscounts')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0">
            {event.image && (
              <div className="md:w-1/3">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
            <div className={event.image ? "md:w-2/3" : "w-full"}>
              <div className="flex items-center justify-between mb-2">
                <div className="space-x-2">
                  {getCategoryBadge(event.category)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  <span>{formatDate(event.date)}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
                <MapPin size={14} className="mr-1" />
                {event.location}
              </div>
              <p className="text-gray-600 mb-3">
                {event.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users size={14} className="mr-1" />
                  {event.organizer}
                </div>
                <div className="space-x-2">
                  {event.category === 'discount' ? (
                    <Button size="sm" className="gap-1">
                      <ShoppingCart size={14} />
                      {t('bookNow')}
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="gap-1">
                      <CalendarCheck size={14} />
                      {t('register')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="ghost">{t('viewAllEvents')}</Button>
      </CardFooter>
    </Card>
  );
};

export default HealthEvents;
