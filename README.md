# 🗺️ Ibadan Siti - Discover Fun Places in Ibadan
Ibadan SITI is an interactive web application that helps users explore various places in Ibadan. Users can view, add, and share places, and the platform provides an interactive map to explore locations.

## 📂 Folder Structure



## 🚀 Features

### ✔️ Places Table (Sidebar)
- Displays a list of exciting places with their names, ticket fees, and thumbnails.
- Search bar to dynamically filter places.
- "View on Map" button highlights the selected location on the interactive map.
- Option to save places to **localStorage**.
- Copyable link for each saved location for easy sharing.

### 🌍 Map Integration
- Interactive map powered by **React Leaflet** and **Leaflet.js**.
- Automatically detects and shows the user’s current location.
- Displays markers for fun spots such as parks, malls, restaurants, etc.
- Zoom feature to highlight specific locations on the map when "View on Map" is clicked.

### ➕ Modal (Add New Place)
- Add new places via a modal form.
- Fields include: place name, ticket fee, latitude, longitude, and image URL.
- Once submitted, the new place is added to the main list and reflected on the map.

### 🧭 Navbar
- Displays app name/logo.
- Responsive design with a mobile toggle for easier navigation.
- Placeholder sign-out functionality.

## 🛠️ Tech Stack

- **React** - Frontend framework
- **Tailwind CSS** - For styling and responsive layout
- **React Leaflet** & **Leaflet.js** - For interactive map integration
- **React Router DOM** - For navigation
- **React Icons** - For icons and UI components
- **localStorage** - For storing saved places

## 📂 Folder Structure
src/ ├── components/ │ ├── PlacesTable.jsx # Core logic for displaying, saving, sharing places │ ├── PlacesModal.jsx # Modal form for adding new places │ ├── Navbar.jsx # Navbar component with mobile toggle and user info │ ├── MapComponent.jsx # Interactive map component with user location detection ├── data/ │ └── placeData.js # Static data for initial places ├── App.js # Main app component to display everything └── index.js # React entry point

## 💡 How It Works

1. **Displaying Locations**: The app shows a list of fun places in a sidebar with names, ticket fees, and images.
2. **Saving Locations**: Users can save places to **localStorage**, allowing them to access the locations later.
3. **Sharing Links**: Each saved location has a unique link that can be copied for sharing.
4. **Adding Places**: A modal allows users to add new places with necessary details like name, ticket fee, coordinates, and an image URL.
5. **Map Interaction**: The interactive map displays markers for all the places. Clicking on "View on Map" zooms in on a selected place.

## 🏁 Getting Started

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/adeyemichael/geolocator-app.git
   cd geolocator-app 
   ```
2. Install dependencies:
 ``` bash
 npm install
```

## 🚀 Features

- Display and share places.
- Interactive map for location exploration.
- Responsive design with Tailwind CSS.
- Modal for adding new places.
- User-friendly UI using React and React Leaflet.

## 🛠️ Future Enhancements

- Integrate a backend for persistent data storage.
- Implement user authentication and profiles.
- Add filters to categorize places (e.g., restaurants, parks, historical sites).
- Implement image previews in the places table.

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and contribute!

## 🙌 Acknowledgments

- **Leaflet.js** - Leaflet for interactive maps.
- **React Leaflet** - React Leaflet for integrating Leaflet into React.
- **Tailwind CSS** - Tailwind CSS for responsive design.
- **React Icons** - React Icons for UI icons.

## 👤 Author

**Ayobami Akande**  


Passionate about building systems that solve real-life problems, with a focus on software engineering and development.

