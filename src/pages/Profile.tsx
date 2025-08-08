import { User, MapPin, CreditCard, Bell, HelpCircle, Star, Gift, Settings, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function ProfileMenuItem({ icon: Icon, title, subtitle, onClick, showChevron = true }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
          <Icon size={20} className="text-primary-500" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      {showChevron && <ChevronRight size={20} className="text-gray-400" />}
    </button>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to FoodDelivery</h2>
          <p className="text-gray-600 mb-6">Sign in to access your profile and orders</p>
          <button className="btn-primary">Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
            <button className="btn-secondary">Edit</button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">47</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">$247</div>
            <div className="text-sm text-gray-600">Saved</div>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
            <div className="card overflow-hidden">
              <ProfileMenuItem
                icon={MapPin}
                title="Addresses"
                subtitle="Manage your delivery addresses"
                onClick={() => console.log('Addresses')}
              />
              <ProfileMenuItem
                icon={CreditCard}
                title="Payment Methods"
                subtitle="Manage cards and payment options"
                onClick={() => console.log('Payment Methods')}
              />
              <ProfileMenuItem
                icon={Bell}
                title="Notifications"
                subtitle="Manage your notification preferences"
                onClick={() => console.log('Notifications')}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">More</h2>
            <div className="card overflow-hidden">
              <ProfileMenuItem
                icon={Gift}
                title="Promotions"
                subtitle="View available offers and discounts"
                onClick={() => console.log('Promotions')}
              />
              <ProfileMenuItem
                icon={Star}
                title="Rate the App"
                subtitle="Help us improve by rating the app"
                onClick={() => console.log('Rate App')}
              />
              <ProfileMenuItem
                icon={HelpCircle}
                title="Help & Support"
                subtitle="Get help or contact customer service"
                onClick={() => console.log('Help')}
              />
              <ProfileMenuItem
                icon={Settings}
                title="Settings"
                subtitle="App preferences and privacy settings"
                onClick={() => console.log('Settings')}
              />
            </div>
          </section>

          <section>
            <div className="card overflow-hidden">
              <ProfileMenuItem
                icon={LogOut}
                title="Sign Out"
                onClick={handleLogout}
                showChevron={false}
              />
            </div>
          </section>
        </div>

        <div className="text-center py-8 text-gray-500 text-sm">
          <p>Version 1.0.0</p>
          <p>© 2024 FoodDelivery App</p>
        </div>
      </div>
    </div>
  );
}