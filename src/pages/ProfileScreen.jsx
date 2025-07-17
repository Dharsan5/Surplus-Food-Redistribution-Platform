import { User, Settings, Bell, HelpCircle, LogOut, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

const ProfileScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        
        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">Community Helper</p>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Requests Made</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">45kg</div>
            <div className="text-sm text-gray-600">Food Saved</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-2">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {[
            { icon: Settings, label: "Settings", action: () => navigate("/settings") },
            { icon: Bell, label: "Notifications", action: () => navigate("/notifications") },
            { icon: HelpCircle, label: "Help & Support", action: () => navigate("/help") },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <item.icon className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-left text-gray-900">{item.label}</span>
            </button>
          ))}
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 text-red-600 border-red-200 hover:bg-red-50 rounded-2xl mt-6"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;

