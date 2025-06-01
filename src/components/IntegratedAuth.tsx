
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Mail, Lock, User, Phone, Calendar, MapPin, Shield, Heart, Plus, Ambulance, Hospital, UserCog, AlertTriangle } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface IntegratedAuthProps {
  onClose: () => void;
}

const IntegratedAuth: React.FC<IntegratedAuthProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('user');
  
  // Register state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const roleOptions = [
    { 
      value: 'user', 
      label: 'Patient', 
      description: 'Access health records and book appointments',
      icon: User,
      color: 'text-blue-500'
    },
    { 
      value: 'ambulance', 
      label: 'Ambulance Driver', 
      description: 'Manage emergency responses and navigation',
      icon: Ambulance,
      color: 'text-red-500'
    },
    { 
      value: 'hospital', 
      label: 'Hospital Admin', 
      description: 'Manage hospital resources and patient data',
      icon: Hospital,
      color: 'text-green-500'
    },
    { 
      value: 'traffic', 
      label: 'Traffic Authority', 
      description: 'Coordinate emergency vehicle routing',
      icon: AlertTriangle,
      color: 'text-orange-500'
    },
    { 
      value: 'nurse', 
      label: 'Home Care Nurse', 
      description: 'Manage patient care and visit schedules',
      icon: UserCog,
      color: 'text-purple-500'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword, loginRole);
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${roleOptions.find(r => r.value === loginRole)?.label}`,
      });
      onClose();
      navigate(`/${loginRole}`);
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!registerData.name || !registerData.email || !registerData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Registration Successful!",
        description: "Your Health ID has been created. You can now log in.",
      });
      setActiveTab('login');
      setLoginEmail(registerData.email);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Plus size={24} className="text-white" strokeWidth={3} />
              </motion.div>
            </div>
            <CardTitle className="text-2xl">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Medi</span>
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Sync</span>
            </CardTitle>
            <CardDescription>Your Digital Health Companion</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Get Health ID</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={isLoading}
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
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Shield size={16} />
                      Login As
                    </Label>
                    <RadioGroup value={loginRole} onValueChange={(value) => setLoginRole(value as UserRole)}>
                      <div className="grid grid-cols-1 gap-3">
                        {roleOptions.map((role) => (
                          <motion.div
                            key={role.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                              loginRole === role.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => setLoginRole(role.value as UserRole)}
                          >
                            <RadioGroupItem value={role.value} id={role.value} />
                            <role.icon className={`${role.color}`} size={20} />
                            <div className="flex-1">
                              <Label htmlFor={role.value} className="font-medium cursor-pointer">
                                {role.label}
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <div className="text-center mb-4">
                  <Badge className="bg-green-100 text-green-800">
                    <Heart size={14} className="mr-1" />
                    Create Your Digital Health ID
                  </Badge>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User size={16} />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone size={16} />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+977-XXXXXXXXX"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="flex items-center gap-2">
                      <Mail size={16} />
                      Email Address *
                    </Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="flex items-center gap-2">
                        <Calendar size={16} />
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={registerData.dateOfBirth}
                        onChange={(e) => setRegisterData({...registerData, dateOfBirth: e.target.value})}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin size={16} />
                        Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="Kathmandu, Nepal"
                        value={registerData.address}
                        onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password *</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm *</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Health ID..." : "Create Health ID"}
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <Button variant="ghost" onClick={onClose} className="text-sm">
                Continue without account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default IntegratedAuth;
