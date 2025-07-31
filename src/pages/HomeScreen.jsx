import { Plus, Search, Bell, Filter, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FoodCard from "@/components/FoodCard";
import BottomNavigation from "@/components/BottomNavigation";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const [userFoodItems, setUserFoodItems] = useState([]);

  // Get dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Good Morning! ☀️";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon! 🌤️";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening! 🌅";
    } else {
      return "Good Night! 🌙";
    }
  };

  // Check notification status from localStorage
  useEffect(() => {
    const notificationStatus = localStorage.getItem('hasUnreadNotifications');
    setShowNotification(notificationStatus === 'true');
  }, []);

  const handleNotificationClick = () => {
    // Mark notifications as read
    setShowNotification(false);
    localStorage.setItem('hasUnreadNotifications', 'false');
    navigate("/notifications");
  };

  // Load user-added food items from localStorage
  useEffect(() => {
    const loadUserFoodItems = () => {
      const savedItems = JSON.parse(localStorage.getItem('userFoodItems') || '[]');
      console.log('Loading user food items:', savedItems);
      setUserFoodItems(savedItems);
    };

    loadUserFoodItems();
    
    // Listen for storage changes to update when new items are added
    const handleStorageChange = () => {
      loadUserFoodItems();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check when the window gains focus (for same-tab updates)
    window.addEventListener('focus', loadUserFoodItems);
    
    // Listen for custom event when items are added
    const handleItemAdded = () => {
      loadUserFoodItems();
    };
    
    // Listen for custom event when items are deleted
    const handleItemDeleted = () => {
      loadUserFoodItems();
    };
    
    // Listen for custom event when items are updated
    const handleItemUpdated = () => {
      loadUserFoodItems();
    };
    
    // Listen for notification events
    const handleNotificationsRead = () => {
      setShowNotification(false);
    };
    
    const handleNewNotification = () => {
      setShowNotification(true);
    };
    
    window.addEventListener('foodItemAdded', handleItemAdded);
    window.addEventListener('foodItemDeleted', handleItemDeleted);
    window.addEventListener('foodItemUpdated', handleItemUpdated);
    window.addEventListener('notificationsRead', handleNotificationsRead);
    window.addEventListener('newNotification', handleNewNotification);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadUserFoodItems);
      window.removeEventListener('foodItemAdded', handleItemAdded);
      window.removeEventListener('foodItemDeleted', handleItemDeleted);
      window.removeEventListener('foodItemUpdated', handleItemUpdated);
      window.removeEventListener('notificationsRead', handleNotificationsRead);
      window.removeEventListener('newNotification', handleNewNotification);
    };
  }, []);

  // Static food listings
  const staticFoodListings = [
    {
      id: "1",
      name: "Fresh Vegetables",
      image: "https://wallpapers.com/images/hd/vegetables-pictures-qs8trfk65nvldcyr.jpg",
      availabilityDate: "Today, 2 PM",
      donor: "City Bakery",
      location: "Downtown",
      category: "Fresh"
    },
    {
      id: "2", 
      name: "Bread & Pastries",
      image: "https://c4.wallpaperflare.com/wallpaper/294/670/477/baked-goods-pastry-bakery-breakfast-wallpaper-preview.jpg",
      availabilityDate: "Tomorrow, 10 AM",
      donor: "Corner Cafe",
      location: "Main Street",
      category: "Baked"
    },
    {
      id: "3",
      name: "Cooked Meals",
      image: "https://sherohomefood.in/wp-content/uploads/2024/06/Blog_1.jpg",      
      availabilityDate: "Today, 6 PM",
      donor: "Restaurant Plaza",
      location: "Food Court",
      category: "Cooked"
    }
  ];

  // Combine static and user-added food listings
  const allFoodListings = [
    ...userFoodItems.map(item => ({
      ...item,
      availabilityDate: new Date(item.availability).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      isUserAdded: true
    })),
    ...staticFoodListings.map(item => ({
      ...item,
      isUserAdded: false
    }))
  ];

  const filteredListings = allFoodListings.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.donor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">{getGreeting()}</h1>
            <p className="text-sm text-gray-600">Let's help reduce food waste today</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-gray-200 active:scale-95"
            >
              <Bell className="w-4 h-4 text-gray-600" />
              {showNotification && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search food or donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-gray-100 rounded-lg pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200"
          />
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={() => navigate("/add-food")}
          className="w-full h-10 text-sm font-medium bg-gradient-to-r from-accent to-accent/80 hover:bg-accent/90 text-white rounded-lg touch-area transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          <Plus className="mr-2 w-4 h-4" />
          List Surplus Food
        </Button>
      </div>

      {/* Food Listings Section */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Available Food</h2>
          <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
            {filteredListings.length} items
          </div>
        </div>
        
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No food items found</p>
            <p className="text-gray-400">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {filteredListings.map((food) => (
              <div
                key={food.id}
                onClick={() => navigate(`/food/${food.id}`)}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Food Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={food.image || "https://via.placeholder.com/150x150?text=No+Image"}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150x150?text=No+Image";
                    }}
                  />
                  
                  {/* Status Badges */}
                  <div className="absolute top-1 left-1">
                    {food.isUserAdded && (
                      <span className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded font-medium">
                        Mine
                      </span>
                    )}
                  </div>
                  
                  {/* Availability Badge */}
                  <div className="absolute top-1 right-1">
                    <span className="bg-green-500 text-white text-xs px-1 py-0.5 rounded font-medium">
                      •
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-2">
                  {/* Food Name */}
                  <h3 className="font-medium text-gray-900 text-xs mb-1 truncate">
                    {food.name}
                  </h3>
                  
                  {/* Donor */}
                  <p className="text-xs text-gray-600 truncate mb-1">
                    {food.donor}
                  </p>

                  {/* Timing */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate text-xs">{food.availabilityDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;

