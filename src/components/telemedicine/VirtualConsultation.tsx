
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Video, Phone, MessageSquare, Calendar, Clock, Star, Camera, Mic, MicOff, VideoOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar: string;
  availableSlots: string[];
  consultationFee: number;
  status: 'available' | 'busy' | 'offline';
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'video' | 'voice' | 'chat';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  symptoms: string;
}

const VirtualConsultation: React.FC = () => {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    symptoms: '',
    preferredTime: '',
    consultationType: 'video'
  });

  useEffect(() => {
    // Simulate available doctors
    setDoctors([
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialty: 'General Medicine',
        rating: 4.8,
        avatar: '/placeholder.svg',
        availableSlots: ['09:00', '10:30', '14:00', '15:30'],
        consultationFee: 2500,
        status: 'available'
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        rating: 4.9,
        avatar: '/placeholder.svg',
        availableSlots: ['11:00', '13:00', '16:00'],
        consultationFee: 4000,
        status: 'available'
      },
      {
        id: '3',
        name: 'Dr. Priya Sharma',
        specialty: 'Dermatology',
        rating: 4.7,
        avatar: '/placeholder.svg',
        availableSlots: ['10:00', '12:00', '15:00'],
        consultationFee: 3500,
        status: 'busy'
      }
    ]);

    setAppointments([
      {
        id: '1',
        doctorId: '1',
        doctorName: 'Dr. Sarah Johnson',
        specialty: 'General Medicine',
        date: '2024-01-20',
        time: '14:00',
        type: 'video',
        status: 'scheduled',
        symptoms: 'Persistent headache and fatigue'
      },
      {
        id: '2',
        doctorId: '2',
        doctorName: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        date: '2024-01-18',
        time: '11:00',
        type: 'video',
        status: 'completed',
        symptoms: 'Chest pain and shortness of breath'
      }
    ]);
  }, []);

  const bookAppointment = () => {
    if (!selectedDoctor || !newAppointment.symptoms || !newAppointment.preferredTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: new Date().toISOString().split('T')[0],
      time: newAppointment.preferredTime,
      type: newAppointment.consultationType as any,
      status: 'scheduled',
      symptoms: newAppointment.symptoms
    };

    setAppointments(prev => [appointment, ...prev]);
    setNewAppointment({ symptoms: '', preferredTime: '', consultationType: 'video' });
    setSelectedDoctor(null);

    toast({
      title: "Appointment Booked",
      description: `Your consultation with ${selectedDoctor.name} has been scheduled.`
    });
  };

  const startConsultation = (appointmentId: string) => {
    setIsInCall(true);
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'ongoing' } : apt
    ));
    
    toast({
      title: "Consultation Started",
      description: "You are now connected with your doctor."
    });
  };

  const endConsultation = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
    
    toast({
      title: "Consultation Ended",
      description: "Thank you for using our telemedicine service."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-amber-100 text-amber-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isInCall) {
    return (
      <Card className="h-[600px]">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center justify-between">
            <span>Video Consultation</span>
            <Badge className="bg-green-100 text-green-800">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-80px)] bg-gray-900 relative">
          <div className="h-full flex items-center justify-center text-white">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>Dr</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
              <p className="text-gray-300">General Medicine</p>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant={isMuted ? "destructive" : "secondary"}
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full"
              >
                {isMuted ? <MicOff /> : <Mic />}
              </Button>
              <Button
                size="icon"
                variant={isVideoOff ? "destructive" : "secondary"}
                onClick={() => setIsVideoOff(!isVideoOff)}
                className="rounded-full"
              >
                {isVideoOff ? <VideoOff /> : <Video />}
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={endConsultation}
                className="rounded-full"
              >
                <Phone className="rotate-135" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Telemedicine Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="book">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="book">Book Consultation</TabsTrigger>
              <TabsTrigger value="appointments">My Appointments</TabsTrigger>
              <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            </TabsList>

            <TabsContent value="book" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="symptoms">Describe your symptoms</Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Please describe your health concerns..."
                      value={newAppointment.symptoms}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, symptoms: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="consultation-type">Consultation Type</Label>
                    <Select value={newAppointment.consultationType} onValueChange={(value) => setNewAppointment(prev => ({ ...prev, consultationType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="voice">Voice Call</SelectItem>
                        <SelectItem value="chat">Text Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDoctor && (
                    <div>
                      <Label htmlFor="time-slot">Available Time Slots</Label>
                      <Select value={newAppointment.preferredTime} onValueChange={(value) => setNewAppointment(prev => ({ ...prev, preferredTime: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedDoctor.availableSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button 
                    onClick={bookAppointment} 
                    disabled={!selectedDoctor}
                    className="w-full"
                  >
                    Book Consultation
                  </Button>
                </div>

                <div>
                  {selectedDoctor ? (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarImage src={selectedDoctor.avatar} />
                            <AvatarFallback>{selectedDoctor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{selectedDoctor.name}</h3>
                            <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{selectedDoctor.rating}</span>
                        </div>
                        <p className="text-lg font-semibold">NPR {selectedDoctor.consultationFee}</p>
                        <Button 
                          variant="outline" 
                          className="w-full mt-3"
                          onClick={() => setSelectedDoctor(null)}
                        >
                          Choose Different Doctor
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center text-gray-500">
                      Select a doctor to proceed with booking
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <p className="text-sm text-gray-500">{appointment.symptoms}</p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        {appointment.type === 'video' ? <Video className="h-3 w-3" /> : 
                         appointment.type === 'voice' ? <Phone className="h-3 w-3" /> : 
                         <MessageSquare className="h-3 w-3" />}
                        {appointment.type}
                      </span>
                    </div>
                    {appointment.status === 'scheduled' && (
                      <Button 
                        onClick={() => startConsultation(appointment.id)}
                        className="w-full"
                      >
                        Join Consultation
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="doctors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4" onClick={() => setSelectedDoctor(doctor)}>
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={doctor.avatar} />
                          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                        <Badge className={getStatusColor(doctor.status)}>
                          {doctor.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{doctor.rating}</span>
                        </div>
                        <span className="font-semibold">NPR {doctor.consultationFee}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualConsultation;
