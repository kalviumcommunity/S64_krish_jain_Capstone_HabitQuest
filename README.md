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


### 🗓️ **30-Day Planner for HabitQuest – Gamified Habit Tracker**

---

### **Week 1: Project Setup & UI Design (Days 1–5)**

**Day 1: Initial Setup & Planning**  
🔹 Finalize project name and key features  
🔹 Create GitHub repo, initialize frontend (React + Vite)  
🔹 Initialize backend (Node.js + Express)  
🔹 Set up folder structure and environment variables  

**Day 2: UI/UX Wireframes**  
🔹 Design wireframes (Home, Dashboard, Habit List, Progress)  
🔹 Create app flowchart and user journey  
🔹 Finalize color palette and fonts (Figma or Sketch)

**Day 3-4: Frontend UI Components**  
🔹 Build Navbar, Dashboard Layout, Habit List  
🔹 Create Habit Card with streaks and progress display  
🔹 Set up React Router for page navigation  
🔹 Style components with Tailwind CSS/SCSS

**Day 5: Finalize Frontend Base**  
🔹 Refactor UI for responsiveness  
🔹 Set up global state management (Context or Redux if needed)  
🔹 Test routing and layout flow

---

### **Week 2: Backend Setup & Core Habit Features (Days 6–10)**

**Day 6: Database & Models**  
🔹 Set up MongoDB with Mongoose  
🔹 Create `User`, `Habit`, and `Reminder` schemas  

**Day 7: Auth System**  
🔹 Implement JWT-based authentication  
🔹 Hash passwords using Bcrypt  
🔹 Create login/register endpoints

**Day 8-9: CRUD Operations for Habits**  
🔹 Create endpoints: POST / GET / PUT / DELETE habits  
🔹 Connect frontend forms to API  
🔹 Test with Postman + frontend

**Day 10: Streak & Progress Logic**  
🔹 Add logic to mark habits as completed  
🔹 Track and store streaks  
🔹 Show real-time habit updates on UI  

---

### **Week 3: Progress Visualization & User Experience (Days 11–15)**

**Day 11-12: Charts & Milestones**  
🔹 Use Recharts or Chart.js for habit trends  
🔹 Show 3/7/30-day milestone badges  
🔹 Add calendar-style habit tracking  

**Day 13: Profile & Summary**  
🔹 Build User Profile page (update info, avatar)  
🔹 Display habit summary & weekly stats  

**Day 14: Dashboard Enhancements**  
🔹 Improve streak UI, add progress percentages  
🔹 Highlight daily completion status  

**Day 15: Mid-Project Integration Testing**  
🔹 Test frontend–backend flow  
🔹 Validate streaks, updates, and profile data  

---

### **Week 4: Reminders, Engagement & Social Features (Days 16–20)**

**Day 16-17: Reminders System**  
🔹 Integrate Firebase or OneSignal for push notifications  
🔹 Set up Nodemailer for daily/weekly email reminders  

**Day 18-19: Social Features & Leaderboard**  
🔹 Implement social sharing for streaks/progress  
🔹 Create leaderboard based on longest streaks  
🔹 Basic friend challenge or community challenge system  

**Day 20: Security & Authentication Enhancements**  
🔹 Ensure secure JWT handling  
🔹 Review registration/login flow for usability  
🔹 Validate data protection (e.g., no password leaks)

---

### **Week 5: Testing, Deployment & Launch (Days 21–30)**

**Day 21-22: UI/UX Polishing**  
🔹 Add animations/transitions for interactions  
🔹 Ensure full mobile responsiveness  
🔹 Test across different browsers/devices  

**Day 23-24: User Testing & Bug Fixes**  
🔹 Conduct real-user testing (UAT)  
🔹 Gather feedback and fix usability bugs  

**Day 25: Full App Testing**  
🔹 Test complete user journey (Sign up → Create → Track → Share)  
🔹 Verify API response and edge case handling  

**Day 26-27: Deployment Setup**  
🔹 Deploy frontend to Vercel/Netlify  
🔹 Deploy backend to Render/Heroku  
🔹 Connect MongoDB Atlas in production  

**Day 28: Final QA on Live Version**  
🔹 Test deployed version end-to-end  
🔹 Fix any deployment-specific issues  

**Day 29: Documentation & Cleanup**  
🔹 Write a clean, professional README  
🔹 Create API documentation and setup guide  
🔹 Remove unused assets/files

**Day 30: 🚀 Launch & Feedback**  
🔹 Launch to beta users or public  
🔹 Collect feedback, monitor performance  
🔹 Create a roadmap for v2 or additional features  

---
