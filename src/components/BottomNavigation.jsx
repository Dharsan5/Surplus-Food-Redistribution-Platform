import { Home, Package, FileText, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import './BottomNavigation.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Package, label: "Orders", path: "/orders" },
    { icon: FileText, label: "Requests", path: "/requests" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span className={`nav-label ${isActive ? 'active' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
