import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, MapPin, Star, Calendar, Filter, MessageSquare, Phone, Video, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyType: string; // Added for filtering
  hospital: string;
  location: string;
  experience: number;
  rating: number;
  reviews: number;
  image?: string;
  available: boolean;
  nextAvailable?: string;
}

const DoctorFinder = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Define specialty types for filtering
  const specialties = [
    { label: language === 'en' ? 'All Specialties' : 'सबै विशेषज्ञता', value: '' },
    { label: language === 'en' ? 'Cardiology' : 'कार्डियोलोजी', value: 'cardiology' },
    { label: language === 'en' ? 'Neurology' : 'न्युरोलोजी', value: 'neurology' },
    { label: language === 'en' ? 'Orthopedics' : 'अर्थोपेडिक्स', value: 'orthopedics' },
    { label: language === 'en' ? 'Pediatrics' : 'पेडियाट्रिक्स', value: 'pediatrics' },
    { label: language === 'en' ? 'Dermatology' : 'डर्माटोलोजी', value: 'dermatology' },
    { label: language === 'en' ? 'Ophthalmology' : 'अफ्थाल्मोलोजी', value: 'ophthalmology' },
    { label: language === 'en' ? 'ENT' : 'ईएनटी', value: 'ent' },
    { label: language === 'en' ? 'Gynecology' : 'गाइनोकोलोजी', value: 'gynecology' },
    { label: language === 'en' ? 'Psychiatry' : 'मनोचिकित्सा', value: 'psychiatry' },
  ];

  const locations = [
    { label: language === 'en' ? 'All Locations' : 'सबै स्थानहरू', value: '' },
    { label: language === 'en' ? 'Kathmandu' : 'काठमाडौँ', value: 'kathmandu' },
    { label: language === 'en' ? 'Lalitpur' : 'ललितपुर', value: 'lalitpur' },
    { label: language === 'en' ? 'Bhaktapur' : 'भक्तपुर', value: 'bhaktapur' },
    { label: language === 'en' ? 'Pokhara' : 'पोखरा', value: 'pokhara' },
    { label: language === 'en' ? 'Biratnagar' : 'विराटनगर', value: 'biratnagar' },
    { label: language === 'en' ? 'Birgunj' : 'वीरगञ्ज', value: 'birgunj' },
  ];

  // Mock doctors data
  const allDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Aarav Sharma',
      specialty: language === 'en' ? 'Cardiologist' : 'हृदय रोग विशेषज्ञ',
      specialtyType: 'cardiology',
      hospital: language === 'en' ? 'Nepal Heart Center' : 'नेपाल हृदय केन्द्र',
      location: 'kathmandu',
      experience: 15,
      rating: 4.8,
      reviews: 124,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1',
      available: true,
    },
    {
      id: '2',
      name: 'Dr. Priya Poudel',
      specialty: language === 'en' ? 'Neurologist' : 'न्युरोलोजिस्ट',
      specialtyType: 'neurology',
      hospital: language === 'en' ? 'Grande International Hospital' : 'ग्र्यान्डे अन्तर्राष्ट्रिय अस्पताल',
      location: 'kathmandu',
      experience: 12,
      rating: 4.6,
      reviews: 98,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor2',
      available: false,
      nextAvailable: language === 'en' ? 'Tomorrow at 10:00 AM' : 'भोलि बिहान १०:०० बजे',
    },
    {
      id: '3',
      name: 'Dr. Rajesh Gurung',
      specialty: language === 'en' ? 'Orthopedic Surgeon' : 'अर्थोपेडिक सर्जन',
      specialtyType: 'orthopedics',
      hospital: language === 'en' ? 'TUTH' : 'टिचिङ्ग अस्पताल',
      location: 'kathmandu',
      experience: 18,
      rating: 4.9,
      reviews: 156,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor3',
      available: true,
    },
    {
      id: '4',
      name: 'Dr. Sita Thapa',
      specialty: language === 'en' ? 'Dermatologist' : 'छाला रोग विशेषज्ञ',
      specialtyType: 'dermatology',
      hospital: language === 'en' ? 'Nepal Mediciti' : 'नेपाल मेडिसिटी',
      location: 'lalitpur',
      experience: 8,
      rating: 4.7,
      reviews: 87,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor4',
      available: true,
    },
    {
      id: '5',
      name: 'Dr. Bikash Rana',
      specialty: language === 'en' ? 'Pediatrician' : 'बाल रोग विशेषज्ञ',
      specialtyType: 'pediatrics',
      hospital: language === 'en' ? 'Kanti Children\'s Hospital' : 'कान्ति बाल अस्पताल',
      location: 'kathmandu',
      experience: 14,
      rating: 4.9,
      reviews: 132,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor5',
      available: true,
    },
    {
      id: '6',
      name: 'Dr. Anita KC',
      specialty: language === 'en' ? 'Ophthalmologist' : 'नेत्र विशेषज्ञ',
      specialtyType: 'ophthalmology',
      hospital: language === 'en' ? 'Tilganga Eye Hospital' : 'तिलगंगा आँखा अस्पताल',
      location: 'kathmandu',
      experience: 11,
      rating: 4.5,
      reviews: 94,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor6',
      available: false,
      nextAvailable: language === 'en' ? 'Friday at 2:00 PM' : 'शुक्रवार दिउँसो २:०० बजे',
    },
    {
      id: '7',
      name: 'Dr. Niraj Bhattarai',
      specialty: language === 'en' ? 'ENT Specialist' : 'ईएनटी विशेषज्ञ',
      specialtyType: 'ent',
      hospital: language === 'en' ? 'Star Hospital' : 'स्टार अस्पताल',
      location: 'lalitpur',
      experience: 9,
      rating: 4.4,
      reviews: 78,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor7',
      available: true,
    },
    {
      id: '8',
      name: 'Dr. Sarita Giri',
      specialty: language === 'en' ? 'Gynecologist' : 'स्त्री रोग विशेषज्ञ',
      specialtyType: 'gynecology',
      hospital: language === 'en' ? 'Paropakar Maternity Hospital' : 'परोपकार प्रसूति अस्पताल',
      location: 'kathmandu',
      experience: 16,
      rating: 4.8,
      reviews: 145,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor8',
      available: true,
    },
    {
      id: '9',
      name: 'Dr. Ram Basnet',
      specialty: language === 'en' ? 'Psychiatrist' : 'मानसिक रोग विशेषज्ञ',
      specialtyType: 'psychiatry',
      hospital: language === 'en' ? 'Mental Health Nepal' : 'मानसिक स्वास्थ्य नेपाल',
      location: 'bhaktapur',
      experience: 13,
      rating: 4.7,
      reviews: 89,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor9',
      available: false,
      nextAvailable: language === 'en' ? 'Monday at 11:00 AM' : 'सोमबार बिहान ११:०० बजे',
    },
    {
      id: '10',
      name: 'Dr. Lakshmi Pradhan',
      specialty: language === 'en' ? 'Cardiologist' : 'हृदय रोग विशेषज्ञ',
      specialtyType: 'cardiology',
      hospital: language === 'en' ? 'Norvic Hospital' : 'नर्भिक अस्पताल',
      location: 'kathmandu',
      experience: 20,
      rating: 4.9,
      reviews: 178,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor10',
      available: true,
    }
  ];

  // Filter doctors based on search term, specialty and location
  const filteredDoctors = useMemo(() => {
    return allDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty ? doctor.specialtyType === selectedSpecialty : true;
      const matchesLocation = selectedLocation ? doctor.location === selectedLocation : true;
      
      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [allDoctors, searchTerm, selectedSpecialty, selectedLocation]);

  const handleBookAppointment = (doctorId: string) => {
    const doctor = allDoctors.find(d => d.id === doctorId);
    
    toast({
      title: language === 'en' ? 'Appointment Request Sent' : 'भेटघाट अनुरोध पठाइयो',
      description: language === 'en' 
        ? `Your appointment request with ${doctor?.name} has been submitted.` 
        : `${doctor?.name} सँगको भेटघाटको अनुरोध पेश गरिएको छ।`,
    });
  };

  const handleContactDoctor = (doctorId: string, method: 'chat' | 'call' | 'video') => {
    const doctor = allDoctors.find(d => d.id === doctorId);
    
    const methodText = method === 'chat' 
      ? (language === 'en' ? 'chat with' : 'कुराकानी') 
      : method === 'call'
        ? (language === 'en' ? 'call with' : 'कल')
        : (language === 'en' ? 'video call with' : 'भिडियो कल');
    
    toast({
      title: language === 'en' ? `Starting ${methodText} ${doctor?.name}` : `${doctor?.name} सँग ${methodText} सुरु गर्दै`,
      description: language === 'en' 
        ? 'Please wait while we connect you...' 
        : 'हामी तपाईंलाई जोड्दै गर्दा कृपया प्रतीक्षा गर्नुहोस्...',
    });
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
          } ${
            i === Math.floor(rating) && rating % 1 > 0
              ? 'fill-yellow-400 text-yellow-400'
              : i < Math.floor(rating)
              ? 'fill-yellow-400'
              : ''
          }`}
        />
      ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('findDoctors')}</CardTitle>
          <CardDescription>{t('findDoctorsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder={t('searchDoctors')}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  {t('filters')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{t('specialty')}</h4>
                    <Select
                      value={selectedSpecialty}
                      onValueChange={setSelectedSpecialty}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={language === 'en' ? "All Specialties" : "सबै विशेषज्ञता"} />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.value} value={specialty.value}>
                            {specialty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{t('location')}</h4>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={language === 'en' ? "All Locations" : "सबै स्थानहरू"} />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedSpecialty('');
                        setSelectedLocation('');
                      }}
                    >
                      {t('reset')}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      {t('apply')}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            {selectedSpecialty && (
              <Badge variant="secondary" className="gap-1">
                {specialties.find(s => s.value === selectedSpecialty)?.label}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedSpecialty('')}
                >
                  <X size={10} />
                </Button>
              </Badge>
            )}
            {selectedLocation && (
              <Badge variant="secondary" className="gap-1">
                {locations.find(l => l.value === selectedLocation)?.label}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedLocation('')}
                >
                  <X size={10} />
                </Button>
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4 pr-4">
          {filteredDoctors.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="text-center">
                  <p className="text-lg font-medium">{t('noResults')}</p>
                  <p className="text-gray-500 mt-1">{t('tryDifferentSearch')}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/4 p-6 flex flex-col items-center justify-center bg-gray-50">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-bold">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-1">
                          <div className="flex mr-1">{renderStars(doctor.rating)}</div>
                          <span className="text-sm">{doctor.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({doctor.reviews} {t('reviews')})</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={14} className="mr-1" />
                          <span>{doctor.hospital}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge variant={doctor.available ? "default" : "outline"}>
                          {doctor.available ? t('availableNow') : t('unavailable')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">{t('experience')}</p>
                        <p className="font-medium">{doctor.experience} {t('years')}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">{t('nextAvailable')}</p>
                        <p className="font-medium">{doctor.available ? t('today') : doctor.nextAvailable}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Calendar size={14} />
                            {t('bookAppointment')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t('bookAppointmentWith')} {doctor.name}</DialogTitle>
                            <DialogDescription>
                              {doctor.specialty} {t('at')} {doctor.hospital}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium mb-1">{t('date')}</p>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('selectDate')} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="today">{t('today')}</SelectItem>
                                    <SelectItem value="tomorrow">{t('tomorrow')}</SelectItem>
                                    <SelectItem value="nextweek">{t('nextWeek')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">{t('time')}</p>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('selectTime')} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="morning">{t('morning')}</SelectItem>
                                    <SelectItem value="afternoon">{t('afternoon')}</SelectItem>
                                    <SelectItem value="evening">{t('evening')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">{t('reason')}</p>
                              <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder={t('brieflyDescribeReason')}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => handleBookAppointment(doctor.id)}>
                              {t('confirmAppointment')}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => handleContactDoctor(doctor.id, 'chat')}
                      >
                        <MessageSquare size={14} />
                        {t('message')}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleContactDoctor(doctor.id, 'call')}
                      >
                        <Phone size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleContactDoctor(doctor.id, 'video')}
                      >
                        <Video size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DoctorFinder;
