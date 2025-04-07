
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AmbulancePortal from "./pages/AmbulancePortal";
import UserPortal from "./pages/UserPortal";
import HospitalPortal from "./pages/HospitalPortal";
import TrafficPortal from "./pages/TrafficPortal";
import NursePortal from "./pages/NursePortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ambulance" element={<AmbulancePortal />} />
            <Route path="/user" element={<UserPortal />} />
            <Route path="/hospital" element={<HospitalPortal />} />
            <Route path="/traffic" element={<TrafficPortal />} />
            <Route path="/nurse" element={<NursePortal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
