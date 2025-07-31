import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AddFoodScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState([]);
  const [photoInputMode, setPhotoInputMode] = useState('upload'); // 'upload' or 'url'
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    pickupTime: "",
    location: "",
    donor: "",
    contactPerson: "",
    phone: ""
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleImageUrlAdd = () => {
    if (imageUrl.trim()) {
      const newImage = {
        id: Date.now() + Math.random(),
        isUrl: true,
        preview: imageUrl.trim(),
        url: imageUrl.trim()
      };
      setSelectedImages(prev => [...prev, newImage]);
      setImageUrl(''); // Clear the input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.quantity || 
        !formData.pickupTime || !formData.location || !formData.donor || !formData.contactPerson || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new food item
    const newFoodItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      quantity: formData.quantity,
      availability: formData.pickupTime,
      location: formData.location,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      donor: formData.donor, 
      distance: "0.5 km away", // Default distance
      images: selectedImages.map(img => img.isUrl ? img.url : img.preview),
      image: selectedImages.length > 0 ? (selectedImages[0].isUrl ? selectedImages[0].url : selectedImages[0].preview) : "https://via.placeholder.com/400x300?text=No+Image"
    };

    // Store in localStorage (in a real app, this would be sent to a server)
    const existingItems = JSON.parse(localStorage.getItem('userFoodItems') || '[]');
    existingItems.push(newFoodItem);
    localStorage.setItem('userFoodItems', JSON.stringify(existingItems));

    // Trigger custom event to notify other components
    window.dispatchEvent(new CustomEvent('foodItemAdded', { detail: newFoodItem }));

    console.log('New food item added:', newFoodItem);
    console.log('All items in storage:', existingItems);

    toast({
      title: "Food Listed Successfully!",
      description: "Your food donation has been added successfully and is now available for others to request.",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full h-8 w-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Add Food Donation</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 pt-4 space-y-4">
        {/* Photo Upload */}
        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photos
          </label>
          
          {/* Photo Upload Area */}
          <div className="space-y-3">
            {/* Toggle between upload and URL */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={photoInputMode === 'upload' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPhotoInputMode('upload')}
                className="flex-1 h-8 text-xs"
              >
                Upload Image
              </Button>
              <Button
                type="button"
                variant={photoInputMode === 'url' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPhotoInputMode('url')}
                className="flex-1 h-8 text-xs"
              >
                Image URL
              </Button>
            </div>

            {photoInputMode === 'upload' ? (
              <>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                
                <label
                  htmlFor="photo-upload"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors block"
                >
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Tap to upload photos</p>
                  <p className="text-xs text-gray-400 mt-1">You can select multiple images</p>
                </label>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    className="flex-1 h-9"
                  />
                  <Button
                    type="button"
                    onClick={handleImageUrlAdd}
                    disabled={!imageUrl.trim()}
                    size="sm"
                    className="h-9"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Paste an image URL to add it to your food listing</p>
              </div>
            )}

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {selectedImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt="Selected"
                      className="w-full h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/64x64?text=Failed+to+Load";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {image.isUrl && (
                      <div className="absolute bottom-0.5 left-0.5 bg-blue-500 text-white text-xs px-1 rounded"
                        style={{ fontSize: '10px' }}
                      >
                        URL
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Food Details */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Fresh Vegetables, Cooked Rice"
              className="h-9"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the food condition, expiry, etc."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <Input
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="e.g., 5kg, Serves 10 people"
              className="h-9"
              required
            />
          </div>
        </div>

        {/* Pickup Details */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4 inline mr-1" />
              Pickup Time
            </label>
            <Input
              type="datetime-local"
              value={formData.pickupTime}
              onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
              className="h-9"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              Pickup Location
            </label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter pickup address"
              className="h-9"
              required
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person
            </label>
            <Input
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              placeholder="Your name"
              className="h-9"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donor
            </label>
            <Input
              value={formData.donor}
              onChange={(e) => setFormData({...formData, donor: e.target.value})}
              placeholder="Your organization"
              className="h-9"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+91 98765 43210"
              className="h-9"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-10 text-base font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          List Food Donation
        </Button>
      </form>
    </div>
  );
};

export default AddFoodScreen;

