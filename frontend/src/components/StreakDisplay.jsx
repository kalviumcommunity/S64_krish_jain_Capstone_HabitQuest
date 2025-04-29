import { useEffect, useState } from 'react';
import { formatStreak } from '../utils/StreakCalculator';

const StreakDisplay = ({ streakData, showAnimation = true }) => {
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneType, setMilestoneType] = useState(null);

  useEffect(() => {
    if (streakData?.milestones?.monthly) {
      setMilestoneType('monthly');
      setShowMilestone(true);
    } else if (streakData?.milestones?.weekly) {
      setMilestoneType('weekly');
      setShowMilestone(true);
    }

    // Hide milestone notification after 5 seconds
    const timer = setTimeout(() => {
      setShowMilestone(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [streakData]);

  if (!streakData) {
    return null;
  }

  return (
    <div className="relative">
      {/* Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Streak */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Streak</h3>
              <p className="text-2xl font-bold text-purple-600">
                {formatStreak(streakData.currentStreak)}
              </p>
            </div>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Longest Streak</h3>
              <p className="text-2xl font-bold text-purple-600">
                {formatStreak(streakData.longestStreak)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {streakData.milestones.weekly && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            <span className="mr-1">🎯</span>
            Weekly Streak
          </div>
        )}
        {streakData.milestones.monthly && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            <span className="mr-1">🌟</span>
            Monthly Streak
          </div>
        )}
      </div>

      {/* Milestone Notification */}
      {showAnimation && showMilestone && (
        <div className="fixed bottom-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <span className="text-xl">
              {milestoneType === 'monthly' ? '🌟' : '🎯'}
            </span>
            <div>
              <p className="font-medium">
                Congratulations! 
              </p>
              <p className="text-sm">
                You've achieved a {milestoneType === 'monthly' ? '30-day' : '7-day'} streak!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakDisplay; 