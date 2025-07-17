import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AddFoodScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    pickupTime: "",
    location: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Food Listed Successfully!",
      description: "Your food donation has been added to the listings.",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Add Food Donation</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-6 space-y-6">
        {/* Photo Upload */}
        <div className="bg-white rounded-2xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Add Photos
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Tap to add photos</p>
          </div>
        </div>

        {/* Food Details */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Fresh Vegetables, Cooked Rice"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the food condition, expiry, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-2 focus-green-500 focus-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <Input
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="e.g., 5kg, Serves 10 people"
              required
            />
          </div>
        </div>

        {/* Pickup Details */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Pickup Time
            </label>
            <Input
              type="datetime-local"
              value={formData.pickupTime}
              onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Pickup Location
            </label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter pickup address"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-lg font-bold bg-green-500 hover-green-600 text-white rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          List Food Donation
        </Button>
      </form>
    </div>
  );
};

export default AddFoodScreen;

