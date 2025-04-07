
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'ambulance' | 'traffic' | 'hospital' | 'user' | 'nurse' | null;

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  checkingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { toast } = useToast();
  
  // Check for saved auth data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('medisync_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user data');
        localStorage.removeItem('medisync_user');
        toast({
          title: "Session Error",
          description: "Your session data was corrupted. Please login again.",
          variant: "destructive",
        });
      }
    }
    setCheckingAuth(false);
  }, []);

  // In a real app, this would validate with a backend
  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    // This is a mock authentication function
    // In a real app, you would call your backend API
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Validate password (at least 6 characters)
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const firstName = email.split('@')[0];
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    
    // Create mock user (in a real app, this would come from your backend)
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: capitalizedName,
      email,
      role: role || 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    setUser(newUser);
    localStorage.setItem('medisync_user', JSON.stringify(newUser));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${newUser.name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medisync_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const setUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('medisync_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login,
      logout,
      setUserRole,
      checkingAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
