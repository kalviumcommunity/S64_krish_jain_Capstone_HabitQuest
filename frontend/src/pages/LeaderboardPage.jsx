import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LeaderboardData from '../components/LeaderboardData';
import FriendsManagement from '../components/FriendsManagement';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('week');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showChallengeDropdown, setShowChallengeDropdown] = useState(false);
  const [user] = useState({
    _id: 'user123',
    name: 'Alex Kim',
    email: 'alex@example.com',
    profilePicture: 'https://placehold.co/100x100/7c3aed/FFFFFF?text=AK',
    friendsCount: 3,
    friends: [
      { _id: '1', name: 'Sarah Chen', email: 'sarah@example.com', profilePicture: 'https://placehold.co/100x100/7c3aed/FFFFFF?text=SC' },
      { _id: '3', name: 'Emma Watson', email: 'emma@example.com', profilePicture: 'https://placehold.co/100x100/7c3aed/FFFFFF?text=EW' },
      { _id: '4', name: 'James Smith', email: 'james@example.com', profilePicture: 'https://placehold.co/100x100/7c3aed/FFFFFF?text=JS' }
    ]
  });

  const handleChallengeFriend = (friendId) => {
    // In a real application, this would send a challenge request to the backend
    console.log(`Challenging friend with ID: ${friendId}`);
    setShowChallengeDropdown(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform z-10
        lg:relative lg:translate-x-0 transition duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar />
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} />
        
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Quest Champions</h1>
                <p className="text-gray-600">Compete with fellow adventurers</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-3">
                <div className="relative">
                  <button 
                    onClick={() => setShowChallengeDropdown(!showChallengeDropdown)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Challenge Friends
                  </button>

                  {/* Challenge Dropdown */}
                  {showChallengeDropdown && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
                      {/* Arrow pointing to button */}
                      <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
                      
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Challenge a Friend</h3>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto">
                        {user.friends.map(friend => (
                          <div key={friend._id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center justify-between">
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
                              <button
                                onClick={() => handleChallengeFriend(friend._id)}
                                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
                              >
                                Challenge
                              </button>
                            </div>
                          </div>
                        ))}
                        {user.friends.length === 0 && (
                          <div className="px-4 py-3 text-center text-gray-500">
                            No friends to challenge
                          </div>
                        )}
                      </div>
                      
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button 
                          className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                          onClick={() => {
                            setShowChallengeDropdown(false);
                            setShowFriendsModal(true);
                          }}
                        >
                          Add More Friends
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="hidden sm:inline">Share Progress</span>
                  <span className="sm:hidden">Share</span>
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="px-6">
              <div className="flex space-x-2 border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('week')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                    activeTab === 'week' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  This Week
                </button>
                <button 
                  onClick={() => setActiveTab('month')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                    activeTab === 'month' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  This Month
                </button>
                <button 
                  onClick={() => setActiveTab('allTime')}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                    activeTab === 'allTime' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
            
            {/* Leaderboard Content */}
            <div className="p-6">
              <LeaderboardData timeFrame={activeTab} />
            </div>
          </div>
        </main>
      </div>

      {/* Friends Management Modal */}
      {showFriendsModal && (
        <FriendsManagement
          user={user}
          onClose={() => setShowFriendsModal(false)}
        />
      )}
    </div>
  );
};

export default LeaderboardPage;