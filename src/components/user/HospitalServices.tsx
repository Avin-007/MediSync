
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Bed, 
  Heart, 
  Stethoscope, 
  User, 
  Calendar, 
  Clock, 
  MapPin,
  Phone,
  Star,
  wheelchair,
  Wind,
  Droplet
} from 'lucide-react';

const HospitalServices = () => {
  const { toast } = useToast();
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const hospitals = [
    {
      id: 1,
      name: "Bir Hospital",
      location: "Mahaboudha, Kathmandu",
      rating: 4.5,
      phone: "+977-1-4221119",
      departments: ["Cardiology", "Neurology", "Emergency", "ICU"],
      bedAvailability: {
        general: 15,
        icu: 3,
        emergency: 8
      },
      facilities: ["Oxygen", "Ventilator", "Wheelchair", "Ambulance"]
    },
    {
      id: 2,
      name: "Tribhuvan University Teaching Hospital",
      location: "Maharajgunj, Kathmandu",
      rating: 4.8,
      phone: "+977-1-4412303",
      departments: ["Surgery", "Pediatrics", "Gynecology", "Oncology"],
      bedAvailability: {
        general: 22,
        icu: 5,
        emergency: 12
      },
      facilities: ["Oxygen", "Ventilator", "Wheelchair", "MRI", "CT Scan"]
    }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Ram Sharma",
      specialization: "Cardiologist",
      hospital: "Bir Hospital",
      ward: "Cardiology Ward - Room 201",
      schedule: "Mon-Fri: 9:00 AM - 5:00 PM",
      rating: 4.7,
      experience: "15 years",
      fee: 1500
    },
    {
      id: 2,
      name: "Dr. Sita Poudel",
      specialization: "Neurologist",
      hospital: "TUTH",
      ward: "Neurology Ward - Room 305",
      schedule: "Tue, Thu, Sat: 10:00 AM - 4:00 PM",
      rating: 4.9,
      experience: "12 years",
      fee: 2000
    },
    {
      id: 3,
      name: "Dr. Krishna Adhikari",
      specialization: "Emergency Medicine",
      hospital: "Bir Hospital",
      ward: "Emergency Department",
      schedule: "24/7 On-Call",
      rating: 4.6,
      experience: "10 years",
      fee: 1200
    }
  ];

  const medicalEquipment = [
    {
      id: 1,
      name: "Oxygen Cylinder",
      availability: 25,
      price: 500,
      duration: "Per day",
      description: "Medical grade oxygen for respiratory support"
    },
    {
      id: 2,
      name: "Ventilator",
      availability: 8,
      price: 2500,
      duration: "Per day",
      description: "Advanced mechanical ventilation support"
    },
    {
      id: 3,
      name: "Wheelchair",
      availability: 15,
      price: 200,
      duration: "Per day",
      description: "Standard hospital wheelchair for mobility assistance"
    },
    {
      id: 4,
      name: "Hospital Bed",
      availability: 12,
      price: 800,
      duration: "Per day",
      description: "Adjustable hospital bed with mattress"
    }
  ];

  const assistanceServices = [
    {
      id: 1,
      name: "Wheelchair Assistance",
      description: "Professional assistance for wheelchair mobility",
      price: 300,
      duration: "Per hour"
    },
    {
      id: 2,
      name: "Nursing Care",
      description: "Qualified nursing care at home",
      price: 800,
      duration: "Per hour"
    },
    {
      id: 3,
      name: "Physiotherapy",
      description: "Professional physiotherapy sessions",
      price: 1200,
      duration: "Per session"
    },
    {
      id: 4,
      name: "Medical Escort",
      description: "Medical professional escort for hospital visits",
      price: 1500,
      duration: "Per visit"
    }
  ];

  const handleBookBed = (hospitalId: number, bedType: string) => {
    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date for bed booking",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bed Booking Request Sent",
      description: `Your ${bedType} bed booking request has been sent to the hospital. You will receive confirmation shortly.`,
    });
  };

  const handleEquipmentRequest = (equipmentId: number) => {
    toast({
      title: "Equipment Request Submitted",
      description: "Your medical equipment request has been submitted. Our team will contact you for delivery details.",
    });
  };

  const handleAssistanceRequest = (serviceId: number) => {
    toast({
      title: "Assistance Request Sent",
      description: "Your assistance request has been submitted. A qualified professional will contact you shortly.",
    });
  };

  const handleDoctorAppointment = (doctorId: number) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for the appointment",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: `Your appointment has been booked for ${selectedDate} at ${selectedTime}. You will receive a confirmation SMS.`,
    });
  };

  return (
    <Tabs defaultValue="hospitals" className="space-y-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
        <TabsTrigger value="doctors">Doctors</TabsTrigger>
        <TabsTrigger value="beds">Book Beds</TabsTrigger>
        <TabsTrigger value="equipment">Equipment</TabsTrigger>
        <TabsTrigger value="assistance">Assistance</TabsTrigger>
      </TabsList>

      {/* Hospitals Tab */}
      <TabsContent value="hospitals">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospitals.map((hospital) => (
            <Card key={hospital.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} />
                      {hospital.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{hospital.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm">{hospital.phone}</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Departments</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.departments.map((dept, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Bed Availability</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{hospital.bedAvailability.general}</div>
                      <div className="text-xs">General</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="font-bold text-red-600">{hospital.bedAvailability.icu}</div>
                      <div className="text-xs">ICU</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600">{hospital.bedAvailability.emergency}</div>
                      <div className="text-xs">Emergency</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Doctors Tab */}
      <TabsContent value="doctors">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="appointment-date">Appointment Date</Label>
              <Input
                id="appointment-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="appointment-time">Appointment Time</Label>
              <Input
                id="appointment-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-sm text-blue-600">{doctor.specialization}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm">{doctor.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">{doctor.hospital}</p>
                    <p className="text-gray-500">{doctor.ward}</p>
                  </div>
                  
                  <div className="text-sm">
                    <p className="flex items-center gap-2">
                      <Clock size={14} />
                      {doctor.schedule}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{doctor.experience} experience</span>
                    <span className="font-bold text-green-600">₹{doctor.fee}</span>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleDoctorAppointment(doctor.id)}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Bed Booking Tab */}
      <TabsContent value="beds">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bed-date">Check-in Date</Label>
              <Input
                id="bed-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="hospital-select">Select Hospital</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                <option value="">Choose Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hospitals.map((hospital) => (
              <Card key={hospital.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{hospital.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">General Ward</h4>
                        <p className="text-sm text-gray-500">{hospital.bedAvailability.general} beds available</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleBookBed(hospital.id, 'general')}
                        disabled={hospital.bedAvailability.general === 0}
                      >
                        Book
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">ICU</h4>
                        <p className="text-sm text-gray-500">{hospital.bedAvailability.icu} beds available</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleBookBed(hospital.id, 'ICU')}
                        disabled={hospital.bedAvailability.icu === 0}
                      >
                        Book
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">Emergency</h4>
                        <p className="text-sm text-gray-500">{hospital.bedAvailability.emergency} beds available</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleBookBed(hospital.id, 'emergency')}
                        disabled={hospital.bedAvailability.emergency === 0}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Equipment Tab */}
      <TabsContent value="equipment">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicalEquipment.map((equipment) => (
            <Card key={equipment.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {equipment.name === 'Oxygen Cylinder' && <Wind size={20} className="text-blue-500" />}
                  {equipment.name === 'Ventilator' && <Heart size={20} className="text-red-500" />}
                  {equipment.name === 'Wheelchair' && <Wheelchair size={20} className="text-green-500" />}
                  {equipment.name === 'Hospital Bed' && <Bed size={20} className="text-purple-500" />}
                  {equipment.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{equipment.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">₹{equipment.price}</span>
                  <Badge variant="outline">{equipment.duration}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Available: {equipment.availability}</span>
                  <Badge 
                    variant={equipment.availability > 5 ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {equipment.availability > 5 ? 'In Stock' : 'Limited'}
                  </Badge>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => handleEquipmentRequest(equipment.id)}
                  disabled={equipment.availability === 0}
                >
                  Request Equipment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Assistance Tab */}
      <TabsContent value="assistance">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assistanceServices.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} className="text-blue-500" />
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{service.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">₹{service.price}</span>
                  <Badge variant="outline">{service.duration}</Badge>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => handleAssistanceRequest(service.id)}
                >
                  Request Assistance
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default HospitalServices;
