
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Create placeholder components for the new routes
const AnalyticsPage = () => <UserPortal />;
const SchedulePage = () => <UserPortal />;
const RemindersPage = () => <UserPortal />;
const LocationPage = () => <UserPortal />;
const MessagesPage = () => <UserPortal />;

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
      
      {/* Common routes */}
      <Route path="/settings" element={
        <ProtectedRoute><Settings /></ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute><Notifications /></ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
