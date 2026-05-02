import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/initiatives" component={InitiativesPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/get-involved" component={GetInvolvedPage} />
      <Route path="/news-events" component={NewsEventsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
