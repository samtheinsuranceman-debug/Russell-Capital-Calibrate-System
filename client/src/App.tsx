import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import CaseStudies from "./pages/CaseStudies";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Advisors from "./pages/Advisors";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Calibrate from "./pages/Calibrate";
import DemoWarroom from "./pages/DemoWarroom";
import DemoFolio from "./pages/DemoFolio";
import DemoBlueprint from "./pages/DemoBlueprint";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/services" component={Services} />
      <Route path="/faq" component={FAQ} />
      <Route path="/advisors" component={Advisors} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route path="/calibrate" component={Calibrate} />
      <Route path="/demo-warroom" component={DemoWarroom} />
      <Route path="/demo-folio" component={DemoFolio} />
      <Route path="/demo-blueprint" component={DemoBlueprint} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
