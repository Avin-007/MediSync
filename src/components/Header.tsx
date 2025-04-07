
import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, LogIn, Home, User, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b bg-white py-4 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="hidden sm:flex"
        >
          <Home size={18} className="mr-2" />
          Home
        </Button>
        
        {isAuthenticated ? (
          <>
            <div className="hidden sm:block">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (user?.role) {
                    navigate(`/${user.role}`);
                  }
                }}
              >
                Dashboard
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative">
                  <User size={18} />
                  <span className="sr-only sm:not-sr-only sm:ml-2">Account</span>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-medisync-red rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${user?.role}`)}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/notifications')}>
                  <Bell size={16} className="mr-2" />
                  Notifications
                  <span className="ml-auto bg-medisync-red text-white rounded-full px-1.5 py-0.5 text-xs">
                    2
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button 
            onClick={() => navigate('/login')}
            className="bg-medisync-blue hover:bg-medisync-blue/90"
          >
            <LogIn size={18} className="mr-2" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
