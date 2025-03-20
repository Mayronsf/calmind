import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Frown, Meh, Heart, Sun, Coffee, Book, Music, Wallet as Walk } from 'lucide-react';

const moodActivities = {
  happy: [
    { icon: Sun, text: "Practice gratitude journaling", description: "Write down 3 things you're grateful for" },
    { icon: Heart, text: "Spread positivity", description: "Reach out to a friend or family member" },
    { icon: Music, text: "Create a happy playlist", description: "Listen to uplifting music" }
  ],
  sad: [
    { icon: Walk, text: "Take a nature walk", description: "Spend 15 minutes outside" },
    { icon: Coffee, text: "Practice self-care", description: "Make your favorite warm drink" },
    { icon: Book, text: "Read something uplifting", description: "Choose an inspiring book or article" }
  ],
  neutral: [
    { icon: Sun, text: "Mindful breathing", description: "5 minutes of deep breathing" },
    { icon: Walk, text: "Light exercise", description: "10 minutes of stretching" },
    { icon: Music, text: "Listen to calming music", description: "Create a peaceful atmosphere" }
  ]
};

export default function MoodCheck() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');
  const [showActivities, setShowActivities] = useState(false);

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    setShowActivities(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!showActivities ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How are you feeling today?</h2>
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => handleMoodSelection('happy')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Smile className="h-16 w-16 text-yellow-500" />
              <span className="mt-2 text-gray-700">Happy</span>
            </button>
            <button
              onClick={() => handleMoodSelection('neutral')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Meh className="h-16 w-16 text-gray-500" />
              <span className="mt-2 text-gray-700">Neutral</span>
            </button>
            <button
              onClick={() => handleMoodSelection('sad')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Frown className="h-16 w-16 text-blue-500" />
              <span className="mt-2 text-gray-700">Sad</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Recommended Activities for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moodActivities[selectedMood as keyof typeof moodActivities].map((activity, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <activity.icon className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{activity.text}</h3>
                <p className="text-gray-600 text-center">{activity.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowActivities(false)}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
            >
              Check In Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}