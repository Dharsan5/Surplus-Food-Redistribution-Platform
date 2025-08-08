import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import all your original pages
import WelcomeScreen from "@/pages/WelcomeScreen";
import LoginScreen from "@/pages/LoginScreen";
import SignUpScreen from "@/pages/SignUpScreen";
import ForgotPasswordScreen from "@/pages/ForgotPasswordScreen";
import HomeScreen from "@/pages/HomeScreen";
import FoodDetailScreen from "@/pages/FoodDetailScreen";
import AddFoodScreen from "@/pages/AddFoodScreen";
import EditFoodScreen from "@/pages/EditFoodScreen";
import OrdersScreen from "@/pages/OrdersScreen";
import RequestsScreen from "@/pages/RequestsScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import NotificationsScreen from "@/pages/NotificationsScreen";
import SettingsScreen from "@/pages/SettingsScreen";
import HelpScreen from "@/pages/HelpScreen";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component is rendering with full pages!");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/food/:id" element={<FoodDetailScreen />} />
            <Route path="/add-food" element={<AddFoodScreen />} />
            <Route path="/edit-food/:id" element={<EditFoodScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="/requests" element={<RequestsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/help" element={<HelpScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

