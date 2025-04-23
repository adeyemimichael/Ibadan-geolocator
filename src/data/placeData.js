export const placesData = [
      {
        "id": 1,
        "name": "Agodi Gardens",
        "latitude": 7.4069, 
        "longitude": 3.8993,
        "ticketFee": "₦500",
        "image": "https://example.com/agodi.jpg"
    },
    {
        "id": 2,
        "name": "Ventura Mall",
        "latitude": 7.4183, 
        "longitude": 3.9055,
        "ticketFee": "₦1,000",
        "image": "https://example.com/ventura.jpg"
    },
    {
        "id": 3,
        "name": "Cocoa House",
        "latitude": 7.3879, 
        "longitude": 3.8793,
        "ticketFee": "Free",
        "image": "https://example.com/cocoa-house.jpg"
    },
    {
        "id": 4,
        "name": "University of Ibadan Zoo",
        "latitude": 7.4428, 
        "longitude": 3.8947,
        "ticketFee": "₦800",
        "image": "https://example.com/ui-zoo.jpg"
    },
    {
        "id": 5,
        "name": "IITA Forest Reserve",
        "latitude": 7.4960, 
        "longitude": 3.8993,
        "ticketFee": "₦1,500",
        "image": "https://example.com/iita.jpg"
    },
    {
        "id": 6,
        "name": "Mapo Hall",
        "latitude": 7.3766, 
        "longitude": 3.8976,
        "ticketFee": "₦200",
        "image": "https://example.com/mapo.jpg"
    },
    {
        "id": 7,
        "name": "Ibadan National Museum",
        "latitude": 7.3941, 
        "longitude": 3.8955,
        "ticketFee": "₦300",
        "image": "https://example.com/national-museum.jpg"
    },
    {
        "id": 8,
        "name": "Trans Amusement Park",
        "latitude": 7.4191, 
        "longitude": 3.9104,
        "ticketFee": "₦1,000",
        "image": "https://example.com/trans-amusement.jpg"
    },
    {
        "id": 9,
        "name": "Bower's Tower",
        "latitude": 7.4015, 
        "longitude": 3.8971,
        "ticketFee": "₦500",
        "image": "https://example.com/bowers-tower.jpg"
    },
    {
        "id": 10,
        "name": "Lekan Salami Stadium",
        "latitude": 7.4079, 
        "longitude": 3.9163,
        "ticketFee": "₦500",
        "image": "https://example.com/lekan-salami-stadium.jpg"
    },
    

];
const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
const fetchNearbyPlaces = async () => {
    const res = await fetch(`https://api.geoapify.com/v2/places?categories=entertainment.amusement_park,leisure.park,tourism.attraction&filter=circle:3.8964,7.3776,5000&limit=20&apiKey=${apiKey}`);
    const data = await res.json();
    return data.features.map(place => ({
      name: place.properties.name,
      address: place.properties.formatted,
      category: place.properties.categories?.[0] || "N/A",
      lat: place.properties.lat,
      lon: place.properties.lon,
    }));
  };
  