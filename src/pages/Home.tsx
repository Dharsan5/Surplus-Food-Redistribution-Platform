import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Clock, User, Search, Plus } from 'lucide-react';
import { mockRestaurants } from '@/data/mockData';
import { Restaurant } from '@/types';

function FoodDonationCard({ donation }: { donation: Restaurant }) {
  // Transform restaurant data to donation context
  const donorName = donation.name.replace('Restaurant', 'Foundation').replace('Palace', 'Community Center');
  const foodType = donation.cuisine.join(' • ');
  
  return (
    <Link
      to={`/restaurant/${donation.id}`}
      className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in border-l-4 border-green-500"
    >
      <div className="relative">
        <img
          src={donation.image}
          alt={`Food donation from ${donorName}`}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {donation.promoted && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Urgent
          </div>
        )}
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
          Available
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Fresh {foodType}</h3>
        <p className="text-gray-600 text-sm mb-3">Donated by {donorName}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Heart size={14} className="text-red-400 fill-current" />
            <span>{donation.rating} donors</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>Available until {donation.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{donation.minimumOrder}+ servings</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-green-600 font-medium text-sm">Free pickup</span>
          <span className="text-gray-500 text-xs">{donation.distance} km away</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Vegetables', 'Fruits', 'Bread', 'Prepared Meals', 'Dairy', 'Canned Goods'];

  const filteredDonations = mockRestaurants.filter(donation => {
    const donorName = donation.name.replace('Restaurant', 'Foundation').replace('Palace', 'Community Center');
    const foodType = donation.cuisine.join(' ');
    
    const matchesSearch = donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         foodType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           donation.cuisine.some(c => {
                             if (selectedCategory === 'Vegetables') return c.includes('Italian') || c.includes('Thai');
                             if (selectedCategory === 'Fruits') return c.includes('Japanese');
                             if (selectedCategory === 'Bread') return c.includes('Pizza');
                             if (selectedCategory === 'Prepared Meals') return c.includes('Indian') || c.includes('Burgers');
                             return true;
                           });
    return matchesSearch && matchesCategory;
  });

  const urgentDonations = mockRestaurants.filter(r => r.promoted);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Help reduce food waste
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
              Connect surplus food with those who need it in your community
            </p>
            
            {/* Donate Food CTA */}
            <div className="mb-8">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center mx-auto gap-2">
                <Plus size={24} />
                Donate Surplus Food
              </button>
            </div>
            
            {/* Location Display */}
            <div className="flex items-center justify-center space-x-2 mb-8 animate-slide-up">
              <MapPin size={20} />
              <span className="text-lg">Serving community in New York</span>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-bounce-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for food donations, donors, or food types..."
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
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-green-50 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">1,240</div>
            <div className="text-gray-600">Meals donated this month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">89</div>
            <div className="text-gray-600">Active donors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">450</div>
            <div className="text-gray-600">Families helped</div>
          </div>
        </div>

        {/* Urgent Donations */}
        {!searchQuery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Heart className="text-red-500" size={24} />
              Urgent Food Donations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {urgentDonations.map((donation) => (
                <FoodDonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </section>
        )}

        {/* All Donations */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Available Food Donations'}
          </h2>
          
          {filteredDonations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No donations found</h3>
              <p className="text-gray-600">Try searching for a different food type or donor name</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDonations.map((donation) => (
                <FoodDonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}