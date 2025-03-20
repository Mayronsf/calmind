import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sun, Moon, CloudRain } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Welcome to <span className="text-purple-600">MentalWell</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600">
          Your companion in mental wellness. Track your mood, get personalized recommendations,
          and take care of your mental health.
        </p>
        <div className="mt-10">
          <Link
            to="/register"
            className="bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-purple-700"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <Heart className="h-12 w-12 text-purple-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">Track Your Mood</h3>
          <p className="mt-2 text-gray-600 text-center">
            Log your daily emotions and track your mental well-being over time.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <Sun className="h-12 w-12 text-yellow-500" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">Get Personalized Activities</h3>
          <p className="mt-2 text-gray-600 text-center">
            Receive tailored recommendations based on your mood and needs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <Moon className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">Daily Inspiration</h3>
          <p className="mt-2 text-gray-600 text-center">
            Start each day with motivational messages and mindful reminders.
          </p>
        </div>
      </div>
    </div>
  );
}