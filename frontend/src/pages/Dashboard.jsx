import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HabitChart from '../components/HabitChart';
import OverallProgressChart from '../components/OverallProgressChart';
import StreakDisplay from '../components/StreakDisplay';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [streaks, setStreaks] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch habits
        const habitsResponse = await fetch('/api/habits');
        if (!habitsResponse.ok) throw new Error('Failed to fetch habits');
        const habitsData = await habitsResponse.json();
        setHabits(habitsData);

        // Fetch streaks for each habit
        const streaksResponse = await fetch('/api/streaks');
        if (!streaksResponse.ok) throw new Error('Failed to fetch streaks');
        const streaksData = await streaksResponse.json();
        
        // Convert streaks array to object with habitId as key
        const streaksMap = {};
        streaksData.forEach(streak => {
          streaksMap[streak.habitId] = streak;
        });
        setStreaks(streaksMap);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

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
        <Navbar />
        
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Overall Progress */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overall Progress</h2>
              <OverallProgressChart habits={habits} />
            </section>

            {/* Individual Habits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Habits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {habits.map(habit => (
                  <div key={habit._id} className="space-y-4">
                    <HabitChart 
                      habitTitle={habit.name}
                      completionDates={habit.progress
                        .filter(p => p.completed)
                        .map(p => format(new Date(p.date), 'yyyy-MM-dd'))}
                    />
                    <StreakDisplay streakData={streaks[habit._id]} />
                  </div>
                ))}
              </div>
            </section>

            {/* No Habits Message */}
            {habits.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No habits yet</h3>
                <p className="mt-2 text-gray-500">Start by creating your first habit!</p>
                <button
                  onClick={() => {/* Add navigation to habit creation */}}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  Create Habit
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 