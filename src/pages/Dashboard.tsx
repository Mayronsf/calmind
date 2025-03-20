import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Sun, Moon, CloudRain } from 'lucide-react';

const motivationalQuotes = [
  "Every day is a new beginning. Take a deep breath and start again.",
  "You are stronger than you know, braver than you believe.",
  "Small steps forward are still steps in the right direction.",
  "Your mental health is a priority. Your happiness matters.",
  "Be patient with yourself. You're doing the best you can."
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
    };
    getUser();

    // Set random motivational quote
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-xl text-gray-800 text-center italic">"{quote}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wellness Journey</h2>
          <p className="text-gray-600 mb-4">
            Track your mood and get personalized recommendations to improve your mental well-being.
          </p>
          <button
            onClick={() => navigate('/mood-check')}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Check In Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Sun className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Morning meditation</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Moon className="h-5 w-5 mr-2 text-blue-500" />
              <span>Evening reflection</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CloudRain className="h-5 w-5 mr-2 text-gray-500" />
              <span>Breathing exercises</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}