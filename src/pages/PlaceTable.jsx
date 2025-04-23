import React, { useState, useEffect } from "react";
import { placesData } from "../data/placeData"; // Assuming placesData is available
import PlacesModal from "../components/modal/PlacesModal";
import AlertModal from "../components/modal/AlertModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PlacesTable = ({ page,  onSelectPlace, showSavedLocations = true })  => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [localPlaces, setLocalPlaces] = useState(placesData);
  const [savedLocations, setSavedLocations] = useState([]);
  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(storedLocations);
  }, []);

  const handleSaveLocation = (place) => {
    const updatedLocations = [...savedLocations, place];
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
    setIsAlertOpen(true);
  };

  const filteredPlaces = localPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddLocation = (newPlace) => {
    setPlaces((prevPlaces) => [...prevPlaces, newPlace]); // Append new place
  };
  

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex">
      
      {/* Search and Add Button */}
      <div className="inline-block ml-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search for fun places..."
          className="w-full md:w-1/2 p-2 border rounded mb-2 md:mb-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-green-500/70 border-green-500 border-2 text-white rounded hover:bg-green-700"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Place
        </button>
      </div>
      {isModalOpen && (
        <PlacesModal onClose={() => setIsModalOpen(false)} onSave={handleAddLocation} />
      )}
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Table for Viewing Places on Map */}
        <div className={`p-4 ${page === "placetable" ? "bg-white shadow-lg rounded-lg" : ""}`}>
          <h2 className="text-lg font-semibold mb-2">Places to View on Map</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Ticket Fee</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((place) => (
                <tr key={place.id} className="hover:bg-gray-100">
                  <td className="border p-2">
                    <img src={place.image} alt={place.name} className="w-16 h-16 rounded" />
                  </td>
                  <td className="border p-2">{place.name}</td>
                  <td className="border p-2">{place.ticketFee || "Free"}</td>
                  <td className="border p-2">
                    <button
                      className=" cursor-pointer px-4 py-2 bg-blue-500/70 border-2 border-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={() => onSelectPlace(place)}
                    >
                      View on Map
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table for Saved Locations */}
        {showSavedLocations && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Saved Locations</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Ticket Fee</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {localPlaces.map((place) => (
                <tr key={place.id} className="border">
                  <td className="p-2">{place.name}</td>
                  <td className="p-2">{place.ticketFee || "Free"}</td>
                  <td className="p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleSaveLocation(place)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            )}
      </div>


      {isModalOpen && <PlacesModal onClose={() => setIsModalOpen(false)} onAddPlace={handleAddLocation} />}
      {isAlertOpen && <AlertModal message="Location saved successfully!" onClose={() => setIsAlertOpen(false)} />}
    </div>
    </div>
  );
};

export default PlacesTable;
