import { useState, useEffect } from 'react';

const LeaderboardData = ({ timeFrame }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRanking, setUserRanking] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        // In a real application, you would fetch data from your API
        // For this example, we'll use mock data
        const mockData = [
          { id: 1, name: 'Sarah Chen', days: 15, level: 2, xp: 2500, avatar: 'SC' },
          { id: 2, name: 'Alex Kim', days: 12, level: 2, xp: 2350, avatar: 'AK' },
          { id: 3, name: 'Emma Watson', days: 10, level: 2, xp: 2200, avatar: 'EW' },
          { id: 4, name: 'James Smith', days: 8, level: 2, xp: 2100, avatar: 'JS' },
          { id: 5, name: 'Maria Garcia', days: 7, level: 1, xp: 1950, avatar: 'MG' },
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLeaderboardData(mockData);
        
        // Set user's ranking (in a real app, this would come from the backend)
        setUserRanking({
          rank: 2,
          total: 150,
          user: mockData[1] // Alex Kim
        });
        
        setLoading(false);
      } catch {
        setError('Failed to fetch leaderboard data');
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [timeFrame]);

  if (loading) return <div className="flex justify-center py-8">Loading leaderboard data...</div>;
  if (error) return <div className="text-red-500 py-8">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {leaderboardData.map((user, index) => (
          <LeaderboardEntry 
            key={user.id}
            rank={index + 1}
            user={user}
            isHighlighted={index === 1}
          />
        ))}
        
        {userRanking && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800">Your Ranking</h3>
              <span className="text-sm text-gray-500">#{userRanking.rank} of {userRanking.total}</span>
            </div>
            <LeaderboardEntry 
              user={userRanking.user}
              rank={userRanking.rank}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// LeaderboardEntry component for each row
const LeaderboardEntry = ({ user, rank, isHighlighted = false }) => {
  // Determine medal or rank display
  const rankDisplay = () => {
    if (rank === 1) return <span className="text-yellow-500 text-xl">🥇</span>;
    if (rank === 2) return <span className="text-gray-400 text-xl">🥈</span>;
    if (rank === 3) return <span className="text-amber-700 text-xl">🥉</span>;
    return <span className="text-gray-500">#{rank}</span>;
  };

  // Calculate progress percentage (for demo purposes)
  const progressPercentage = (user.xp / 3000) * 100;

  return (
    <div className={`flex items-center p-4 rounded-lg ${isHighlighted ? 'bg-purple-50' : 'bg-white'}`}>
      <div className="w-8 text-center">
        {rankDisplay()}
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-3">
        <span className="text-gray-600 text-sm">{user.avatar}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <div className="flex items-center">
            <span className="font-medium text-gray-800">{user.name}</span>
            <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full flex items-center">
              <span className="mr-1">🔥</span> {user.days} days
            </span>
          </div>
          <span className="text-sm text-purple-600">Level {user.level} <span className="text-gray-500">{user.xp.toLocaleString()} XP</span></span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardData;