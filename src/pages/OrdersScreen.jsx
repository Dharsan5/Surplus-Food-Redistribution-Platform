import { useState, useEffect } from "react";
import { Search, Package, Clock, MapPin, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import './OrdersScreen.css';

const OrdersScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Load orders on component mount
  useEffect(() => {
    const loadOrders = () => {
      // Get orders from localStorage (in a real app, this would come from an API)
      const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      
      // Sample orders data (you can remove this once real orders are created)
      const sampleOrders = [
        {
          id: "ord_001",
          foodItemName: "Fresh Vegetables",
          donor: "City Bakery",
          status: "pending", // pending, confirmed, completed, cancelled
          orderDate: new Date().toISOString(),
          pickupTime: "Today, 2:00 PM",
          pickupLocation: "Downtown Market",
          contactPerson: "John Smith",
          phone: "+91 98765 43210",
          quantity: "5 kg",
          image: "https://wallpapers.com/images/hd/vegetables-pictures-qs8trfk65nvldcyr.jpg"
        },
        {
          id: "ord_002",
          foodItemName: "Cooked Meals",
          donor: "Restaurant Plaza",
          status: "confirmed",
          orderDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          pickupTime: "Tomorrow, 6:00 PM",
          pickupLocation: "Food Court, Mall Road",
          contactPerson: "Sarah Johnson",
          phone: "+91 98765 54321",
          quantity: "10 portions",
          image: "https://sherohomefood.in/wp-content/uploads/2024/06/Blog_1.jpg"
        }
      ];

      setOrders([...userOrders, ...sampleOrders]);
    };

    loadOrders();

    // Listen for custom events when orders are added/updated
    const handleOrdersChange = () => {
      loadOrders();
    };

    window.addEventListener('orderCreated', handleOrdersChange);
    window.addEventListener('orderUpdated', handleOrdersChange);

    return () => {
      window.removeEventListener('orderCreated', handleOrdersChange);
      window.removeEventListener('orderUpdated', handleOrdersChange);
    };
  }, []);

  const filteredOrders = orders.filter(order =>
    order.foodItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleCallDonor = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-3">My Orders</h1>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders..."
            className="pl-10 h-9 rounded-lg border-gray-200"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 pt-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No Orders Found</h3>
            <p className="text-sm">You haven't placed any orders yet.</p>
            <Button
              onClick={() => navigate('/home')}
              className="mt-3 bg-orange-500 hover:bg-orange-600 h-9 px-4"
            >
              Browse Food Items
            </Button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">{order.foodItemName}</h3>
                  <p className="text-sm text-gray-600">from {order.donor}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Food Image */}
              <div className="flex gap-3 mb-3">
                <img
                  src={order.image}
                  alt={order.foodItemName}
                  className="w-16 h-16 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                  }}
                />
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{order.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{order.pickupTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{order.pickupLocation}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{order.contactPerson}</span>
                </div>
                <Button
                  onClick={() => handleCallDonor(order.phone)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 h-8 px-3 text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </Button>
              </div>

              {/* Order Date */}
              <div className="mt-2 text-xs text-gray-400">
                Ordered on {new Date(order.orderDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default OrdersScreen;
