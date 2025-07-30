import { Plus, Search, Bell, Filter } from "lucide-react";
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
    
    window.addEventListener('foodItemAdded', handleItemAdded);
    window.addEventListener('foodItemDeleted', handleItemDeleted);
    window.addEventListener('foodItemUpdated', handleItemUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadUserFoodItems);
      window.removeEventListener('foodItemAdded', handleItemAdded);
      window.removeEventListener('foodItemDeleted', handleItemDeleted);
      window.removeEventListener('foodItemUpdated', handleItemUpdated);
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
      location: "Downtown"
    },
    {
      id: "2", 
      name: "Bread & Pastries",
      image: "https://c4.wallpaperflare.com/wallpaper/294/670/477/baked-goods-pastry-bakery-breakfast-wallpaper-preview.jpg",
      availabilityDate: "Tomorrow, 10 AM",
      donor: "Corner Cafe",
      location: "Main Street"
    },
    {
      id: "3",
      name: "Cooked Meals",
      image: "https://sherohomefood.in/wp-content/uploads/2024/06/Blog_1.jpg",      
      availabilityDate: "Today, 6 PM",
      donor: "Restaurant Plaza",
      location: "Food Court"
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{getGreeting()}</h1>
            <p className="text-gray-600">Let's help reduce food waste today</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => navigate("/notifications")}
              className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center transition-all duration-200 hover:bg-gray-200 active:scale-95"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {showNotification && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search food or donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-gray-100 rounded-2xl pl-12 pr-16 text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200"
          />
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={() => navigate("/add-food")}
          className="w-full h-16 text-lg font-bold bg-gradient-to-r from-accent to-accent/80 hover:bg-accent/90 text-white rounded-2xl touch-area transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          <Plus className="mr-3 w-6 h-6" />
          List Surplus Food
        </Button>
      </div>

      {/* Food Listings Section */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Food</h2>
          <div className="bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full">
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
          <div className="space-y-6">
            {filteredListings.map((food) => (
              <FoodCard key={food.id} {...food} />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;

