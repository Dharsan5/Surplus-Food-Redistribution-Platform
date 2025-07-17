import { useState } from "react";
import { Search, Filter, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

const ListingsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const foodListings = [
    {
      id: "1",
      name: "Fresh Vegetables",
      image: "/placeholder.svg",
      donor: "City Market",
      availabilityDate: "Today, 6 PM",
      location: "Downtown Market",
      distance: "0.5 km",
      category: "Fresh"
    },
    {
      id: "2",
      name: "Bread & Pastries",
      image: "/placeholder.svg",
      donor: "Corner Bakery",
      availabilityDate: "Tomorrow, 8 AM",
      location: "Main Street",
      distance: "1.2 km",
      category: "Baked"
    },
    {
      id: "3",
      name: "Cooked Meals",
      image: "/placeholder.svg",
      donor: "College Canteen",
      availabilityDate: "Today, 7 PM",
      location: "University Campus",
      distance: "2.1 km",
      category: "Cooked"
    },
  ];

  const filters = ["All", "Fresh", "Cooked", "Baked", "Nearby"];

  const filteredListings = foodListings.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.donor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || food.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Listings</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food items..."
            className="pl-11 pr-12 h-12 rounded-xl border-gray-200"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={filter === activeFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="whitespace-nowrap rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="px-6 pt-6 space-y-4">
        {filteredListings.map((food) => (
          <div key={food.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex gap-4">
              <img
                src={food.image}
                alt={food.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{food.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{food.donor}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{food.availabilityDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{food.distance}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => navigate(`/food/${food.id}`)}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ListingsScreen;

