import React, { useState, useEffect } from "react";

const SavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [shareUrl, setShareUrl] = useState("");
  const [showShareForId, setShowShareForId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = savedLocations.filter((place) => place.id !== id);
    setSavedLocations(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
    if (showShareForId === id) {
      setShowShareForId(null);
      setShareUrl("");
    }
  };

  const handleShare = (place) => {
    // Safely extract coords or default to 0,0
    const lat = place.position?.[0] ?? 0;
    const lng = place.position?.[1] ?? 0;
    const url = `${window.location.origin}/dashboard?` +
      `sharedId=${place.id}` +
      `&lat=${lat}` +
      `&lng=${lng}`;
    setShareUrl(url);
    setShowShareForId(place.id);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowShareForId(null);
      setShareUrl("");
      alert("Link copied!");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Saved Locations</h2>

      {savedLocations.length === 0 ? (
        <p>No saved locations yet.</p>
      ) : (
        <ul className="space-y-4">
          {savedLocations.map((place) => {
            // Safely read coordinates
            const lat = place.position?.[0];
            const lng = place.position?.[1];

            return (
              <li
                key={place.id}
                className="border p-4 flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <div className="font-medium text-lg">{place.name}</div>
                  <div className="text-sm text-gray-600">
                    Fee: {place.ticketFee || "Free"}
                  </div>
                  <div className="text-sm text-gray-600">
                    Lat: {lat != null ? lat.toFixed(5) : "N/A"}, Lng: {lng != null ? lng.toFixed(5) : "N/A"}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleShare(place)}
                  >
                    Share Location
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRemove(place.id)}
                  >
                    Remove
                  </button>
                </div>

                {showShareForId === place.id && (
                  <div className="mt-2 sm:mt-0 flex items-center space-x-2 w-full sm:w-auto">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 border p-2 rounded"
                    />
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      onClick={copyToClipboard}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SavedLocations;
