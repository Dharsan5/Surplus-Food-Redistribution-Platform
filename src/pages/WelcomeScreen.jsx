import { ArrowRight, Users, Heart, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className={`max-w-sm w-full text-center space-y-8 relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Illustration */}
        <div className="relative">
          <div className="w-72 h-72 mx-auto bg-gradient-to-br from-primary/10 via-white to-accent/10 rounded-full flex items-center justify-center mb-6 relative overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              
              <div className="relative">
                <Heart className="w-12 h-12 text-accent animate-pulse" />
                <Sparkles className="w-6 h-6 text-accent/60 absolute -top-2 -right-2 animate-spin" style={{animationDuration: '3s'}} />
              </div>
              
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-primary/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-12 right-8 w-3 h-3 bg-accent/20 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-16 right-12 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        {/* Title */}
        <div className={`space-y-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Surplus Food
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                Redistribution
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/80">
                App
              </span>
            </h1>
            
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed px-4">
            Connecting donors with communities to reduce food waste and fight hunger
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 px-4">
            <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full">
              Zero Waste
            </span>
            <span className="bg-accent/10 text-accent text-sm font-medium px-4 py-2 rounded-full">
              Help Communities
            </span>
            <span className="bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full">
              Make Impact
            </span>
          </div>
        </div>

        {/* Get Started Button */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Button
            onClick={() => navigate("/login")}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary to-primary/80 hover:bg-primary/90 text-white rounded-2xl touch-area transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl group"
          >
            <span className="mr-3">Get Started</span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

