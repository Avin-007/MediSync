
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'ambulance' | 'traffic' | 'hospital' | 'user' | 'nurse' | null;

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Check for saved auth data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('medisync_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user data');
        localStorage.removeItem('medisync_user');
      }
    }
  }, []);

  // In a real app, this would validate with a backend
  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    // This is a mock authentication function
    // In a real app, you would call your backend API
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create mock user (in a real app, this would come from your backend)
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: role || 'user',
    };
    
    setUser(newUser);
    localStorage.setItem('medisync_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medisync_user');
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
      setUserRole
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
