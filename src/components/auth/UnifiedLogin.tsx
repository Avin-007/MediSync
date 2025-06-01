
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, Lock, User, Ambulance, Hospital, AlertTriangle, UserCog, Shield, Stethoscope, Activity } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnifiedLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const userTypes = [
    { 
      value: 'user', 
      label: 'Patient', 
      icon: User,
      color: 'bg-blue-500',
      description: 'Access health records and telemedicine'
    },
    { 
      value: 'ambulance', 
      label: 'Ambulance Driver', 
      icon: Ambulance,
      color: 'bg-red-500',
      description: 'Emergency response and navigation'
    },
    { 
      value: 'hospital', 
      label: 'Hospital Admin', 
      icon: Hospital,
      color: 'bg-green-500',
      description: 'Manage hospital resources and HL7 data'
    },
    { 
      value: 'traffic', 
      label: 'Traffic Authority', 
      icon: AlertTriangle,
      color: 'bg-orange-500',
      description: 'Coordinate emergency vehicle routing'
    },
    { 
      value: 'nurse', 
      label: 'Home Care Nurse', 
      icon: UserCog,
      color: 'bg-purple-500',
      description: 'Patient care and visit management'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
      toast({
        title: "Welcome to MediSync!",
        description: `Successfully logged in as ${userTypes.find(t => t.value === selectedRole)?.label}`,
      });
      navigate(`/${selectedRole}`);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-4">
            <motion.div
              animate={{ 
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Stethoscope size={32} className="text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-3xl">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Medi</span>
                <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">Sync</span>
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Quick Access Portal for Healthcare Professionals
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <Shield size={20} />
                Select Your Role
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userTypes.map((type) => (
                  <motion.div
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      selectedRole === type.value 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole(type.value as UserRole)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${type.color} rounded-lg p-2`}>
                        <type.icon className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{type.label}</h3>
                        <p className="text-xs text-gray-600">{type.description}</p>
                      </div>
                      {selectedRole === type.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-3 w-3 bg-blue-500 rounded-full"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@medisync.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Activity className="animate-spin" size={20} />
                      Signing In...
                    </div>
                  ) : (
                    `Sign In as ${userTypes.find(t => t.value === selectedRole)?.label}`
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="text-center">
              <Badge className="bg-green-100 text-green-800">
                <Shield size={14} className="mr-1" />
                HL7 FHIR Compatible • HIPAA Compliant
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UnifiedLogin;
