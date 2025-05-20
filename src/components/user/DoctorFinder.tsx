
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Search, Star, MapPin, Calendar, Clock, Building, User, Phone, Mail, Filter
} from 'lucide-react';

const specialties = [
  'All Specialties', 'Cardiology', 'Dermatology', 'Endocrinology', 
  'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics', 
  'Psychiatry', 'Orthopedics', 'Gynecology'
];

const insuranceOptions = [
  'All Insurance', 'Aetna', 'Blue Cross', 'Cigna', 'Humana', 'Medicare', 'United Healthcare'
];

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    hospital: 'Central Medical Center',
    address: '123 Healthcare Ave, Medical City',
    rating: 4.8,
    reviews: 127,
    availableToday: true,
    insurance: ['Aetna', 'Blue Cross', 'Medicare'],
    education: 'Harvard Medical School',
    experience: '15+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1'
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    hospital: 'Westside Skin Clinic',
    address: '456 Dermatology Blvd, Skincare City',
    rating: 4.5,
    reviews: 98,
    availableToday: false,
    insurance: ['Cigna', 'United Healthcare'],
    education: 'Johns Hopkins University',
    experience: '10+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor2'
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Medical Hospital',
    address: '789 Kids Health Lane, Childcare Town',
    rating: 4.9,
    reviews: 215,
    availableToday: true,
    insurance: ['Aetna', 'Blue Cross', 'Humana', 'United Healthcare'],
    education: 'Stanford University',
    experience: '12+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor3'
  },
  {
    id: 4,
    name: 'Dr. Robert Miller',
    specialty: 'Orthopedics',
    hospital: 'Joint & Spine Center',
    address: '321 Bone Street, Orthopedic Park',
    rating: 4.7,
    reviews: 156,
    availableToday: true,
    insurance: ['Medicare', 'Blue Cross'],
    education: 'Yale School of Medicine',
    experience: '20+ years',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor4'
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedInsurance, setSelectedInsurance] = useState('All Insurance');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

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
    
    setDoctors(filteredDoctors);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find a Doctor</CardTitle>
          <CardDescription>Search for doctors by name, specialty, or location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, specialty, or hospital"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch} className="whitespace-nowrap">
                <Search size={16} className="mr-1" /> Search
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
                <SelectTrigger>
                  <SelectValue placeholder="Insurance" />
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
                  {availableTodayOnly ? "Available Today" : "Any Availability"}
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
                {doctors.length} {doctors.length === 1 ? 'Doctor' : 'Doctors'} Found
              </h2>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={14} />
                Sort By
              </Button>
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
                                <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
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
                                  Available Today
                                </Badge>
                              )}
                              {doctor.insurance.slice(0, 2).map(ins => (
                                <Badge key={ins} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                                  {ins}
                                </Badge>
                              ))}
                              {doctor.insurance.length > 2 && (
                                <Badge variant="outline">
                                  +{doctor.insurance.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t sm:border-t-0 sm:border-l p-4 sm:w-[180px] flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-stretch gap-2 bg-muted/30">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">Next Available</p>
                            <Badge variant="outline" className="font-normal bg-white">
                              <Calendar size={12} className="mr-1" /> Today, 3:30 PM
                            </Badge>
                          </div>
                          <Button size="sm" className="w-full">
                            Book Now
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
                  <h3 className="text-lg font-medium">No doctors found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search criteria
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
                    Close
                  </Button>
                </div>
                <CardDescription>{selectedDoctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="about">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Experience</h4>
                      <p className="text-sm">{selectedDoctor.experience}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Education</h4>
                      <p className="text-sm">{selectedDoctor.education}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Hospital</h4>
                      <p className="text-sm">{selectedDoctor.hospital}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Accepted Insurance</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDoctor.insurance.map(ins => (
                          <Badge key={ins} variant="outline" className="bg-blue-50 text-blue-700">
                            {ins}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Contact</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-muted-foreground" />
                          <span>(555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-muted-foreground" />
                          <span>{selectedDoctor.name.split(' ')[1].toLowerCase()}@medisync.com</span>
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
                        <h4 className="text-sm font-medium mb-3">Available Appointments</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {["Today, 3:30 PM", "Today, 4:45 PM", "Tomorrow, 10:15 AM", "Tomorrow, 2:00 PM"].map((time, idx) => (
                            <Button key={idx} variant="outline" size="sm" className="flex items-center justify-center">
                              <Clock size={12} className="mr-1" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full">Book Appointment</Button>
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
                            Based on {selectedDoctor.reviews} reviews
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">JD</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Jane D.</span>
                            </div>
                            <StarRating rating={5} />
                          </div>
                          <p className="text-sm mt-2">
                            Excellent doctor! Very thorough and takes time to explain everything.
                          </p>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">MS</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">Mark S.</span>
                            </div>
                            <StarRating rating={4} />
                          </div>
                          <p className="text-sm mt-2">
                            Professional and knowledgeable. Wait time was a bit long though.
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
                <h3 className="text-lg font-medium">Doctor Details</h3>
                <p className="text-sm text-muted-foreground mt-1 text-center">
                  Select a doctor to view detailed information
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
