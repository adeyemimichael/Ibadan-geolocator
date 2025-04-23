import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const AddLocationModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    ticketFee: '',
    lat: '',
    lng: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlace = {
      name: formData.name,
      image: formData.image,
      ticketFee: formData.ticketFee,
      position: [parseFloat(formData.lat), parseFloat(formData.lng)],
    };

    onSave(newPlace);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center"
    style={{ zIndex: 10000 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-60">
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
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
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
