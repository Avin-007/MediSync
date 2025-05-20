
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, Video, Mail, Map, HeartPulse } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FamilyRecords = () => {
  const { t, language } = useLanguage();

  // Mock data for family members
  const familyMembers = [
    { 
      name: 'Aama Gurung', 
      relation: language === 'en' ? 'Mother' : 'आमा',
      age: 58, 
      lastCheckup: '2023-12-15',
      condition: language === 'en' ? 'Hypertension' : 'उच्च रक्तचाप'
    },
    { 
      name: 'Buwa Gurung', 
      relation: language === 'en' ? 'Father' : 'बुबा',
      age: 62, 
      lastCheckup: '2023-11-10',
      condition: language === 'en' ? 'Diabetes Type 2' : 'मधुमेह टाइप २'
    },
    { 
      name: 'Kanchi Gurung', 
      relation: language === 'en' ? 'Sister' : 'बहिनी',
      age: 32, 
      lastCheckup: '2024-02-05',
      condition: language === 'en' ? 'Healthy' : 'स्वस्थ'
    }
  ];

  return (
    <Card className="border-2 border-nepal-royal-blue overflow-hidden">
      <CardHeader className="bg-nepal-royal-blue/10">
        <CardTitle className="flex items-center gap-2 text-nepal-royal-blue">
          <Users className="h-5 w-5" />
          {t('familyRecords')}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Access and manage your family\'s health records from abroad' 
            : 'विदेशबाट आफ्नो परिवारको स्वास्थ्य रेकर्डहरू पहुँच र व्यवस्थापन गर्नुहोस्'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {familyMembers.map((member, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <div className="text-sm text-gray-500">{member.relation} • {member.age} {language === 'en' ? 'years' : 'वर्ष'}</div>
                </div>
                <Badge className={
                  member.condition === 'Healthy' || member.condition === 'स्वस्थ'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }>
                  {member.condition}
                </Badge>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <div className="text-sm">
                  <span className="text-gray-500">{language === 'en' ? 'Last checkup:' : 'पछिल्लो जाँच:'}</span> 
                  <span className="font-medium ml-1">{new Date(member.lastCheckup).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <FileText className="h-3 w-3" />
                    {language === 'en' ? 'Medical Records' : 'चिकित्सा रेकर्ड'}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <HeartPulse className="h-3 w-3" />
                    {language === 'en' ? 'Vital History' : 'महत्त्वपूर्ण इतिहास'}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <Video className="h-3 w-3" />
                    {language === 'en' ? 'Video Call' : 'भिडियो कल'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between">
        <Button variant="outline" className="gap-2">
          <Mail className="h-4 w-4" />
          {language === 'en' ? 'Send Health Report' : 'स्वास्थ्य रिपोर्ट पठाउनुहोस्'}
        </Button>
        <Button className="gap-2 bg-nepal-royal-blue hover:bg-nepal-royal-blue/90">
          <Map className="h-4 w-4" />
          {language === 'en' ? 'Find Local Hospital' : 'स्थानीय अस्पताल खोज्नुहोस्'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FamilyRecords;
