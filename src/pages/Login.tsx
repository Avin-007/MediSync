
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { LockKeyhole, Mail, Shield } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Logo from '@/components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

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
      await login(email, password, role);
      toast({
        title: "Login Successful",
        description: "You've been logged in successfully",
      });
      
      // Redirect based on role
      switch(role) {
        case 'ambulance':
          navigate('/ambulance');
          break;
        case 'hospital':
          navigate('/hospital');
          break;
        case 'user':
          navigate('/user');
          break;
        case 'traffic':
          navigate('/traffic');
          break;
        case 'nurse':
          navigate('/nurse');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Login to MediSync</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <LockKeyhole size={16} />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Shield size={16} />
                Login As
              </Label>
              <RadioGroup value={role as string} onValueChange={(value) => setRole(value as UserRole)} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">Patient/User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ambulance" id="ambulance" />
                  <Label htmlFor="ambulance">Ambulance Driver</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hospital" id="hospital" />
                  <Label htmlFor="hospital">Hospital Admin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="traffic" id="traffic" />
                  <Label htmlFor="traffic">Traffic Authority</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nurse" id="nurse" />
                  <Label htmlFor="nurse">Nurse</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-medisync-blue hover:bg-medisync-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p>
            For demonstration purposes, any email and password will work.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
