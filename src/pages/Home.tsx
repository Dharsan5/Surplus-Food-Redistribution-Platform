import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Truck, Search } from 'lucide-react';
import { mockRestaurants } from '@/data/mockData';
import { Restaurant } from '@/types';

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {restaurant.promoted && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Promoted
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine.join(' • ')}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span>{restaurant.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck size={14} />
            <span>${restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Pizza', 'Sushi', 'Burgers', 'Thai', 'Italian', 'Indian'];

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || 
                           restaurant.cuisine.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const promotedRestaurants = mockRestaurants.filter(r => r.promoted);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Delicious food, delivered fast
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
              Order from your favorite restaurants and get it delivered in minutes
            </p>
            
            {/* Location Display */}
            <div className="flex items-center justify-center space-x-2 mb-8 animate-slide-up">
              <MapPin size={20} />
              <span className="text-lg">Delivering to 123 Main Street, New York</span>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-bounce-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Restaurants */}
        {!searchQuery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Restaurants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotedRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </section>
        )}

        {/* All Restaurants */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
          </h2>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
              <p className="text-gray-600">Try searching for a different cuisine or restaurant name</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}