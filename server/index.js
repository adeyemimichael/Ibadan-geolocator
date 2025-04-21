const express = require('express');
const { getAttractionsByCity } = require('./scraper/tripAdvisor');
const app = express();

app.get('/api/attractions', async (req, res) => {
  try {
    const city = req.query.city || 'Ibadan'; // Get city from query parameter (default: 'Ibadan')
    const attractions = await getAttractionsByCity(city);
    res.json(attractions); // Send response with attractions data
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attractions', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
