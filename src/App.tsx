import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Schedule = lazy(() => import("./pages/Schedule"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Historia = lazy(() => import("./pages/Historia"));
const Natacao = lazy(() => import("./pages/Natacao"));
const Musculacao = lazy(() => import("./pages/Musculacao"));
const BemEstar = lazy(() => import("./pages/BemEstar"));
const Modalidade = lazy(() => import("./pages/Modalidade"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminSEO = lazy(() => import("./pages/admin/AdminSEO"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminNotifications = lazy(() => import("./pages/admin/AdminNotifications"));
const AdminSchedule = lazy(() => import("./pages/admin/AdminSchedule"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminModalities = lazy(() => import("./pages/admin/AdminModalities"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<Index />} />
        <Route path="/horarios" element={<Schedule />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/natacao" element={<Natacao />} />
        <Route path="/musculacao" element={<Musculacao />} />
        <Route path="/bem-estar" element={<BemEstar />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/contato" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/seo" element={<AdminSEO />} />
        <Route path="/admin/galeria" element={<AdminGallery />} />
        <Route path="/admin/notificacoes" element={<AdminNotifications />} />
        <Route path="/admin/horarios" element={<AdminSchedule />} />
        <Route path="/admin/depoimentos" element={<AdminTestimonials />} />
        <Route path="/admin/modalidades" element={<AdminModalities />} />
        <Route path="/admin/configuracoes" element={<AdminSettings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <AnimatedRoutes />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
