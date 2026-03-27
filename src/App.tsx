import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import EnergyLayout from "@/components/EnergyLayout";
import Overview from "./pages/Overview";
import PowerAnalysis from "./pages/PowerAnalysis";
import Consumption from "./pages/Consumption";
import Carbon from "./pages/Carbon";
import Renewable from "./pages/Renewable";
import Forecast from "./pages/Forecast";
import Storage from "./pages/Storage";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <EnergyLayout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/power" element={<PowerAnalysis />} />
            <Route path="/consumption" element={<Consumption />} />
            <Route path="/carbon" element={<Carbon />} />
            <Route path="/renewable" element={<Renewable />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EnergyLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
