# HabitQuest

HabitQuest is an Interactive Habit Tracker is a gamified web application designed to help users build and maintain good habits through engaging features like streak tracking, progress visualization, reminders, and social sharing. This document provides a detailed overview of the features and the technologies used to build the platform.

### Features

1. Streak Tracking:-
Users can track their daily habit streaks to stay motivated. Missing a day will break the streak, encouraging consistency.

2. Progress Visualization:-
Users can view their progress through charts and graphs that show habit completion trends over time. This visual representation helps users stay engaged.

3. Reminders:-
Users can set customizable reminders (push notifications, emails, or in-app notifications) to ensure they don't forget their daily habits.

4. Social Sharing:-
Users can share their progress with friends and challenge each other to maintain streaks. Leaderboards and community challenges can enhance engagement.

### Technology Stack

#### Frontend
- React.js / Vite: For a fast and interactive user interface.
 - Tailwind CSS / SCSS: For styling and responsive design.
 - Recharts / Chart.js: For visualizing progress through graphs.

#### Backend
- Node.js with Express.js: For handling API requests and managing authentication.
 - MongoDB with Mongoose / MySQL with Sequelize: For storing user habits and tracking progress.
 - Firebase / OneSignal: For handling push notifications and reminders.

#### Authentication & Security
- JWT (JSON Web Token): For secure user authentication.
 - Bcrypt: For password hashing.
 
#### Deployment
- Frontend: Vercel / Netlify
 - Backend: Heroku / Render
 - Database: MongoDB Atlas / MySQL