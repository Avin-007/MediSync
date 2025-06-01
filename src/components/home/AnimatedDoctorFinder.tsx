
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, Stethoscope, Heart, Brain, Eye, 
  Bone, Baby, Users, Star, Clock, MapPin,
  Video, Phone, MessageSquare, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  hospital: string;
  rating: number;
  experience: number;
  isOnline: boolean;
  consultationFee: number;
  avatar: string;
  nextAvailable: string;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Anjana Sharma',
    specialty: 'Cardiologist',
    department: 'Cardiology',
    hospital: 'Norvic International Hospital',
    rating: 4.9,
    experience: 15,
    isOnline: true,
    consultationFee: 1500,
    avatar: '/api/placeholder/64/64',
    nextAvailable: 'Available Now'
  },
  {
    id: '2',
    name: 'Dr. Rajesh Hamal',
    specialty: 'Neurologist',
    department: 'Neurology',
    hospital: 'Grande International Hospital',
    rating: 4.8,
    experience: 12,
    isOnline: true,
    consultationFee: 2000,
    avatar: '/api/placeholder/64/64',
    nextAvailable: 'Available Now'
  },
  {
    id: '3',
    name: 'Dr. Sunita Rai',
    specialty: 'Pediatrician',
    department: 'Pediatrics',
    hospital: 'CIWEC Hospital',
    rating: 4.9,
    experience: 10,
    isOnline: false,
    consultationFee: 1200,
    avatar: '/api/placeholder/64/64',
    nextAvailable: 'Tomorrow 9:00 AM'
  }
];

const departments = [
  { name: 'Cardiology', icon: Heart, color: 'text-red-500', count: 8 },
  { name: 'Neurology', icon: Brain, color: 'text-purple-500', count: 5 },
  { name: 'Pediatrics', icon: Baby, color: 'text-blue-500', count: 12 },
  { name: 'Orthopedics', icon: Bone, color: 'text-orange-500', count: 7 },
  { name: 'Ophthalmology', icon: Eye, color: 'text-green-500', count: 4 },
  { name: 'General', icon: Stethoscope, color: 'text-gray-500', count: 15 }
];

const AnimatedDoctorFinder = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const handleDepartmentClick = (departmentName: string) => {
    setSelectedDepartment(departmentName);
    const filtered = mockDoctors.filter(doctor => 
      doctor.department.toLowerCase() === departmentName.toLowerCase()
    );
    setFilteredDoctors(filtered);
  };

  const handleFindDoctors = () => {
    setIsExpanded(true);
    setFilteredDoctors(mockDoctors);
  };

  return (
    <div className="space-y-6">
      {/* Quick Access Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={handleFindDoctors}>
          <CardContent className="p-6 text-center relative">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block mb-4"
            >
              <Stethoscope size={48} />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Find Online Doctors</h3>
            <p className="text-blue-100">Connect with specialists instantly</p>
            
            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity
              }}
              className="absolute top-4 right-4"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expanded Doctor Finder */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Department Selection */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Select Department
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.name}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedDepartment === dept.name 
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleDepartmentClick(dept.name)}
                      >
                        <CardContent className="p-4 text-center">
                          <dept.icon className={`h-8 w-8 mx-auto mb-2 ${dept.color}`} />
                          <h4 className="font-medium">{dept.name}</h4>
                          <Badge variant="secondary" className="mt-1">
                            {dept.count} doctors
                          </Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Doctor List */}
            <AnimatePresence>
              {filteredDoctors.length > 0 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Available Doctors</h3>
                      <div className="space-y-4">
                        {filteredDoctors.map((doctor, index) => (
                          <motion.div
                            key={doctor.id}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Card className="hover:shadow-md transition-shadow duration-300">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="relative">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage src={doctor.avatar} />
                                        <AvatarFallback className="bg-blue-500 text-white">
                                          {doctor.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      {doctor.isOnline && (
                                        <motion.div
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                          className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"
                                        />
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-lg">{doctor.name}</h4>
                                      <p className="text-gray-600">{doctor.specialty}</p>
                                      <p className="text-sm text-gray-500">{doctor.hospital}</p>
                                      <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1">
                                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                          <span className="text-sm font-medium">{doctor.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Clock className="h-4 w-4 text-gray-400" />
                                          <span className="text-sm text-gray-600">{doctor.experience}y exp</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right space-y-2">
                                    <div>
                                      <p className="text-sm text-gray-600">Consultation Fee</p>
                                      <p className="font-bold text-lg">NPR {doctor.consultationFee}</p>
                                    </div>
                                    <Badge 
                                      className={doctor.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                                    >
                                      {doctor.nextAvailable}
                                    </Badge>
                                    <div className="flex gap-2">
                                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                                        <Video className="h-4 w-4 mr-1" />
                                        Video
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <MessageSquare className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDoctorFinder;
