import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendsManagement = ({ user, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  useEffect(() => {
    if (user) {
      fetchFriends();
      fetchFriendRequests();
    }
  }, [user]);
  
  const fetchFriends = async () => {
    try {
      const response = await axios.get(`/api/friends/${user._id}/friends`);
      setFriends(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch friends' });
    }
  };
  
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`/api/friends/${user._id}/requests`);
      setRequests(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch friend requests' });
    }
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/friends/search?query=${searchQuery}`);
      setSearchResults(response.data);
      setActiveTab('find');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to search users' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendRequest = async (friendId) => {
    try {
      await axios.post(`/api/friends/${user._id}/requests/${friendId}`);
      setMessage({ type: 'success', text: 'Friend request sent successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to send friend request' });
    }
  };
  
  const handleAcceptRequest = async (friendId) => {
    try {
      await axios.post(`/api/friends/${user._id}/accept/${friendId}`);
      setMessage({ type: 'success', text: 'Friend request accepted' });
      fetchFriends();
      fetchFriendRequests();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to accept friend request' });
    }
  };
  
  const handleDeclineRequest = async (friendId) => {
    try {
      await axios.post(`/api/friends/${user._id}/decline/${friendId}`);
      setMessage({ type: 'success', text: 'Friend request declined' });
      fetchFriendRequests();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to decline friend request' });
    }
  };
  
  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(`/api/friends/${user._id}/friends/${friendId}`);
      setMessage({ type: 'success', text: 'Friend removed successfully' });
      fetchFriends();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to remove friend' });
    }
  };
  
  const renderFriendsList = () => {
    const filteredFriends = friends.filter(friend => 
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredFriends.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? 'No friends match your search' : 'You have no friends yet'}
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {filteredFriends.map(friend => (
          <div key={friend._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={friend.profilePicture} 
                  alt={friend.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{friend.name}</p>
                <p className="text-sm text-gray-500">{friend.email}</p>
              </div>
            </div>
            <button 
              onClick={() => handleRemoveFriend(friend._id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  const renderRequestsList = () => {
    if (requests.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No pending friend requests
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {requests.map(request => (
          <div key={request._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={request.profilePicture} 
                  alt={request.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{request.name}</p>
                <p className="text-sm text-gray-500">{request.email}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleAcceptRequest(request._id)}
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
              >
                Accept
              </button>
              <button 
                onClick={() => handleDeclineRequest(request._id)}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No users found matching your search
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {searchResults.map(user => (
          <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={user.profilePicture} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={() => handleSendRequest(user._id)}
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Friends Management</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 disabled:bg-purple-400"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'friends'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Friends
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'requests'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Requests
        </button>
        <button
          onClick={() => setActiveTab('find')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'find'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Find Friends
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'friends' && renderFriendsList()}
        {activeTab === 'requests' && renderRequestsList()}
        {activeTab === 'find' && renderSearchResults()}
      </div>
    </div>
  );
};

export default FriendsManagement;
