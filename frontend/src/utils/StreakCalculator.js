import { parseISO, isYesterday, isToday, differenceInDays, isBefore } from 'date-fns';

/**
 * Checks if two dates are consecutive days
 * @param {string} date1 - ISO date string
 * @param {string} date2 - ISO date string
 * @returns {boolean}
 */
export const isConsecutiveDay = (date1, date2) => {
  const d1 = parseISO(date1);
  const d2 = parseISO(date2);
  return Math.abs(differenceInDays(d1, d2)) === 1;
};

/**
 * Calculates streak information from completion dates
 * @param {string[]} completionDates - Array of ISO date strings
 * @returns {Object} Streak information
 */
export const calculateStreaks = (completionDates) => {
  if (!completionDates || completionDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      milestones: { weekly: false, monthly: false },
      lastCompletedDate: null
    };
  }

  // Sort dates in ascending order
  const sortedDates = [...completionDates].sort((a, b) => 
    parseISO(a).getTime() - parseISO(b).getTime()
  );

  // Remove future dates
  const validDates = sortedDates.filter(date => 
    isBefore(parseISO(date), new Date())
  );

  if (validDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      milestones: { weekly: false, monthly: false },
      lastCompletedDate: null
    };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;
  const lastDate = parseISO(validDates[validDates.length - 1]);

  // Calculate current streak
  if (isToday(lastDate) || isYesterday(lastDate)) {
    currentStreak = 1;
    for (let i = validDates.length - 1; i > 0; i--) {
      if (isConsecutiveDay(validDates[i], validDates[i - 1])) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < validDates.length; i++) {
    if (isConsecutiveDay(validDates[i], validDates[i - 1])) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // Check milestones
  const hasWeeklyStreak = currentStreak >= 7;
  const hasMonthlyStreak = currentStreak >= 30;

  return {
    currentStreak,
    longestStreak,
    milestones: {
      weekly: hasWeeklyStreak,
      monthly: hasMonthlyStreak
    },
    lastCompletedDate: validDates[validDates.length - 1]
  };
};

/**
 * Formats a streak number with appropriate suffix
 * @param {number} streak - The streak number
 * @returns {string} Formatted streak
 */
export const formatStreak = (streak) => {
  if (streak === 0) return '0 days';
  if (streak === 1) return '1 day';
  return `${streak} days`;
}; 