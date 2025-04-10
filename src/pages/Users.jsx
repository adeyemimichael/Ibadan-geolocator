import React, { useState, useEffect } from "react";

const SavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(storedLocations);
  }, []);

  const handleRemove = (id) => {
    const updatedLocations = savedLocations.filter((place) => place.id !== id);
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Locations</h2>
      {savedLocations.length === 0 ? (
        <p>No saved locations yet.</p>
      ) : (
        <ul>
          {savedLocations.map((place) => (
            <li key={place.id} className="border p-2 flex justify-between">
              <span>{place.name}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemove(place.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedLocations;
