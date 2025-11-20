// src/components/Sidebar.jsx
import React from "react";
import {
  Home,
  Heart,
  Bookmark,
  Clock,
  Moon,
  Settings,
  LogOut,
  User,
} from "lucide-react";

import "/src/styles/sidebar.css";

export default function Sidebar({ activePage, onNavigate }) {
  const topIcons = [
    { id: "home", icon: <Home size={22} />, label: "Home" },
    { id: "reviews", icon: <Heart size={22} />, label: "Reviews" },
    { id: "recommended", icon: <Bookmark size={22} />, label: "Recommended" },
    { id: "saved", icon: <Clock size={22} />, label: "Saved" },
  ];

  const middleIcons = [
    { id: "night", icon: <Moon size={22} />, label: "Night Mode" },
    { id: "settings", icon: <Settings size={22} />, label: "Settings" },
  ];

  const bottomIcons = [
    { id: "logout", icon: <LogOut size={22} />, label: "Logout" },
    { id: "profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <div className="sidebar">
      <div className="logo">S</div>


      <div className="group top">
        <div className="group-container">
          {topIcons.map((item) => (
            <div
              key={item.id}
              className={`icon-wrapper ${activePage === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <div className="icon">{item.icon}</div>
              <div className="tooltip">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/*no active state needed */}
      <div className="group middle">
        <div className="group-container">
          {middleIcons.map((item) => (
            <div key={item.id} className="icon-wrapper">
              <div className="icon">{item.icon}</div>
              <div className="tooltip">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/*no active state needed */}
      <div className="group bottom">
        <div className="group-container">
          {bottomIcons.map((item) => (
            <div key={item.id} className="icon-wrapper">
              <div className="icon">{item.icon}</div>
              <div className="tooltip">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
