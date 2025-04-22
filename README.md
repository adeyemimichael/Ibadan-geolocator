# 🗺️ **Ibadan Siti – Discover Fun Places in Ibadan**  
**MIT License | React | Leaflet | Tailwind CSS**

**Ibadan SITI** is a modern, interactive web application that helps users discover and share exciting locations within Ibadan. With a rich UI, interactive map, and place-saving functionality, users can explore parks, malls, restaurants, and more, all in one platform.

---

## 🚀 **How It Works**

Ibadan SITI is built using **React** and integrates **Leaflet.js** via **React Leaflet** to render real-time interactive maps. Users can:

- View a curated list of locations with ticket fees and thumbnails.
- Add new places through a user-friendly modal.
- Instantly zoom into locations using map integration.
- Save favorite spots to localStorage and share with friends using unique links.

State is managed using React, with **Tailwind CSS** ensuring a responsive, mobile-first design.

---

## ✨ **Features**

| Feature | Description |
|--------|-------------|
| 🔍 **Places Table (Sidebar)** | View a dynamic list of locations, search places, save favorites, and copy shareable links. |
| 🌍 **Interactive Map** | View markers of fun spots with real-time geolocation and zoom functionality. |
| ➕ **Add New Place Modal** | Add custom places using a form (name, ticket fee, coordinates, image URL). |
| 🧭 **Navbar** | Clean, responsive navbar with mobile toggle and sign-out placeholder. |
| 💾 **Local Storage** | Save favorite places to revisit anytime without backend storage. |

---

## 🛠️ **Tech Stack**

- **React** – Frontend framework
- **Tailwind CSS** – Utility-first styling
- **React Leaflet & Leaflet.js** – Map rendering and interaction
- **React Router DOM** – Page routing
- **React Icons** – Lightweight, scalable icons
- **localStorage** – In-browser data persistence

---

## 📁 **Folder Structure**

```bash
src/
├── components/
│   ├── PlacesTable.jsx 
# Displays, saves, and shares places
│   ├── PlacesModal.jsx        # Modal form to add new places
│   ├── Navbar.jsx             # Responsive navbar
│   └── MapComponent.jsx       # Interactive map with markers
├── data/
│   └── placeData.js           # Static data for sample places
├── App.js                     # Main app logic and layout
└── index.js   
# React entry point
```

---

## 🧪 **How It Works (Step-by-Step)**

1. **View Locations**: Sidebar displays places with image, name, and fees.
2. **Map Navigation**: "View on Map" zooms in on selected place.
3. **User Geolocation**: Map auto-detects and shows user's current location.
4. **Save & Share**: Save places in localStorage and share them via a unique link.
5. **Add New Place**: Open the modal to submit new location data which appears instantly in the table and map.

---

## 🏁 **Getting Started**

### Prerequisites

- Node.js (v14+)
- npm

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adeyemichael/ibadan-geolocator.git
   cd ibadan-geolocator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## 📈 **Future Enhancements**

- Backend integration for data persistence
- User authentication and profile management
- Categorize places with filters (parks, restaurants, etc.)
- Image preview thumbnails in the table

---

## 🎨 **Why Use Ibadan Siti?**

- Discover exciting places around you in Ibadan.
- Save, share, and explore with just a few clicks.
- Responsive UI for all screen sizes.
- Ideal for locals, tourists, and event planners.

---

## 👤 **Author**

**Ayobami Akande**  
*Software Engineer | Map Enthusiast | Problem Solver*  
Passionate about building systems that solve real-world problems and enhance local discovery.
---------
## 🙌 **Acknowledgments**

- [Leaflet.js](https://leafletjs.com/) – Open-source JavaScript library for maps.
- [React Leaflet](https://react-leaflet.js.org/) – React wrapper for Leaflet.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework.
- [React Icons](https://react-icons.github.io/react-icons/) – Icons as React components.
## 🛠️ APIs Used

- **OpenStreetMap** – Provides map tiles and geographical data for rendering the interactive map.
- **Geoapify** – Used for geolocation services like address lookups and user location detection.
- **Unsplash API** – Fetches high-quality images for places added or explored in the app.
- **Google Earth API** – Allows enhanced satellite view and geographic visualization for more immersive map experiences.

## 📄 **License**

This project is licensed under the **MIT License**. See the LICENSE file for full details.


