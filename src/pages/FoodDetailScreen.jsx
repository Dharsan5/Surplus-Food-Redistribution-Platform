import { ArrowLeft, Calendar, MapPin, Clock, Heart, Share2, Phone, Trash2, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock data - in real app, this would fetch from API
const mockFoodData = {
  "1": {
    id: "1",
    name: "Fresh Vegetables",
    image: "https://wallpapers.com/images/hd/vegetables-pictures-qs8trfk65nvldcyr.jpg",
    availability: "Today, 2 PM - 5 PM",
    donor: "City Bakery",
    location: "123 Main Street, Downtown",
    description: "Fresh mixed vegetables including carrots, spinach, tomatoes, and bell peppers. Perfect for community kitchens and NGOs.",
    quantity: "Approximately 15-20 kg",
    contactPerson: "Manager - City Bakery",
    phone: "+91 98765 43210",
    distance: "2.5 km away"
  },
  "2": {
    id: "2",
    name: "Bread & Pastries",
    image: "https://c4.wallpaperflare.com/wallpaper/294/670/477/baked-goods-pastry-bakery-breakfast-wallpaper-preview.jpg",
    availability: "Tomorrow, 10 AM",
    donor: "Corner Cafe",
    location: "123 Main Street",
    description: "Freshly baked bread and pastries including croissants, baguettes, and muffins. Perfect for breakfast or snacks.",
    quantity: "Approximately 15 kg",
    contactPerson: "Manager - Corner Cafe",
    phone: "+91 98765 25689",
    distance: "1.5 km away"
  },
  "3": {
    id: "3",
    name: "Cooked Meals",
    image: "https://sherohomefood.in/wp-content/uploads/2024/06/Blog_1.jpg",
    availability: "Today, 6 PM",
    donor: "Restaurant Plaza",
    location: "Food Court",
    description: "Freshly cooked meals including rice, dal, vegetables, and chapati. Perfect for immediate distribution to those in need.",
    quantity: "Approximately 30 portions",
    contactPerson: "Manager - Restaurant Plaza",
    phone: "+91 98765 45628",
    distance: "3.5 km away"
  }
};

const FoodDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [foodDetails, setFoodDetails] = useState(null);
  const [isUserAddedItem, setIsUserAddedItem] = useState(false);

  useEffect(() => {
    // First check user-added items
    const userItems = JSON.parse(localStorage.getItem('userFoodItems') || '[]');
    console.log('User items from localStorage:', userItems);
    console.log('Looking for ID:', id);
    
    const userItem = userItems.find(item => item.id === id);
    console.log('Found user item:', userItem);
    
    if (userItem) {
      setFoodDetails(userItem);
      setIsUserAddedItem(true);
    } else {
      // Fall back to mock data
      const mockItem = mockFoodData[id];
      console.log('Using mock data:', mockItem);
      setFoodDetails(mockItem || null);
      setIsUserAddedItem(false);
    }
  }, [id]);

  const handleRequest = async () => {
    setIsRequesting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Pickup request submitted successfully! The donor will be notified.');
      // In a real app, you might navigate to a confirmation screen or back to listings
      navigate('/home');
    } catch (error) {
      alert('Failed to submit pickup request. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCallDonor = () => {
    // Open phone dialer with the donor's phone number
    window.open(`tel:${foodDetails.phone}`, '_self');
  };

  const handleDirections = () => {
    // Open Google Maps with the pickup location
    const encodedLocation = encodeURIComponent(foodDetails.location);
    const mapsUrl = `https://www.google.com/maps/search/${encodedLocation}`;
    window.open(mapsUrl, '_blank');
  };

  const handleDeleteItem = () => {
    if (!isUserAddedItem) return;
    
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this food item? This action cannot be undone.'
    );
    
    if (confirmDelete) {
      // Remove from localStorage
      const userItems = JSON.parse(localStorage.getItem('userFoodItems') || '[]');
      const updatedItems = userItems.filter(item => item.id !== id);
      localStorage.setItem('userFoodItems', JSON.stringify(updatedItems));
      
      // Trigger custom event to notify other components
      window.dispatchEvent(new CustomEvent('foodItemDeleted', { detail: { id } }));
      
      console.log('Food item deleted:', id);
      
      // Navigate back to home
      navigate('/home');
    }
  };

  const handleEditItem = () => {
    if (!isUserAddedItem) return;
    
    // Navigate to edit screen with the item ID
    navigate(`/edit-food/${id}`);
  };

  // Handle case when food item is not found or still loading
  if (!foodDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600 mb-4">Please wait while we load the food details.</p>
          <Button onClick={() => navigate('/home')} className="bg-accent text-white mt-4">
            Go Back to Home
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Floating Action Buttons */}
      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 z-20 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all duration-200 hover-105 active-95"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="absolute top-6 right-4 z-20 flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all duration-300 hover-105 active-95 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/95 backdrop-blur-md text-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-current scale-110' : ''}`} />
          </button>
          
          <button className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all duration-200 hover-105 active-95">
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        {/* Food Image with Gradient Overlay */}
        <div className="w-full h-80 overflow-hidden relative">
          <img 
            src={foodDetails.image} 
            alt={foodDetails.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content with Card Layout */}
      <div className="relative -mt-6 bg-white rounded-t-3xl shadow-xl">
        <div className="px-6 pt-8 pb-6 space-y-6">
          {/* Title Section */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{foodDetails.name}</h1>
              <div className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1.5 rounded-full">
                Available
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{foodDetails.description}</p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
              <p className="text-sm font-medium text-primary mb-1">Quantity</p>
              <p className="text-gray-900 font-semibold">{foodDetails.quantity}</p>
            </div>
            <div className="bg-accent/5 rounded-2xl p-4 border border-accent/10">
              <p className="text-sm font-medium text-accent mb-1">Distance</p>
              <p className="text-gray-900 font-semibold">{foodDetails.distance}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-5">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl transition-all duration-200 hover-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Pickup Time</p>
                <p className="text-gray-600">{foodDetails.availability}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl transition-all duration-200 hover-gray-100">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Donor</p>
                <p className="text-gray-600">{foodDetails.donor}</p>
                <p className="text-sm text-gray-500 mt-1">{foodDetails.contactPerson}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl transition-all duration-200 hover-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Pickup Location</p>
                <p className="text-gray-600">{foodDetails.location}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <div className="flex gap-3">
              <button 
                onClick={handleCallDonor}
                className="flex-1 h-14 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 touch-area"
              >
                <Phone className="w-5 h-5" />
                Call Donor
              </button>
              <button 
                onClick={handleDirections}
                className="flex-1 h-14 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 touch-area"
              >
                <MapPin className="w-5 h-5" />
                Directions
              </button>
            </div>
            
            <Button 
              onClick={handleRequest}
              disabled={isRequesting}
              className="w-full h-16 text-lg font-bold bg-accent hover:bg-accent/90 text-white rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRequesting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Request...
                </div>
              ) : (
                "Request Pickup"
              )}
            </Button>

            {/* Edit and Delete Buttons - Only show for user-added items */}
            {isUserAddedItem && (
              <div className="flex gap-3">
                <Button 
                  onClick={handleEditItem}
                  variant="outline"
                  className="flex-1 h-16 text-lg font-bold border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Item
                </Button>
                
                <Button 
                  onClick={handleDeleteItem}
                  variant="outline"
                  className="flex-1 h-16 text-lg font-bold border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Item
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailScreen;

