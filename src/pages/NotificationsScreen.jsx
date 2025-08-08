import { ArrowLeft, Bell, Check, Clock, Heart, MessageCircle, CheckCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "request",
      icon: MessageCircle,
      title: "New pickup request",
      message: "Someone wants to pickup your Fresh Vegetables",
      time: "2 minutes ago",
      isRead: false
    },
    {
      id: "2",
      type: "like",
      icon: Heart,
      title: "Food item liked",
      message: "5 people liked your Bread & Pastries listing",
      time: "1 hour ago",
      isRead: false
    },
    {
      id: "3",
      type: "pickup",
      icon: Check,
      title: "Pickup confirmed",
      message: "John confirmed pickup for Cooked Meals",
      time: "3 hours ago",
      isRead: true
    },
    {
      id: "4",
      type: "reminder",
      icon: Clock,
      title: "Pickup reminder",
      message: "Don't forget scheduled for 6 PM today",
      time: "1 day ago",
      isRead: true
    }
  ]);

  // Mark all notifications as read when component mounts
  useEffect(() => {
    // Mark all as read
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      isRead: true
    })));
    
    // Update localStorage to indicate no unread notifications
    localStorage.setItem('hasUnreadNotifications', 'false');
    
    // Trigger event to update other components
    window.dispatchEvent(new CustomEvent('notificationsRead'));
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      isRead: true
    })));
    localStorage.setItem('hasUnreadNotifications', 'false');
    window.dispatchEvent(new CustomEvent('notificationsRead'));
  };

  const simulateNewNotification = () => {
    // For testing purposes - simulate a new notification
    const newNotification = {
      id: Date.now().toString(),
      type: "request",
      icon: MessageCircle,
      title: "New pickup request",
      message: "Someone wants to pickup your latest food item",
      time: "Just now",
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    localStorage.setItem('hasUnreadNotifications', 'true');
    window.dispatchEvent(new CustomEvent('newNotification'));
  };

  const getIconColor = (type) => {
    switch (type) {
      case "request": return "text-blue-500";
      case "like": return "text-red-500";
      case "pickup": return "text-green-500";
      case "reminder": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Bell className="w-6 h-6 text-gray-900" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Mark All Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={simulateNewNotification}
              className="text-xs bg-blue-50 text-blue-600 border-blue-200"
            >
              + Test
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 pt-6 space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl p-4 ${
                !notification.isRead ? "border-l-4 border-green-500" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${getIconColor(notification.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                </div>
                {!notification.isRead && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsScreen;

