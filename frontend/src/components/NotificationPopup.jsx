import React from "react";

const NotificationPopup = ({ notifications }) => (
  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
    <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
    <ul className="py-2 px-4 max-h-60 overflow-y-auto">
      {notifications.length === 0 ? (
        <li className="text-gray-500 text-sm">No notifications</li>
      ) : (
        notifications.map((n, i) => (
          <li key={i} className="py-2 border-b last:border-b-0 text-gray-700 text-sm">
            {n.message}
          </li>
        ))
      )}
    </ul>
  </div>
);

export default NotificationPopup;
