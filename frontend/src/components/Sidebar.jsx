import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  Swords,
  BarChart3,
  AlarmClock,
  Trophy
} from "lucide-react";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { label: "Habits", icon: <Swords size={20} />, path: "/habits" },
    { label: "Progress", icon: <BarChart3 size={20} />, path: "/progress" },
    { label: "Reminders", icon: <AlarmClock size={20} />, path: "/reminders" },
    { label: "Leaderboard", icon: <Trophy size={20} />, path: "/leaderboard" }
  ];
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 px-6 py-8 shadow-md sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center mb-10">
        <div className="w-9 h-9 flex items-center justify-center mr-2">
          <img src={Logo} alt="HabitQuest Logo" className="w-full h-full object-contain" />
        </div>
        <span className="text-purple-600 font-bold text-2xl">HabitQuest</span>
      </div>
      {/* Navigation */}
      <ul className="space-y-2">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={idx} onClick={() => navigate(item.path)} className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? "bg-purple-100 text-purple-600 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}>
              {item.icon}
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Sidebar;