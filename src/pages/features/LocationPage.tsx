import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MapComponent from '@/components/MapComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, Search, Hospital, Ambulance, Users, Clock, Phone, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
  distance?: number;
  phone?: string;
  rating?: number;
  isOpen?: boolean;
  services?: string[];
  emergencyServices?: boolean;
}

const LocationPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeTab, setActiveTab] = useState('nearby');

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied, using default location');
          // Default to Kathmandu coordinates
          setUserLocation({ lat: 27.7172, lng: 85.3240 });
        }
      );
    } else {
      setUserLocation({ lat: 27.7172, lng: 85.3240 });
    }
  }, []);

  useEffect(() => {
    // Generate role-specific locations
    const generateLocations = () => {
      const baseLocations: Location[] = [];
      
      // Common healthcare facilities in Kathmandu
      const healthcareFacilities = [
        {
          id: '1',
          name: 'Bir Hospital',
          type: 'hospital',
          address: 'Mahabauddha, Kathmandu',
          lat: 27.7024,
          lng: 85.3146,
          phone: '01-4221119',
          rating: 4.2,
          isOpen: true,
          services: ['Emergency', 'Surgery', 'ICU', 'Laboratory'],
          emergencyServices: true
        },
        {
          id: '2',
          name: 'Teaching Hospital (TUTH)',
          type: 'hospital',
          address: 'Maharajgunj, Kathmandu',
          lat: 27.7367,
          lng: 85.3356,
          phone: '01-4412303',
          rating: 4.5,
          isOpen: true,
          services: ['Emergency', 'Trauma Center', 'ICU', 'Surgery'],
          emergencyServices: true
        },
        {
          id: '3',
          name: 'Norvic International Hospital',
          type: 'hospital',
          address: 'Thapathali, Kathmandu',
          lat: 27.6918,
          lng: 85.3206,
          phone: '01-4258554',
          rating: 4.7,
          isOpen: true,
          services: ['Emergency', 'Surgery', 'ICU', 'Cardiology'],
          emergencyServices: true
        },
        {
          id: '4',
          name: 'Dhulikhel Hospital',
          type: 'hospital',
          address: 'Dhulikhel, Kavrepalanchok',
          lat: 27.6203,
          lng: 85.5431,
          phone: '011-490497',
          rating: 4.3,
          isOpen: true,
          services: ['Emergency', 'General Medicine', 'Surgery'],
          emergencyServices: true
        },
        {
          id: '5',
          name: 'City Pharmacy',
          type: 'pharmacy',
          address: 'New Road, Kathmandu',
          lat: 27.7024,
          lng: 85.3077,
          phone: '01-4220516',
          rating: 4.0,
          isOpen: true,
          services: ['Prescription Medicines', 'OTC Drugs', 'Medical Supplies']
        },
        {
          id: '6',
          name: 'Metro Pharmacy',
          type: 'pharmacy',
          address: 'Putalisadak, Kathmandu',
          lat: 27.7089,
          lng: 85.3206,
          phone: '01-4442233',
          rating: 4.1,
          isOpen: true,
          services: ['24/7 Service', 'Home Delivery', 'Medical Equipment']
        }
      ];

      // Add role-specific locations
      switch(user?.role) {
        case 'user':
          return healthcareFacilities.concat([
            {
              id: '7',
              name: 'Fitness First Gym',
              type: 'fitness',
              address: 'Durbar Marg, Kathmandu',
              lat: 27.7056,
              lng: 85.3149,
              phone: '01-4221667',
              rating: 4.4,
              isOpen: true,
              services: ['Gym', 'Personal Training', 'Yoga Classes']
            },
            {
              id: '8',
              name: 'Yoga Center',
              type: 'wellness',
              address: 'Thamel, Kathmandu',
              lat: 27.7144,
              lng: 85.3129,
              phone: '01-4701234',
              rating: 4.6,
              isOpen: true,
              services: ['Yoga', 'Meditation', 'Wellness Programs']
            }
          ]);

        case 'ambulance':
          return healthcareFacilities.concat([
            {
              id: '7',
              name: 'Ambulance Station 1',
              type: 'ambulance_station',
              address: 'Ratna Park, Kathmandu',
              lat: 27.7089,
              lng: 85.3149,
              phone: '01-4220911',
              rating: 4.0,
              isOpen: true,
              services: ['Emergency Response', 'Patient Transfer']
            },
            {
              id: '8',
              name: 'Fire Department',
              type: 'emergency',
              address: 'Tripureshwor, Kathmandu',
              lat: 27.6923,
              lng: 85.3149,
              phone: '101',
              rating: 4.2,
              isOpen: true,
              services: ['Fire Response', 'Rescue Operations']
            }
          ]);

        case 'hospital':
          return healthcareFacilities.concat([
            {
              id: '7',
              name: 'Medical Supply Store',
              type: 'supplier',
              address: 'Anamnagar, Kathmandu',
              lat: 27.7244,
              lng: 85.3356,
              phone: '01-4221888',
              rating: 4.2,
              isOpen: true,
              services: ['Medical Equipment', 'Surgical Supplies', 'Hospital Furniture']
            },
            {
              id: '8',
              name: 'Blood Bank',
              type: 'blood_bank',
              address: 'Thapathali, Kathmandu',
              lat: 27.6918,
              lng: 85.3149,
              phone: '01-4260469',
              rating: 4.5,
              isOpen: true,
              services: ['Blood Collection', 'Blood Testing', 'Emergency Supply']
            }
          ]);

        case 'traffic':
          return [
            {
              id: '1',
              name: 'Traffic Control Room',
              type: 'control_center',
              address: 'Singha Durbar, Kathmandu',
              lat: 27.6944,
              lng: 85.3206,
              phone: '01-4211219',
              rating: 4.0,
              isOpen: true,
              services: ['Traffic Monitoring', 'Emergency Coordination']
            },
            {
              id: '2',
              name: 'Ring Road Checkpoint',
              type: 'checkpoint',
              address: 'Ring Road, Kathmandu',
              lat: 27.7356,
              lng: 85.3456,
              phone: '01-4221100',
              rating: 3.8,
              isOpen: true,
              services: ['Traffic Control', 'Emergency Response']
            }
          ].concat(healthcareFacilities);

        case 'nurse':
          return healthcareFacilities.concat([
            {
              id: '7',
              name: 'Nursing School',
              type: 'education',
              address: 'Maharajgunj, Kathmandu',
              lat: 27.7367,
              lng: 85.3300,
              phone: '01-4412200',
              rating: 4.3,
              isOpen: true,
              services: ['Nursing Education', 'Continuing Education', 'Training Programs']
            },
            {
              id: '8',
              name: 'Community Health Center',
              type: 'clinic',
              address: 'Baneshwor, Kathmandu',
              lat: 27.6944,
              lng: 85.3356,
              phone: '01-4478221',
              rating: 4.0,
              isOpen: true,
              services: ['Primary Care', 'Vaccination', 'Health Screening']
            }
          ]);

        default:
          return healthcareFacilities;
      }
    };

    const generatedLocations = generateLocations();
    
    // Calculate distances if user location is available
    if (userLocation) {
      const locationsWithDistance = generatedLocations.map(location => ({
        ...location,
        distance: calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng)
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
      
      setLocations(locationsWithDistance);
    } else {
      setLocations(generatedLocations);
    }
  }, [user?.role, userLocation]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getRoleSpecificTitle = () => {
    switch(user?.role) {
      case 'user': return 'Health Facilities';
      case 'ambulance': return 'Emergency Locations';
      case 'hospital': return 'Facility Network';
      case 'traffic': return 'Traffic Management Points';
      case 'nurse': return 'Care Locations';
      default: return 'Locations';
    }
  };

  const getLocationIcon = (type: string) => {
    switch(type) {
      case 'hospital': return <Hospital className="h-4 w-4 text-red-500" />;
      case 'ambulance_station': return <Ambulance className="h-4 w-4 text-blue-500" />;
      case 'pharmacy': return <MapPin className="h-4 w-4 text-green-500" />;
      case 'emergency': return <MapPin className="h-4 w-4 text-red-500" />;
      default: return <MapPin className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleGetDirections = (location: Location) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
      window.open(url, '_blank');
    } else {
      toast({
        title: "Location Required",
        description: "Please enable location access to get directions",
        variant: "destructive",
      });
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const emergencyLocations = locations.filter(loc => loc.emergencyServices);
  const nearbyLocations = locations.slice(0, 10); // First 10 closest

  return (
    <DashboardLayout
      title={getRoleSpecificTitle()}
      description="Find and navigate to important locations"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-medisync-blue overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={18} />
                  Interactive Map
                </CardTitle>
                {selectedLocation && (
                  <Badge variant="outline">{selectedLocation.name}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96">
                <MapComponent 
                  emergencies={selectedLocation ? [selectedLocation] : locations.slice(0, 5)}
                  destination={selectedLocation ? { 
                    name: selectedLocation.name, 
                    lat: selectedLocation.lat, 
                    lng: selectedLocation.lng 
                  } : undefined}
                />
              </div>
            </CardContent>
          </Card>

          {/* Selected Location Details */}
          {selectedLocation && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getLocationIcon(selectedLocation.type)}
                  {selectedLocation.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{selectedLocation.address}</p>
                  </div>
                  
                  {selectedLocation.distance && (
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p>{selectedLocation.distance.toFixed(1)} km away</p>
                    </div>
                  )}
                  
                  {selectedLocation.services && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Services</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedLocation.services.map(service => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleGetDirections(selectedLocation)}
                      className="flex-1 gap-2"
                    >
                      <Navigation size={14} />
                      Get Directions
                    </Button>
                    {selectedLocation.phone && (
                      <Button 
                        variant="outline"
                        onClick={() => handleCall(selectedLocation.phone!)}
                        className="gap-2"
                      >
                        <Phone size={14} />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Location List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Locations</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b px-3">
                  <TabsList>
                    <TabsTrigger value="nearby">Nearby</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="nearby" className="m-0">
                  <div className="max-h-96 overflow-y-auto">
                    {nearbyLocations.map(location => (
                      <div 
                        key={location.id}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getLocationIcon(location.type)}
                              <h4 className="font-medium text-sm">{location.name}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{location.address}</p>
                            <div className="flex items-center gap-2 text-xs">
                              {location.distance && (
                                <span className="text-blue-600">{location.distance.toFixed(1)} km</span>
                              )}
                              {location.rating && (
                                <div className="flex items-center gap-1">
                                  <Star size={10} className="text-yellow-500 fill-current" />
                                  <span>{location.rating}</span>
                                </div>
                              )}
                              {location.isOpen && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">Open</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="m-0">
                  <div className="max-h-96 overflow-y-auto">
                    {emergencyLocations.map(location => (
                      <div 
                        key={location.id}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getLocationIcon(location.type)}
                              <h4 className="font-medium text-sm">{location.name}</h4>
                              <Badge variant="destructive" className="text-xs">Emergency</Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{location.address}</p>
                            <div className="flex items-center gap-2 text-xs">
                              {location.distance && (
                                <span className="text-blue-600">{location.distance.toFixed(1)} km</span>
                              )}
                              {location.phone && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-6 px-2 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(location.phone!);
                                  }}
                                >
                                  <Phone size={10} className="mr-1" />
                                  Call
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="all" className="m-0">
                  <div className="max-h-96 overflow-y-auto">
                    {filteredLocations.map(location => (
                      <div 
                        key={location.id}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getLocationIcon(location.type)}
                              <h4 className="font-medium text-sm">{location.name}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{location.address}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="outline" className="text-xs">
                                {location.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </Badge>
                              {location.distance && (
                                <span className="text-blue-600">{location.distance.toFixed(1)} km</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  const emergency = emergencyLocations[0];
                  if (emergency) {
                    setSelectedLocation(emergency);
                    handleGetDirections(emergency);
                  }
                }}
              >
                <Navigation size={14} />
                Nearest Emergency
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => handleCall('102')}
              >
                <Phone size={14} />
                Emergency Hotline (102)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  if (userLocation) {
                    navigator.clipboard.writeText(`${userLocation.lat},${userLocation.lng}`);
                    toast({
                      title: "Location Copied",
                      description: "Your coordinates have been copied to clipboard",
                    });
                  }
                }}
              >
                <MapPin size={14} />
                Share My Location
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LocationPage;
