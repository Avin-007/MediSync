
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { BarChart3, Bell, Calendar, ChevronLeft, ChevronRight, LayoutDashboard, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  headerActions?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  description,
  headerActions
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
    { name: "Analytics", icon: <BarChart3 size={20} />, active: false },
    { name: "Schedule", icon: <Calendar size={20} />, active: false },
    { name: "Reminders", icon: <Bell size={20} />, active: false },
    { name: "Location", icon: <MapPin size={20} />, active: false },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8">
          <p className="text-center">Please log in to access this page...</p>
        </Card>
      </div>
    );
  }

  const renderSidebar = () => (
    <div className={`bg-white border-r h-full flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="p-4 border-b flex justify-between items-center">
        {!collapsed && <h2 className="font-bold text-lg">MediSync</h2>}
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 py-4">
        <nav>
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-${collapsed ? 'center' : 'start'} mb-1 ${item.active ? 'bg-medisync-blue hover:bg-medisync-blue/90' : ''}`}
            >
              <span>{item.icon}</span>
              {!collapsed && <span className="ml-2">{item.name}</span>}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block h-screen overflow-y-auto sticky top-0">
        {renderSidebar()}
      </div>

      {/* Sheet/Drawer for mobile */}
      <Sheet>
        <div className="block md:hidden absolute left-2 top-2 z-10">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="p-0">
          {renderSidebar()}
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="container mx-auto py-8 px-4 flex-1">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && <p className="text-gray-500">{description}</p>}
              </div>
              {headerActions && (
                <div>{headerActions}</div>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
