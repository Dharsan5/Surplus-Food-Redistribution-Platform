import { ArrowLeft, User, Bell, Lock, Globe, HelpCircle, Shield, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SettingsScreen = () => {
  const navigate = useNavigate();

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Information", action: () => {} },
        { icon: Bell, label: "Notification Preferences", action: () => {} },
        { icon: Lock, label: "Privacy Settings", action: () => {} }
      ]
    },
    {
      title: "App Settings",
      items: [
        { icon: Globe, label: "Language", action: () => {} },
        { icon: Moon, label: "Dark Mode", action: () => {} },
        { icon: Shield, label: "Security", action: () => {} }
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help & FAQ", action: () => navigate("/help") }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="px-6 pt-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 px-2">{group.title}</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {group.items.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="flex-1 text-left text-gray-900">{item.label}</span>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsScreen;

