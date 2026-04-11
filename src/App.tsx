import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AiAssistant from "@/components/AiAssistant";
import Index from "./pages/Index.tsx";
import EVModelPage from "./pages/EVModelPage.tsx";
import EVDirectoryPage from "./pages/EVDirectoryPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/akkuturva" element={<EVDirectoryPage />} />
          <Route path="/akkuturva/:slug" element={<EVModelPage />} />
          <Route path="/blogi" element={<BlogPage />} />
          <Route path="/blogi/:slug" element={<BlogPostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AiAssistant />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
