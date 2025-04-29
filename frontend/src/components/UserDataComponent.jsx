import React from 'react';

const UserDataComponent = ({ user, compact = false }) => {
  if (!user) {
    return <div className="text-gray-500">User data not available</div>;
  }

  return (
    <div className={`flex ${compact ? 'items-center' : 'flex-col items-center'}`}>
      <div className={`${compact ? 'w-10 h-10' : 'w-24 h-24'} rounded-full overflow-hidden`}>
        <img
          src={user.profilePicture || "https://placehold.co/200x200/7c3aed/FFFFFF?text=User"}
          alt={`${user.name || 'User'}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className={`${compact ? 'ml-3' : 'mt-4 text-center'}`}>
        <h3 className={`font-medium text-gray-800 ${compact ? 'text-sm' : 'text-lg'}`}>
          {user.name || 'Anonymous User'}
        </h3>
        <p className="text-gray-500 text-sm truncate">
          {user.email || 'No email provided'}
        </p>
        {!compact && user.bio && (
          <p className="text-gray-600 mt-2 text-sm">
            {user.bio}
          </p>
        )}
        {!compact && (
          <div className="mt-3 flex items-center justify-center">
            <div className="text-center mr-4">
              <p className="font-semibold text-purple-600">{user.friendsCount || 0}</p>
              <p className="text-xs text-gray-500">Friends</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-purple-600">{user.streakDays || 0}</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDataComponent;