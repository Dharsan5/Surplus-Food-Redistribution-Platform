import { useState, useEffect } from "react";
import { ArrowLeft, Camera, MapPin, Clock, Save, X, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const EditFoodScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the existing food item data
    const userItems = JSON.parse(localStorage.getItem('userFoodItems') || '[]');
    const existingItem = userItems.find(item => item.id === id);
    
    if (existingItem) {
      setFormData({
        name: existingItem.name || "",
        description: existingItem.description || "",
        quantity: existingItem.quantity || "",
        pickupTime: existingItem.availability || "",
        location: existingItem.location || "",
        donor: existingItem.donor || "",
        contactPerson: existingItem.contactPerson || "",
        phone: existingItem.phone || ""
      });
      
      // Set existing image if available
      if (existingItem.image && existingItem.image !== "https://via.placeholder.com/400x300?text=No+Image") {
        setSelectedImages([{
          id: 'existing',
          preview: existingItem.image,
          isExisting: true
        }]);
      }
      
      setLoading(false);
    } else {
      toast({
        title: "Item Not Found",
        description: "The food item you're trying to edit could not be found.",
        variant: "destructive"
      });
      navigate('/home');
    }
  }, [id, navigate, toast]);

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

    // Update the existing food item
    const userItems = JSON.parse(localStorage.getItem('userFoodItems') || '[]');
    const updatedItems = userItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name: formData.name,
          description: formData.description,
          quantity: formData.quantity,
          availability: formData.pickupTime,
          location: formData.location,
          contactPerson: formData.contactPerson,
          phone: formData.phone,
          donor: formData.donor,
          images: selectedImages.map(img => img.isUrl ? img.url : img.preview),
          image: selectedImages.length > 0 ? (selectedImages[0].isUrl ? selectedImages[0].url : selectedImages[0].preview) : "https://via.placeholder.com/400x300?text=No+Image"
        };
      }
      return item;
    });

    // Save updated items to localStorage
    localStorage.setItem('userFoodItems', JSON.stringify(updatedItems));

    // Trigger custom event to notify other components
    window.dispatchEvent(new CustomEvent('foodItemUpdated', { detail: { id } }));

    console.log('Food item updated:', id);

    toast({
      title: "Food Item Updated!",
      description: "Your food donation has been successfully updated.",
    });
    
    navigate(`/food/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load the food details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Food Donation</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pt-6 space-y-6">
        {/* Photo Upload */}
        <div className="bg-white rounded-2xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Edit Photos
          </label>
          
          {/* Photo Upload Area */}
          <div className="space-y-4">
            {/* Toggle between upload and URL */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={photoInputMode === 'upload' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPhotoInputMode('upload')}
                className="flex-1"
              >
                Upload Image
              </Button>
              <Button
                type="button"
                variant={photoInputMode === 'url' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPhotoInputMode('url')}
                className="flex-1"
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
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 transition-colors block"
                >
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Tap to upload photos</p>
                  <p className="text-sm text-gray-400 mt-1">You can select multiple images</p>
                </label>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleImageUrlAdd}
                    disabled={!imageUrl.trim()}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Paste an image URL to add it to your food listing</p>
              </div>
            )}

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {selectedImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt="Selected"
                      className="w-full h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100x100?text=Failed+to+Load";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {image.isUrl && (
                      <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                        URL
                      </div>
                    )}
                    {image.isExisting && (
                      <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                        Current
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

        {/* Contact Details */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person
            </label>
            <Input
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donor
            </label>
            <Input
              value={formData.donor}
              onChange={(e) => setFormData({...formData, donor: e.target.value})}
              placeholder="Your organization"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 pb-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 h-14 text-lg font-bold border-2 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-2xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 h-14 text-lg font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-2xl"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditFoodScreen;
