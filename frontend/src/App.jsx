import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import LoginPage from "./pages/loginpage";
import SignUpPage from "./pages/signuppage";
import DashboardPage from "./pages/dashboardpage";
import LeaderboardPage from "./pages/LeaderboardPage";
import SettingsPage from "./pages/SettingsPage";
import FriendsManagement from "./components/FriendsManagement";

const App = () => (
  <BrowserRouter>
    <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/notifications" element={<SettingsPage />} />
            <Route path="/settings/account" element={<SettingsPage />} />
            <Route path="/friends" element={<FriendsManagement />} />
            
          </Routes>
  </BrowserRouter>
);

export default App;
