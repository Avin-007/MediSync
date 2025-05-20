
import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogOut, LogIn, Home, User, Bell, Settings } from 'lucide-react';
import NotificationsPanel from './dashboard/NotificationsPanel';
import LanguageSwitcher from './LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
          {t('home')}
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
                {t('dashboard')}
              </Button>
            </div>
            
            <NotificationsPanel />
            
            <LanguageSwitcher />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <div className="mt-1 px-1 py-0.5 text-xs rounded bg-muted inline-block">
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${user?.role}`)}>
                  <User size={16} className="mr-2" />
                  {t('dashboard')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings size={16} className="mr-2" />
                  {t('settings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut size={16} className="mr-2" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <LanguageSwitcher />
            <Button 
              onClick={() => navigate('/login')}
              className="bg-nepal-royal-blue hover:bg-nepal-royal-blue/90"
            >
              <LogIn size={18} className="mr-2" />
              {t('login')}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
