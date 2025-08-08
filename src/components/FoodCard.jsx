import { Calendar, MapPin, Clock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ id, name, image, availabilityDate, donor, location, isUserAdded = false }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="bg-white rounded-3xl shadow-card overflow-hidden touch-area cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-gray-100 group"
      onClick={() => navigate(`/food/${id}`)}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 flex gap-2">
          {isUserAdded && (
            <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <User className="w-3 h-3" />
              My Item
            </div>
          )}
          <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Available
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
            {name}
          </h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all duration-200 group-hover:bg-primary/5">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-primary" />
            </div>
            <span className="text-gray-700 font-medium">{availabilityDate}</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all duration-200 group-hover:bg-accent/5">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
            </div>
            <span className="font-semibold text-gray-900">{donor}</span>
          </div>
          
          {location && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all duration-200 group-hover:bg-blue-50">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <span className="text-gray-600">{location}</span>
            </div>
          )}
        </div>

        {/* Quick Action Button */}
        <div className="pt-2">
          <button 
            className="w-full py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/food/${id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
