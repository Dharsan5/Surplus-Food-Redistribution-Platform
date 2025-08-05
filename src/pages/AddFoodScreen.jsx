import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import './AddFoodScreen.css';

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
    <div className="add-food-container">
      {/* Header */}
      <div className="add-food-header">
        <div className="header-content">
          <button
            onClick={() => navigate(-1)}
            className="back-button"
          >
            <ArrowLeft className="back-icon" />
          </button>
          <h1 className="page-title">Add Food Donation</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="add-food-form">
        {/* Photo Upload */}
        <div className="form-section">
          <label className="section-label">
            Add Photos
          </label>
          
          {/* Photo Upload Area */}
          <div className="photo-upload-area">
            {/* Toggle between upload and URL */}
            <div className="upload-toggle">
              <button
                type="button"
                onClick={() => setPhotoInputMode('upload')}
                className={`toggle-button ${photoInputMode === 'upload' ? 'active' : ''}`}
              >
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => setPhotoInputMode('url')}
                className={`toggle-button ${photoInputMode === 'url' ? 'active' : ''}`}
              >
                Image URL
              </button>
            </div>

            {photoInputMode === 'upload' ? (
              <>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                  id="photo-upload"
                />
                
                <label
                  htmlFor="photo-upload"
                  className="upload-area"
                >
                  <Camera className="upload-icon" />
                  <p className="upload-text">Tap to upload photos</p>
                  <p className="upload-subtext">You can select multiple images</p>
                </label>
              </>
            ) : (
              <div className="url-input-area">
                <div className="url-input-row">
                  <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    className="url-input"
                  />
                  <button
                    type="button"
                    onClick={handleImageUrlAdd}
                    disabled={!imageUrl.trim()}
                    className="add-url-button"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="url-help-text">Paste an image URL to add it to your food listing</p>
              </div>
            )}

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="image-preview-grid">
                {selectedImages.map((image) => (
                  <div key={image.id} className="image-preview">
                    <img
                      src={image.preview}
                      alt="Selected"
                      className="preview-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/64x64?text=Failed+to+Load";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="remove-image-button"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {image.isUrl && (
                      <div className="url-badge">
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
        <div className="form-section">
          <div className="form-group">
            <div className="form-field">
              <label className="field-label">Food Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Fresh Vegetables, Cooked Rice"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="field-label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the food condition, expiry, etc."
                className="form-textarea"
                rows={3}
                required
              />
            </div>

            <div className="form-field">
              <label className="field-label">Quantity</label>
              <input
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                placeholder="e.g., 5kg, Serves 10 people"
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Pickup Details */}
        <div className="form-section">
          <div className="form-group">
            <div className="form-field">
              <label className="field-label label-with-icon">
                <Clock className="label-icon" />
                Pickup Time
              </label>
              <input
                type="datetime-local"
                value={formData.pickupTime}
                onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="field-label label-with-icon">
                <MapPin className="label-icon" />
                Pickup Location
              </label>
              <input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter pickup address"
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="form-section">
          <div className="form-group">
            <div className="form-field">
              <label className="field-label">Contact Person</label>
              <input
                value={formData.contactPerson}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                placeholder="Your name"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="field-label">Donor</label>
              <input
                value={formData.donor}
                onChange={(e) => setFormData({...formData, donor: e.target.value})}
                placeholder="Your organization"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="field-label">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          <Plus className="submit-icon" />
          List Food Donation
        </button>
      </form>
    </div>
  );
};

export default AddFoodScreen;

