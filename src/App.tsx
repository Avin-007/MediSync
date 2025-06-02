import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AmbulancePortal from "./pages/AmbulancePortal";
import UserPortal from "./pages/UserPortal";
import HospitalPortal from "./pages/HospitalPortal";
import TrafficPortal from "./pages/TrafficPortal";
import NursePortal from "./pages/NursePortal";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

// Import the new functional pages
import AnalyticsPage from "./pages/features/AnalyticsPage";
import SchedulePage from "./pages/features/SchedulePage";
import RemindersPage from "./pages/features/RemindersPage";
import LocationPage from "./pages/features/LocationPage";
import MessagesPage from "./pages/features/MessagesPage";
import ProfilePage from "./pages/features/ProfilePage";
import { Suspense } from "react";

const queryClient = new QueryClient();

// Route guard component
const ProtectedRoute = ({ children, role }: { children: JSX.Element, role?: string }) => {
  const { isAuthenticated, user, checkingAuth } = useAuth();
  
  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* User routes */}
      <Route path="/user" element={
        <ProtectedRoute role="user"><UserPortal /></ProtectedRoute>
      } />
      <Route path="/user/analytics" element={
        <ProtectedRoute role="user"><AnalyticsPage /></ProtectedRoute>
      } />
      <Route path="/user/schedule" element={
        <ProtectedRoute role="user"><SchedulePage /></ProtectedRoute>
      } />
      <Route path="/user/reminders" element={
        <ProtectedRoute role="user"><RemindersPage /></ProtectedRoute>
      } />
      <Route path="/user/location" element={
        <ProtectedRoute role="user"><LocationPage /></ProtectedRoute>
      } />
      <Route path="/user/messages" element={
        <ProtectedRoute role="user"><MessagesPage /></ProtectedRoute>
      } />

      {/* Ambulance routes */}
      <Route path="/ambulance" element={
        <ProtectedRoute role="ambulance"><AmbulancePortal /></ProtectedRoute>
      } />
      <Route path="/ambulance/analytics" element={
        <ProtectedRoute role="ambulance"><AnalyticsPage /></ProtectedRoute>
      } />
      <Route path="/ambulance/schedule" element={
        <ProtectedRoute role="ambulance"><SchedulePage /></ProtectedRoute>
      } />
      <Route path="/ambulance/reminders" element={
        <ProtectedRoute role="ambulance"><RemindersPage /></ProtectedRoute>
      } />
      <Route path="/ambulance/location" element={
        <ProtectedRoute role="ambulance"><LocationPage /></ProtectedRoute>
      } />
      <Route path="/ambulance/messages" element={
        <ProtectedRoute role="ambulance"><MessagesPage /></ProtectedRoute>
      } />
      
      {/* Hospital routes */}
      <Route path="/hospital" element={
        <ProtectedRoute role="hospital"><HospitalPortal /></ProtectedRoute>
      } />
      <Route path="/hospital/analytics" element={
        <ProtectedRoute role="hospital"><AnalyticsPage /></ProtectedRoute>
      } />
      <Route path="/hospital/schedule" element={
        <ProtectedRoute role="hospital"><SchedulePage /></ProtectedRoute>
      } />
      <Route path="/hospital/reminders" element={
        <ProtectedRoute role="hospital"><RemindersPage /></ProtectedRoute>
      } />
      <Route path="/hospital/location" element={
        <ProtectedRoute role="hospital"><LocationPage /></ProtectedRoute>
      } />
      <Route path="/hospital/messages" element={
        <ProtectedRoute role="hospital"><MessagesPage /></ProtectedRoute>
      } />
      
      {/* Traffic routes */}
      <Route path="/traffic" element={
        <ProtectedRoute role="traffic"><TrafficPortal /></ProtectedRoute>
      } />
      <Route path="/traffic/analytics" element={
        <ProtectedRoute role="traffic"><AnalyticsPage /></ProtectedRoute>
      } />
      <Route path="/traffic/schedule" element={
        <ProtectedRoute role="traffic"><SchedulePage /></ProtectedRoute>
      } />
      <Route path="/traffic/reminders" element={
        <ProtectedRoute role="traffic"><RemindersPage /></ProtectedRoute>
      } />
      <Route path="/traffic/location" element={
        <ProtectedRoute role="traffic"><LocationPage /></ProtectedRoute>
      } />
      <Route path="/traffic/messages" element={
        <ProtectedRoute role="traffic"><MessagesPage /></ProtectedRoute>
      } />
      
      {/* Nurse routes */}
      <Route path="/nurse" element={
        <ProtectedRoute role="nurse"><NursePortal /></ProtectedRoute>
      } />
      <Route path="/nurse/analytics" element={
        <ProtectedRoute role="nurse"><AnalyticsPage /></ProtectedRoute>
      } />
      <Route path="/nurse/schedule" element={
        <ProtectedRoute role="nurse"><SchedulePage /></ProtectedRoute>
      } />
      <Route path="/nurse/reminders" element={
        <ProtectedRoute role="nurse"><RemindersPage /></ProtectedRoute>
      } />
      <Route path="/nurse/location" element={
        <ProtectedRoute role="nurse"><LocationPage /></ProtectedRoute>
      } />
      <Route path="/nurse/messages" element={
        <ProtectedRoute role="nurse"><MessagesPage /></ProtectedRoute>
      } />
      
      {/* Common routes */}
      <Route path="/settings" element={
        <ProtectedRoute><Settings /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><ProfilePage /></ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute><Notifications /></ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    }>
      <HashRouter basename="/">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LanguageProvider>
              <TooltipProvider>
                <AppRoutes />
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </LanguageProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HashRouter>
    </Suspense>
  );
}

export default App;
