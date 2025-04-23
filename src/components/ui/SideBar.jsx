import React from "react";
import { FiMapPin, FiHome, FiUsers, FiLogOut, FiFolder } from "react-icons/fi";

const Sidebar = ({ onNavigate, activePage }) => {
  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, page: "dashboard" },
    { name: "Places", icon: <FiMapPin />, page: "places" },
    { name: "Users", icon: <FiUsers />, page: "users" },
    {name: "Ibadan Gallery", icon: <FiFolder/>, page: "gallery"}
  ];

  return (
    <aside className="w-64 h-screen bg-green-600 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4">IbadanSITI</h2>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`flex items-center px-4 py-3  cursor-pointer w-full text-left hover:bg-green-600 ${
              activePage === item.page ? "bg-green-600" : ""
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
      
    </aside>
  );
};

export default Sidebar;
