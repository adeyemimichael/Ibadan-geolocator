import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
 
const SetMapView = ({ position, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { animate: true, duration: 1.5 });
    }
  }, [position, zoom, map]);

  return null;
};

// Map Component
const MapComponent = ({ selectedPlace }) => {
  const [position, setPosition] = useState([7.3775, 3.9470]); 
  const [zoom, setZoom] = useState(13);

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (error) => console.error('Error getting location: ', error)
    );
  }, []);

  
  useEffect(() => {
    if (selectedPlace) {
      setPosition(selectedPlace.position);
      setZoom(15); 
    }
  }, [selectedPlace]);

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: "https://example.com/custom-marker-icon.png", 
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  
  return (
    <div className="map-container" style={{ height: '500px', width: '100%' }}>
      <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        {/* Adjust the map view whenever selectedPlace changes */}
        <SetMapView position={position} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marker for the selected place */}
        <Marker position={position} icon={customIcon}>
          <Popup>{selectedPlace ? selectedPlace.name : 'You are here 📍'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
