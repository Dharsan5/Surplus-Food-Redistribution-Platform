# Surplus Food Redistribution Platform

A modern web application designed to reduce food waste by connecting food donors with those in need. Built with React and modern web technologies to provide an efficient platform for food redistribution in communities.

## 🌟 Features

### Core Functionality
- **Food Donation Listing**: Add food items with photos, descriptions, quantity, and pickup details
- **Food Discovery**: Browse available food items in an intuitive grid layout
- **Order Management**: Track food requests with status updates (pending, confirmed, completed, cancelled)
- **Photo Upload**: Support for both file uploads and URL-based image addition
- **Real-time Updates**: Live updates when food items are added or orders are placed

### User Experience
- **Modern Grid Layout**: Restaurant-app style food display with responsive cards
- **Smart Search**: Search across food items, donors, and locations
- **Contact Integration**: Direct calling functionality for donor-recipient communication
- **Responsive Design**: Optimized for desktop web usage with professional styling
- **Intuitive Navigation**: Clean bottom navigation with active state indicators

### Technical Features
- **Local Storage Persistence**: Client-side data storage for development
- **Custom Event System**: Real-time component communication
- **Form Validation**: Comprehensive input validation with user feedback
- **Error Handling**: Graceful image loading fallbacks and error states
- **Toast Notifications**: User-friendly success/error messaging

## 🚀 Tech Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dharsan5/Surplus-Food-Redistribution-Platform.git
   cd young-indian
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (buttons, inputs, etc.)
│   ├── BottomNavigation.jsx # Main navigation component
│   └── FoodCard.jsx        # Food item display component
├── pages/
│   ├── HomeScreen.jsx      # Main dashboard with food grid
│   ├── AddFoodScreen.jsx   # Food donation form
│   ├── OrdersScreen.jsx    # Order management interface
│   ├── ProfileScreen.jsx   # User profile and stats
│   └── ...                 # Additional screens
├── hooks/
│   └── use-toast.js        # Toast notification hook
├── lib/
│   └── utils.js            # Utility functions
└── assets/                 # Static assets
```

## 🎯 Key Pages

### Home Dashboard
- Grid layout displaying available food items
- Search and filter functionality
- Direct request/contact options
- Real-time updates when new items are added

### Food Donation Form
- Multi-step form with photo upload
- Support for both file uploads and image URLs
- Comprehensive food details (quantity, pickup time, location)
- Contact information collection

### Orders Management
- View all food requests and their status
- Contact donor functionality
- Order history with timestamps
- Status tracking (pending → confirmed → completed)

### Profile & Settings
- User statistics (requests made, completed, food saved)
- Account management options
- Notification preferences
- Help and support access

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 Future Enhancements

- **Backend Integration**: Replace localStorage with proper API endpoints
- **User Authentication**: Login/signup system with role-based access
- **Real-time Chat**: Direct messaging between donors and recipients
- **Location Services**: GPS-based distance calculation and mapping
- **Mobile App**: React Native version for mobile devices
- **Analytics Dashboard**: Admin panel with donation statistics
- **Notification System**: Email/SMS notifications for order updates

## 🌍 Impact

This platform aims to:
- **Reduce Food Waste**: Connect surplus food with those who need it
- **Build Community**: Foster connections between local food donors and recipients
- **Increase Accessibility**: Make food redistribution simple and efficient
- **Support Sustainability**: Promote environmentally conscious food practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed for hackathon/community impact project focusing on sustainable food redistribution solutions.

---

**Made with ❤️ for building stronger, more sustainable communities**
