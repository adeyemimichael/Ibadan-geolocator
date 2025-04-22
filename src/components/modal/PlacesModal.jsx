import React, { useState } from 'react';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Place</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Place Name" onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="ticketFee" placeholder="Ticket Fee" onChange={handleChange} required className="border p-2 rounded" />
          <input type="number" step="any" name="lat" placeholder="Latitude" onChange={handleChange} required className="border p-2 rounded" />
          <input type="number" step="any" name="lng" placeholder="Longitude" onChange={handleChange} required className="border p-2 rounded" />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationModal;
