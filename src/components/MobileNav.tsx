import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function MobileNav() {
  const location = useLocation();
  const { state } = useCart();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center py-2 px-3 relative ${
              location.pathname === path
                ? 'text-primary-500'
                : 'text-gray-400'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1 font-medium">{label}</span>
            {path === '/orders' && state.itemCount > 0 && (
              <span className="absolute -top-1 right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.itemCount > 9 ? '9+' : state.itemCount}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}