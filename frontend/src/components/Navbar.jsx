import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import UserDataComponent from './UserDataComponent.jsx';
import FriendsManagement from './FriendsManagement';

const Navbar = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const notifications = [
    { id: 1, message: "You've completed your 'Morning Meditation' habit", time: "2 hours ago" },
    { id: 2, message: "New badge unlocked: 'Consistency Master'", time: "Yesterday" },
    { id: 3, message: "You're on a 7-day streak for 'Morning Meditation'", time: "2 days ago" }
  ];

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/dashboard":
        return "Your Habits";
      case "/settings":
        return "Settings";
      case "/progress":
        return "Progress";
      case "/reminders":
        return "Reminders";
      case "/leaderboard":
        return "Leaderboard";
      default:
        return "HabitQuest";
    }
  };

  const pageTitle = getPageTitle(location.pathname);
  
  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navigateToSettings = (section = '') => {
    navigate(`/settings${section ? `/${section}` : ''}`);
    setShowProfileDropdown(false);
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 py-4 shadow-md bg-white sticky top-0 z-10">
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
      
      <div className="flex items-center">
        {/* Friends Button */}
        <div className="relative mr-4">
          <button 
            className="flex items-center p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowFriendsDropdown(!showFriendsDropdown)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-600 hidden sm:block">
              {user?.friendsCount || 0} Friends
            </span>
          </button>
          
          {/* Friends Dropdown */}
          {showFriendsDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
              {/* Arrow pointing to button */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
              
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Friends</h3>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {user?.friends?.map(friend => (
                  <div key={friend._id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={friend.profilePicture || "https://placehold.co/100x100/7c3aed/FFFFFF?text=U"} 
                          alt={friend.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{friend.name}</p>
                        <p className="text-xs text-gray-500">{friend.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {(!user?.friends || user.friends.length === 0) && (
                  <div className="px-4 py-3 text-center text-gray-500">
                    No friends yet
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2 border-t border-gray-100">
                <button 
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                  onClick={() => {
                    setShowFriendsDropdown(false);
                    navigate('/friends');
                  }}
                >
                  Manage Friends
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Notification Bell */}
        <div className="relative mr-4">
          <button 
            className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
              {/* Arrow pointing to bell */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
              
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              
              <div className="px-4 py-2 border-t border-gray-100">
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className="relative">
          <button 
            className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={handleProfileClick}
          >
            <img 
              src={user?.profilePicture || "https://placehold.co/100x100/7c3aed/FFFFFF?text=User"} 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </button>
          
          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-10">
              {/* Arrow pointing to profile */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
              
              {/* User Data Component */}
              <div className="px-4 py-3 border-b border-gray-100">
                <UserDataComponent user={user} compact={true} />
              </div>
              
              {/* Navigation Options */}
              <div className="py-1">
                <button 
                  onClick={() => navigateToSettings()}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
              </div>
              
              <div className="py-1 border-t border-gray-100">
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;