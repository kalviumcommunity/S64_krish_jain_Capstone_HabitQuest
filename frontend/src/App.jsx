import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => (
  <BrowserRouter>
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-6">
          <Routes>
            <Route path="/" />
          </Routes>
        </div>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
