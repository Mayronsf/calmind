import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Heart, Sun, Moon, CloudRain } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MoodCheck from './pages/MoodCheck';
import MoodDashboard from './components/MoodDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mood-check" element={<MoodCheck />} />
          <Route path="/mood-dashboard" element={<MoodDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;