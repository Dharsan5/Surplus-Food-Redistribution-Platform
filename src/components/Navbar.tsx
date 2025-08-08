import { Link, useLocation } from 'react-router-dom';
import { MapPin, Search, ShoppingBag, User, Home } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const location = useLocation();
  const { state } = useCart();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FD</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FoodDelivery</span>
          </Link>

          {/* Location */}
          <div className="hidden lg:flex items-center space-x-2 text-gray-600">
            <MapPin size={16} className="text-primary-500" />
            <span className="text-sm">123 Main Street, New York</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              <Home size={20} />
              <span className="hidden sm:block">Home</span>
            </Link>

            <Link
              to="/search"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/search' 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              <Search size={20} />
              <span className="hidden sm:block">Search</span>
            </Link>

            <Link
              to="/orders"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors relative ${
                location.pathname === '/orders' 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              <ShoppingBag size={20} />
              <span className="hidden sm:block">Orders</span>
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount > 9 ? '9+' : state.itemCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/profile' 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              <User size={20} />
              <span className="hidden sm:block">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}