import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Truck, Heart, Plus } from 'lucide-react';
import { mockRestaurants, mockMenuItems } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/types';

function MenuItemCard({ item, restaurant }: { item: MenuItem; restaurant: any }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { menuItem: item, restaurant }
    });
  };

  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            {item.popular && (
              <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Popular
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
          <p className="text-xl font-bold text-primary-500">${item.price.toFixed(2)}</p>
        </div>
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <button
            onClick={handleAddToCart}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-110"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFavorite, setIsFavorite] = useState(false);

  const restaurant = mockRestaurants.find(r => r.id === id);
  const menuItems = mockMenuItems[id as string] || [];

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
          >
            <Heart
              size={20}
              className={isFavorite ? "text-red-500 fill-current" : "text-gray-900"}
            />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Restaurant Info */}
        <div className="card p-6 -mt-8 relative z-10 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 mb-4">{restaurant.cuisine.join(' • ')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Star size={18} className="text-yellow-400 fill-current" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-gray-600">(150+ reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={18} className="text-gray-400" />
              <span className="text-gray-600">{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck size={18} className="text-gray-400" />
              <span className="text-gray-600">${restaurant.deliveryFee} delivery</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Minimum order: ${restaurant.minimumOrder} • {restaurant.distance} mi away
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex space-x-3 overflow-x-auto pb-2">
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

        {/* Menu Items */}
        <div className="pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'Menu' : selectedCategory}
          </h2>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No items found in this category</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}