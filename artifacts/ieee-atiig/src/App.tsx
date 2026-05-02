import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import InitiativesPage from "@/pages/initiatives";
import ProjectsPage from "@/pages/projects";
import ResourcesPage from "@/pages/resources";
import GetInvolvedPage from "@/pages/get-involved";
import NewsEventsPage from "@/pages/news-events";
import ContactPage from "@/pages/contact";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import AccessibilityStatementPage from "@/pages/accessibility-statement";

const queryClient = new QueryClient();

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/initiatives" element={<InitiativesPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/get-involved" element={<GetInvolvedPage />} />
      <Route path="/news-events" element={<NewsEventsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/accessibility" element={<AccessibilityStatementPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Router />
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
