import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MoodEntry {
  id: string;
  mood_level: number;
  notes: string;
  created_at: string;
}

export default function MoodDashboard() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const fetchMoodEntries = async () => {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching mood entries:', error);
      return;
    }

    setMoodEntries(data || []);
  };

  const addMoodEntry = async () => {
    const { error } = await supabase
      .from('mood_entries')
      .insert([
        {
          mood_level: currentMood,
          notes: notes,
        },
      ]);

    if (error) {
      console.error('Error adding mood entry:', error);
      return;
    }

    setNotes('');
    fetchMoodEntries();
  };

  const chartData = {
    labels: moodEntries.map(entry => new Date(entry.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Level',
        data: moodEntries.map(entry => entry.mood_level),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mood Tracker</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        <div className="flex items-center gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setCurrentMood(level)}
              className={`w-12 h-12 rounded-full ${
                currentMood === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add some notes about your mood..."
          className="w-full p-2 border rounded-md mb-4"
          rows={3}
        />
        
        <button
          onClick={addMoodEntry}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Mood Entry
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Mood History</h2>
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
} 