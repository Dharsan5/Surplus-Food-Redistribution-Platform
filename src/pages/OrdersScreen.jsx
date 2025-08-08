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
    <div className="orders-container">
      {/* Header */}
      <div className="orders-header">
        <h1 className="orders-title">My Orders</h1>
        
        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders..."
            className="search-input"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-content">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <Package className="no-orders-icon" />
            <h3 className="no-orders-title">No Orders Found</h3>
            <p className="no-orders-subtitle">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/home')}
              className="browse-button"
            >
              Browse Food Items
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              {/* Order Header */}
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-title">{order.foodItemName}</h3>
                  <p className="order-donor">from {order.donor}</p>
                </div>
                <span className={`order-status status-${order.status}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Food Image */}
              <div className="order-body">
                <img
                  src={order.image}
                  alt={order.foodItemName}
                  className="order-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                  }}
                />
                <div className="order-details">
                  <div className="detail-item">
                    <Package className="detail-icon" />
                    <span>{order.quantity}</span>
                  </div>
                  <div className="detail-item">
                    <Clock className="detail-icon" />
                    <span>{order.pickupTime}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin className="detail-icon" />
                    <span>{order.pickupLocation}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="order-footer">
                <div className="contact-info">
                  <User className="contact-icon" />
                  <span>{order.contactPerson}</span>
                </div>
                <button
                  onClick={() => handleCallDonor(order.phone)}
                  className="call-button"
                >
                  <Phone className="call-icon" />
                  Call
                </button>
              </div>

              {/* Order Date */}
              <div className="order-date">
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
