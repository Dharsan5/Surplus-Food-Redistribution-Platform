import { useState } from 'react';
import { Clock, MapPin, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { mockOrders } from '@/data/mockData';

function CartItem({ item, onUpdateQuantity, onRemove }: any) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <img
        src={item.menuItem.image}
        alt={item.menuItem.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.menuItem.name}</h3>
        <p className="text-primary-500 font-semibold">${item.menuItem.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Minus size={16} className="text-primary-500" />
        </button>
        <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Plus size={16} className="text-primary-500" />
        </button>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

function OrderStatusCard({ order }: any) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-secondary-500';
      case 'ready': return 'bg-blue-500';
      case 'picked_up': return 'bg-purple-500';
      case 'delivered': return 'bg-success-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Preparing your order';
      case 'ready': return 'Ready for pickup';
      case 'picked_up': return 'On the way';
      case 'delivered': return 'Delivered';
      default: return 'Order placed';
    }
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{order.restaurant.name}</h3>
          <p className="text-gray-600 text-sm">
            {order.timestamp.toLocaleDateString()} at {order.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin size={16} />
          <span className="text-sm">{order.deliveryAddress}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock size={16} />
          <span className="text-sm">{order.estimatedDelivery}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</span>
        <button className="btn-primary text-sm py-2 px-4">
          Reorder
        </button>
      </div>
    </div>
  );
}

export default function Orders() {
  const { state, dispatch } = useCart();
  const [activeTab, setActiveTab] = useState<'cart' | 'active' | 'past'>('cart');

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here');
  };

  const activeOrders = mockOrders.filter(order => 
    ['placed', 'preparing', 'ready', 'picked_up'].includes(order.status)
  );
  
  const pastOrders = mockOrders.filter(order => 
    order.status === 'delivered'
  );

  const tabs = [
    { id: 'cart', label: `Cart (${state.itemCount})` },
    { id: 'active', label: `Active (${activeOrders.length})` },
    { id: 'past', label: 'Past' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-primary-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div className="space-y-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add items from a restaurant to get started</p>
                <button className="btn-primary">Browse Restaurants</button>
              </div>
            ) : (
              <>
                {state.restaurant && (
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">{state.restaurant.name}</h2>
                    <button
                      onClick={handleClearCart}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Clear cart
                    </button>
                  </div>
                )}
                
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                <div className="card p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${state.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-semibold">
                        ${state.restaurant?.deliveryFee.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">
                        ${(state.totalAmount * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-primary-500">
                          ${(state.totalAmount + (state.restaurant?.deliveryFee || 0) + state.totalAmount * 0.08).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full btn-primary mt-6"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Active Orders Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <Clock size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No active orders</h3>
                <p className="text-gray-600">Your active orders will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <OrderStatusCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Past Orders Tab */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastOrders.map((order) => (
              <OrderStatusCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}