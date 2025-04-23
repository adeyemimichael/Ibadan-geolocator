import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const AddLocationModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    imageFile: null,
    ticketFee: '',
    lat: '',
    lng: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert file to data URL (or integrate your upload logic here)
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPlace = {
        name: formData.name,
        image: reader.result,        
        ticketFee: formData.ticketFee,
        position: [parseFloat(formData.lat), parseFloat(formData.lng)],
      };
      onSave(newPlace);
    };

    if (formData.imageFile) {
      reader.readAsDataURL(formData.imageFile);
    } else {
      // fallback if no file
      onSave({
        name: formData.name,
        image: '',
        ticketFee: formData.ticketFee,
        position: [parseFloat(formData.lat), parseFloat(formData.lng)],
      });
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 10000 }}>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md" style={{ zIndex: 10001 }}>
        <h2 className="text-xl font-bold mb-4">Add New Place</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Place Name"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          {/* File upload instead of URL input */}
          <label className="flex flex-col">
            <span className="mb-1">Image File</span>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </label>

          <input
            type="text"
            name="ticketFee"
            placeholder="Ticket Fee"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            step="any"
            name="lat"
            placeholder="Latitude"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            step="any"
            name="lng"
            placeholder="Longitude"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddLocationModal;
