import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All Habits');
  const [habits, setHabits] = useState([]);
  
  // Mock data - in a real app, this would come from an API
  const mockHabits = [
    {
      id: 1,
      name: 'Morning Meditation',
      streak: 7,
      progress: 70,
      type: 'Wellness',
      icon: '🧘',
      completed: true
    },
    {
      id: 2,
      name: 'Coding Practice',
      streak: 12,
      progress: 90,
      type: 'Learning',
      icon: '💻',
      completed: false
    },
    {
      id: 3,
      name: 'Evening Run',
      streak: 5,
      progress: 75,
      type: 'Health',
      icon: '🏃',
      completed: true
    },
    {
      id: 4,
      name: 'Reading',
      streak: 3,
      progress: 60,
      type: 'Learning',
      icon: '📚',
      completed: true
    },
    {
      id: 5,
      name: 'Yoga',
      streak: 15,
      progress: 95,
      type: 'Health',
      icon: '🧘',
      completed: true
    }
  ];

  // Filter habits based on active filter
  useEffect(() => {
    if (activeFilter === 'All Habits') {
      setHabits(mockHabits);
    } else {
      setHabits(mockHabits.filter(habit => habit.type === activeFilter));
    }
  }, [activeFilter]);

  return (
    <div className="p-6">
      {/* Habit Type Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All Habits', 'Health', 'Wellness', 'Learning'].map(filter => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeFilter === filter
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-2xl mr-4">{habit.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                  <div className="flex items-center text-sm text-orange-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span>{habit.streak} day streak</span>
                  </div>
                </div>
              </div>
              
              {/* Checkmark */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                habit.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                {habit.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full" 
                style={{ width: `${habit.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;