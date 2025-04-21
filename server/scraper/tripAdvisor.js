const axios = require('axios');

// Directly hardcoded keys here 👇
const API_KEY = '35c3eab7d8mshe7b78d3058a5f41p1ed140jsna011ec2ee0ae';
const API_HOST = 'travel-advisor.p.rapidapi.com'; // Corrected API Host

const getAttractionsByCity = async (city = 'Ibadan') => {
  console.log("Using API_HOST 👉", API_HOST); // For debugging
  
  try {
    // Step 1: Get location ID based on city name
    const locationRes = await axios.get(`https://${API_HOST}/locations/v2/auto-complete`, {
      params: { query: city, lang: 'en_US', units: 'km' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    });

    console.log("Location Search Response:", locationRes.data);

    // Extract the results array from the nested structure
    const results = locationRes.data.data.Typeahead_autocomplete.results;
    if (!results || results.length === 0) {
      throw new Error('No location found for this city');
    }

    // Log the results array to inspect its contents
    console.log("Results Array:", results);

    const locationId = results[0]?.detailsV2?.locationId || results[0]?.detailsV2?.location_id;
    if (!locationId) {
      throw new Error('No locationId found for this city');
    }

    // Step 2: Get attractions data for the locationId
    const attractionsRes = await axios.get(`https://${API_HOST}/attractions/v2/list`, {
      params: { locationId, lang: 'en_US' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    });

    // Log the attractions data for debugging
    console.log("Attractions Data:", attractionsRes.data);

    // Extracting and returning the details of attractions
    const attractions = attractionsRes.data.data;

return attractions.map(item => ({
  name: item.name,
  description: item.description || 'No description available.',
  rating: item.rating || 'No rating available.',
  reviews: item.reviews_count || 0,
  priceLevel: item.price_level || 'No price level info',
  location: item.location || 'Location data unavailable',
  url: `https://www.tripadvisor.com/Attraction_Review-g317071-d${item.id}-Reviews-Ibadan_Oyo_State.html`,
  // Attempt to include an image if available
  imageUrl: item.photos && item.photos.length > 0 ? item.photos[0].url : 'No image available' // Check if the photo array exists
}));

    
  } catch (error) {
    console.error("TripAdvisor API Error:", error.response?.data || error.message);
    throw error; // Rethrow error for further handling
  }
};

// Test the function
getAttractionsByCity('Ibadan')
  .then(attractions => {
    console.log("Attractions fetched: ", attractions);
  })
  .catch(error => {
    console.error("Error fetching attractions: ", error);
  });
