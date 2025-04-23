
import React, { createContext, useContext, useEffect, useState } from "react";

const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState(() => {
   
    const saved = localStorage.getItem("places");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist on change
  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  const addPlace = (place) => {
    setPlaces((prev) => [...prev, { ...place, id: Date.now() }]);
  };

  const removePlace = (id) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace, removePlace }}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => useContext(PlacesContext);
