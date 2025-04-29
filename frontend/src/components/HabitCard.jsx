import React from "react";

const HabitCard = ({ habit }) => {
  // Calculate progress percentage
  const percent = Math.min(100, Math.round((habit.completion / habit.goal) * 100));

  return (
    <div className="bg-white rounded-2xl shadow flex flex-col md:flex-row items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <span className="text-3xl">{habit.emoji}</span>
        <div>
          <div className="font-bold text-lg">{habit.name}</div>
          <div className="text-sm text-red-500 flex items-center gap-1">
            <span role="img" aria-label="fire">🔥</span>
            {habit.streak} day streak
          </div>
        </div>
      </div>
      <div className="flex-1 mx-6 w-full max-w-md">
        <div className="h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-2 bg-purple-500 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
      <div>
        {habit.completedToday ? (
          <span className="inline-block w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
            ✓
          </span>
        ) : (
          <span className="inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
            ✓
          </span>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
