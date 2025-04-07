
import React from 'react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';

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

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8">
          <p className="text-center">Please log in to access this page...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
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
  );
};

export default DashboardLayout;
