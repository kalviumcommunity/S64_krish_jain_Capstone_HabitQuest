import React, { useState } from 'react';

const NotificationsSettings = ({ user }) => {
  const [settings, setSettings] = useState({
    friendRequests: user?.notificationSettings?.friendRequests ?? true,
    friendchallenge: user?.notificationSettings?.friendchallenge ?? true,
    achievements: user?.notificationSettings?.achievements ?? true,
    leaderboard: user?.notificationSettings?.leaderboard ?? true,
    reminders: user?.notificationSettings?.reminders ?? true,
    dndMode: user?.notificationSettings?.dndMode ?? false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      setMessage({ 
        type: 'success', 
        text: 'Notification settings updated successfully!' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to update notification settings. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Notifications and Reminders</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Friend Request Notifications</h3>
            <p className="text-sm text-gray-600">Get notified when someone sends you a friend request</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => handleToggle('friendRequests')}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                settings.friendRequests ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  settings.friendRequests ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Friend's challenge Notifications</h3>
            <p className="text-sm text-gray-600">Get notified when your friend sends you a challenge request</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => handleToggle('friendchallenge')}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                settings.friendchallenge ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  settings.friendchallenge ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Achievement Notifications</h3>
            <p className="text-sm text-gray-600">Get notified when you earn badges or achievements</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => handleToggle('achievements')}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                settings.achievements ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  settings.achievements ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Leaderboard Position Notifications</h3>
            <p className="text-sm text-gray-600">Get notified when your position changes on the leaderboard</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => handleToggle('leaderboard')}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                settings.leaderboard ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  settings.leaderboard ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Reminder Notifications</h3>
            <p className="text-sm text-gray-600">Get reminders for your scheduled habits</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => handleToggle('reminders')}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                settings.reminders ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  settings.reminders ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Do Not Disturb Mode</h3>
            <p className="text-sm text-gray-600">Temporarily pause all notifications</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => handleToggle('dndMode')}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                settings.dndMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  settings.dndMode ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 mt-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;