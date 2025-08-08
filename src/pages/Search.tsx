import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, Star, Clock, Truck } from 'lucide-react';
import { mockRestaurants } from '@/data/mockData';
import { Restaurant } from '@/types';

function SearchResultCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="flex bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-24 h-24 object-cover"
      />
      <div className="flex-1 p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine.join(' • ')}</p>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span>{restaurant.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck size={12} />
            <span>${restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const recentSearches = ['Pizza', 'Sushi', 'Thai food', 'Burgers'];
  const popularSearches = ['Pizza near me', 'Chinese delivery', 'Healthy options', 'Fast food'];

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    if (!searchQuery) return false;
    
    return restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleFilterToggle = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-16 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {!searchQuery ? (
          <div className="space-y-8">
            {/* Recent Searches */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Searches</h2>
              <div className="space-y-3">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="flex items-center space-x-3 w-full p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <SearchIcon size={16} className="text-gray-400" />
                    <span className="text-gray-900">{search}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Searches */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Searches</h2>
              <div className="space-y-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="flex items-center space-x-3 w-full p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <SearchIcon size={16} className="text-gray-400" />
                    <span className="text-gray-900">{search}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {['Price: Low to High', 'Rating: 4+', 'Fast Delivery', 'Free Delivery'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterToggle(filter)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    activeFilters.includes(filter)
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Results */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {filteredRestaurants.length} results for "{searchQuery}"
              </h2>
              
              {filteredRestaurants.length === 0 ? (
                <div className="text-center py-12">
                  <SearchIcon size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No restaurants found</h3>
                  <p className="text-gray-600">Try searching for a different cuisine or restaurant name</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRestaurants.map((restaurant) => (
                    <SearchResultCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}