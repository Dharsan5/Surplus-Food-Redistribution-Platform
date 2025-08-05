import { Plus, Search, Bell, Filter, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FoodCard from "@/components/FoodCard";
import BottomNavigation from "@/components/BottomNavigation";
import './HomeScreen.css';

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
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="header-top">
          <div className="welcome-section">
            <h1 className="welcome-title">{getGreeting()}</h1>
            <p className="welcome-subtitle">Let's help reduce food waste today</p>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={handleNotificationClick}
              className="notification-button"
            >
              <Bell className="notification-icon" />
              {showNotification && (
                <div style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', width: '0.75rem', height: '0.75rem', backgroundColor: '#ef4444', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search food or donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={() => navigate("/add-food")}
            className="add-food-button"
          >
            <Plus className="add-icon" />
            Add Food Donation
          </button>
          
          <button className="filter-button">
            <Filter className="filter-icon" />
          </button>
        </div>
      </div>

      {/* Food Listings Section */}
      <div className="main-content">
        {filteredListings.length === 0 ? (
          <div className="no-food-message">
            <div className="no-food-icon">🍽️</div>
            <h3 className="no-food-title">No Food Available</h3>
            <p className="no-food-subtitle">Be the first to add a food donation!</p>
          </div>
        ) : (
          <div className="food-grid">
            {filteredListings.map((food) => (
              <div key={food.id} className="food-card" onClick={() => navigate(`/food/${food.id}`)}>
                <img
                  src={food.image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={food.name}
                  className="food-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <div className="food-content">
                  <div className="food-header">
                    <div className="food-info">
                      <h3 className="food-title">{food.name}</h3>
                      <p className="food-donor">by {food.donor}</p>
                    </div>
                  </div>
                  
                  <div className="food-meta">
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      <span>{food.availabilityDate}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin className="meta-icon" />
                      <span>{food.location}</span>
                    </div>
                  </div>
                  
                  <div className="food-actions-bottom">
                    <span className="food-quantity">{food.quantity || 'Available'}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add request functionality
                      }}
                      className="request-button"
                    >
                      Request
                    </button>
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

