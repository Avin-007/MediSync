
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Search, Star, MapPin, Calendar, Clock, Building, User, Phone, Mail, Filter
} from 'lucide-react';

// Enhanced specialty options with more medical specialties
const specialties = [
  'All Specialties', 
  'Cardiology', 
  'Dermatology', 
  'Endocrinology', 
  'Gastroenterology', 
  'Neurology', 
  'Oncology', 
  'Pediatrics', 
  'Psychiatry', 
  'Orthopedics', 
  'Gynecology',
  'Ophthalmology',
  'ENT',
  'Pulmonology',
  'Nephrology',
  'Urology',
  'Dentistry',
  'General Medicine',
  'General Surgery',
  'Ayurvedic',
  'Traditional Medicine'
];

const insuranceOptions = [
  'All Insurance', 'Aetna', 'Blue Cross', 'Cigna', 'Humana', 'Medicare', 'United Healthcare',
  'Nepal Insurance', 'National Health Insurance', 'Sagarmatha Insurance', 'Himalayan Health'
];

// Nepal-specific doctor data
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiology',
    hospital: 'Kathmandu Medical Center',
    address: '123 Durbar Marg, Kathmandu',
    rating: 4.8,
    reviews: 127,
    availableToday: true,
    insurance: ['Nepal Insurance', 'National Health Insurance'],
    education: 'Tribhuvan University',
    experience: '15+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1'
  },
  {
    id: 2,
    name: 'Dr. Priya Pandey',
    specialty: 'Dermatology',
    hospital: 'Skin Care Center',
    address: '456 New Road, Pokhara',
    rating: 4.5,
    reviews: 98,
    availableToday: false,
    insurance: ['Himalayan Health', 'Sagarmatha Insurance'],
    education: 'Kathmandu University',
    experience: '10+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor2'
  },
  {
    id: 3,
    name: 'Dr. Sunita Gurung',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Hospital Nepal',
    address: '789 Thamel, Kathmandu',
    rating: 4.9,
    reviews: 215,
    availableToday: true,
    insurance: ['Nepal Insurance', 'National Health Insurance', 'Himalayan Health'],
    education: 'B.P. Koirala Institute of Health Sciences',
    experience: '12+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor3'
  },
  {
    id: 4,
    name: 'Dr. Anup Lama',
    specialty: 'Orthopedics',
    hospital: 'Joint & Spine Center',
    address: '321 Lazimpat, Kathmandu',
    rating: 4.7,
    reviews: 156,
    availableToday: true,
    insurance: ['Sagarmatha Insurance', 'National Health Insurance'],
    education: 'AIIMS Delhi',
    experience: '20+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor4'
  },
  {
    id: 5,
    name: 'Dr. Bikram Thapa',
    specialty: 'Neurology',
    hospital: 'Nepal Neurological Center',
    address: '567 Jawalakhel, Lalitpur',
    rating: 4.6,
    reviews: 112,
    availableToday: true,
    insurance: ['Nepal Insurance', 'Himalayan Health'],
    education: 'Manipal College of Medical Sciences',
    experience: '14+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor5'
  },
  {
    id: 6,
    name: 'Dr. Meera Shrestha',
    specialty: 'Gynecology',
    hospital: 'Women\'s Health Center',
    address: '890 Baluwatar, Kathmandu',
    rating: 4.9,
    reviews: 189,
    availableToday: false,
    insurance: ['Nepal Insurance', 'National Health Insurance', 'Sagarmatha Insurance'],
    education: 'Kathmandu Medical College',
    experience: '18+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor6'
  },
  {
    id: 7,
    name: 'Dr. Suman KC',
    specialty: 'ENT',
    hospital: 'Nepal ENT Hospital',
    address: '432 Boudha, Kathmandu',
    rating: 4.4,
    reviews: 87,
    availableToday: true,
    insurance: ['Himalayan Health'],
    education: 'Patan Academy of Health Sciences',
    experience: '8+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor7'
  },
  {
    id: 8,
    name: 'Dr. Rajan Maharjan',
    specialty: 'Ayurvedic',
    hospital: 'Ayurveda Research Center',
    address: '765 Patan, Lalitpur',
    rating: 4.7,
    reviews: 132,
    availableToday: true,
    insurance: ['Nepal Insurance', 'Traditional Medicine Coverage'],
    education: 'Nepal Ayurveda Medical College',
    experience: '25+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor8'
  }
];

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  address: string;
  rating: number;
  reviews: number;
  availableToday: boolean;
  insurance: string[];
  education: string;
  experience: string;
  image: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={`${
            star <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
          } ${star < rating && star + 1 > rating ? 'half-filled' : ''}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const DoctorFinder = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedInsurance, setSelectedInsurance] = useState('All Insurance');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [sortOrder, setSortOrder] = useState<'rating' | 'reviews' | 'name'>('rating');

  // Effect to filter doctors when any filter criteria changes
  useEffect(() => {
    handleSearch();
  }, [selectedSpecialty, selectedInsurance, availableTodayOnly, sortOrder]);

  const handleSearch = () => {
    let filteredDoctors = mockDoctors;
    
    if (searchQuery) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedSpecialty !== 'All Specialties') {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.specialty === selectedSpecialty
      );
    }
    
    if (selectedInsurance !== 'All Insurance') {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.insurance.includes(selectedInsurance)
      );
    }
    
    if (availableTodayOnly) {
      filteredDoctors = filteredDoctors.filter(doctor => doctor.availableToday);
    }

    // Sort the filtered doctors
    switch (sortOrder) {
      case 'rating':
        filteredDoctors.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filteredDoctors.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'name':
        filteredDoctors.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    setDoctors(filteredDoctors);
  };

  const handleSortChange = (order: 'rating' | 'reviews' | 'name') => {
    setSortOrder(order);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('findDoctor')}</CardTitle>
          <CardDescription>{t('searchDoctorDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t('searchByNameSpecialtyHospital')}
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="whitespace-nowrap">
                <Search size={16} className="mr-1" /> {t('search')}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectSpecialty')} />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
                <SelectTrigger>
                  <SelectValue placeholder={t('insurance')} />
                </SelectTrigger>
                <SelectContent>
                  {insuranceOptions.map(insurance => (
                    <SelectItem key={insurance} value={insurance}>{insurance}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center">
                <Button 
                  variant={availableTodayOnly ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => setAvailableTodayOnly(!availableTodayOnly)}
                >
                  <Calendar size={16} className="mr-1" />
                  {availableTodayOnly ? t('availableToday') : t('anyAvailability')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">
                {doctors.length} {doctors.length === 1 ? t('doctorFound') : t('doctorsFound')}
              </h2>
              <div className="relative">
                <Select value={sortOrder} onValueChange={(value) => handleSortChange(value as 'rating' | 'reviews' | 'name')}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center">
                      <Filter size={14} className="mr-2" />
                      {t('sortBy')}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">{t('highestRated')}</SelectItem>
                    <SelectItem value="reviews">{t('mostReviewed')}</SelectItem>
                    <SelectItem value="name">{t('alphabetical')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {doctors.length > 0 ? (
              <div className="space-y-4">
                {doctors.map(doctor => (
                  <Card 
                    key={doctor.id} 
                    className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                      selectedDoctor?.id === doctor.id ? 'border-primary ring-1 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="p-4 sm:p-6 flex-grow">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={doctor.image} alt={doctor.name} />
                              <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h3 className="font-medium text-lg">{doctor.name}</h3>
                              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                              <div className="flex items-center gap-1 text-sm">
                                <Building size={14} className="text-muted-foreground" />
                                <span>{doctor.hospital}</span>
                              </div>
                              <div className="flex gap-2">
                                <StarRating rating={doctor.rating} />
                                <span className="text-sm text-muted-foreground">({doctor.reviews} {t('reviews')})</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-start gap-1 mt-2">
                              <MapPin size={14} className="text-muted-foreground mt-0.5" />
                              <span className="text-sm">{doctor.address}</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-3">
                              {doctor.availableToday && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                                  {t('availableToday')}
                                </Badge>
                              )}
                              {doctor.insurance.slice(0, 2).map(ins => (
                                <Badge key={ins} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                                  {ins}
                                </Badge>
                              ))}
                              {doctor.insurance.length > 2 && (
                                <Badge variant="outline">
                                  +{doctor.insurance.length - 2} {t('more')}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t sm:border-t-0 sm:border-l p-4 sm:w-[180px] flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-stretch gap-2 bg-muted/30">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">{t('nextAvailable')}</p>
                            <Badge variant="outline" className="font-normal bg-white">
                              <Calendar size={12} className="mr-1" /> {doctor.availableToday ? t('today') : t('tomorrow')}
                            </Badge>
                          </div>
                          <Button size="sm" className="w-full bg-nepal-royal-blue hover:bg-nepal-royal-blue/90">
                            {t('bookNow')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Search size={48} className="text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">{t('noDoctorsFound')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('adjustSearchCriteria')}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div>
          {selectedDoctor ? (
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{selectedDoctor.name}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDoctor(null)}>
                    {t('close')}
                  </Button>
                </div>
                <CardDescription>{selectedDoctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="about">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="about">{t('about')}</TabsTrigger>
                    <TabsTrigger value="schedule">{t('schedule')}</TabsTrigger>
                    <TabsTrigger value="reviews">{t('reviews')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">{t('experience')}</h4>
                      <p className="text-sm">{selectedDoctor.experience}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">{t('education')}</h4>
                      <p className="text-sm">{selectedDoctor.education}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">{t('hospital')}</h4>
                      <p className="text-sm">{selectedDoctor.hospital}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">{t('acceptedInsurance')}</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDoctor.insurance.map(ins => (
                          <Badge key={ins} variant="outline" className="bg-blue-50 text-blue-700">
                            {ins}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">{t('contact')}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-muted-foreground" />
                          <span>+977-{Math.floor(1000000 + Math.random() * 9000000)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-muted-foreground" />
                          <span>{selectedDoctor.name.split(' ')[1].toLowerCase()}@medisync.com.np</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={14} className="text-muted-foreground" />
                          <span>{selectedDoctor.address}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-3">{t('availableAppointments')}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedDoctor.availableToday ? 
                            [t('todayTime1'), t('todayTime2'), t('tomorrowTime1'), t('tomorrowTime2')].map((time, idx) => (
                              <Button key={idx} variant="outline" size="sm" className="flex items-center justify-center">
                                <Clock size={12} className="mr-1" />
                                {time}
                              </Button>
                            )) :
                            [t('tomorrowTime1'), t('tomorrowTime2'), t('tomorrowTime3'), t('dayAfterTomorrow')].map((time, idx) => (
                              <Button key={idx} variant="outline" size="sm" className="flex items-center justify-center">
                                <Clock size={12} className="mr-1" />
                                {time}
                              </Button>
                            ))
                          }
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full bg-nepal-royal-blue hover:bg-nepal-royal-blue/90">{t('bookAppointment')}</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold">{selectedDoctor.rating.toFixed(1)}</div>
                        <div>
                          <StarRating rating={selectedDoctor.rating} />
                          <p className="text-xs text-muted-foreground mt-1">
                            {t('basedOn')} {selectedDoctor.reviews} {t('reviews')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">BP</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Binod P.</span>
                            </div>
                            <StarRating rating={5} />
                          </div>
                          <p className="text-sm mt-2">
                            {t('excellentDoctorReview')}
                          </p>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">SK</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Sarita K.</span>
                            </div>
                            <StarRating rating={4} />
                          </div>
                          <p className="text-sm mt-2">
                            {t('professionalDoctorReview')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <User size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">{t('doctorDetails')}</h3>
                <p className="text-sm text-muted-foreground mt-1 text-center">
                  {t('selectDoctorPrompt')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;
