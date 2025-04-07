
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
      <Route path="/ambulance" element={
        <ProtectedRoute role="ambulance"><AmbulancePortal /></ProtectedRoute>
      } />
      <Route path="/user" element={
        <ProtectedRoute role="user"><UserPortal /></ProtectedRoute>
      } />
      <Route path="/hospital" element={
        <ProtectedRoute role="hospital"><HospitalPortal /></ProtectedRoute>
      } />
      <Route path="/traffic" element={
        <ProtectedRoute role="traffic"><TrafficPortal /></ProtectedRoute>
      } />
      <Route path="/nurse" element={
        <ProtectedRoute role="nurse"><NursePortal /></ProtectedRoute>
      } />
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
