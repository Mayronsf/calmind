import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Sun, Moon, CloudRain, TrendingUp } from 'lucide-react';
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
import { User } from '@supabase/supabase-js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const motivationalQuotes = [
  "Cada dia é um novo começo. Respire fundo e comece novamente.",
  "Você é mais forte do que imagina, mais corajoso do que acredita.",
  "Pequenos passos à frente ainda são passos na direção certa.",
  "Sua saúde mental é uma prioridade. Sua felicidade importa.",
  "Seja paciente consigo mesmo. Você está fazendo o melhor que pode."
];

interface MoodEntry {
  id: string;
  mood_level: number;
  notes: string;
  created_at: string;
}

interface MoodStats {
  average: number;
  highest: number;
  lowest: number;
  totalEntries: number;
  mostFrequent: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [quote, setQuote] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
      fetchMoodEntries();
    };
    getUser();

    // Set random motivational quote
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, [navigate]);

  const fetchMoodEntries = async () => {
    let query = supabase
      .from('mood_entries')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply time range filter
    if (timeRange === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      query = query.gte('created_at', oneWeekAgo.toISOString());
    } else if (timeRange === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      query = query.gte('created_at', oneMonthAgo.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar entradas de humor:', error);
      return;
    }

    setMoodEntries(data || []);
  };

  useEffect(() => {
    fetchMoodEntries();
  }, [timeRange]);

  const calculateMoodStats = (entries: MoodEntry[]): MoodStats => {
    if (entries.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        totalEntries: 0,
        mostFrequent: 0
      };
    }

    const levels = entries.map(entry => entry.mood_level);
    const sum = levels.reduce((a, b) => a + b, 0);
    const average = sum / entries.length;
    
    // Calculate most frequent mood
    const frequency: { [key: number]: number } = {};
    levels.forEach(level => {
      frequency[level] = (frequency[level] || 0) + 1;
    });
    const mostFrequent = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])[0][0];

    return {
      average: Number(average.toFixed(1)),
      highest: Math.max(...levels),
      lowest: Math.min(...levels),
      totalEntries: entries.length,
      mostFrequent: Number(mostFrequent)
    };
  };

  const stats = calculateMoodStats(moodEntries);

  const chartData = {
    labels: moodEntries.map(entry => new Date(entry.created_at).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Nível de Humor',
        data: moodEntries.map(entry => entry.mood_level).reverse(),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Sua Evolução de Humor',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
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

  const getMoodEmoji = (level: number) => {
    switch (level) {
      case 1: return '😢';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '😊';
      default: return '😐';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-xl text-gray-800 text-center italic">"{quote}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sua Jornada de Bem-estar</h2>
          <p className="text-gray-600 mb-4">
            Acompanhe seu humor e receba recomendações personalizadas para melhorar seu bem-estar mental.
          </p>
          <button
            onClick={() => navigate('/mood-check')}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Registrar Humor
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Estatísticas de Humor</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Média de Humor</p>
              <p className="text-2xl font-bold text-purple-600">{stats.average}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Total de Registros</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalEntries}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Humor Mais Alto</p>
              <p className="text-2xl font-bold text-purple-600">{getMoodEmoji(stats.highest)}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Mais Frequente</p>
              <p className="text-2xl font-bold text-purple-600">{getMoodEmoji(stats.mostFrequent)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Evolução do Humor</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded-md ${
                  timeRange === 'week'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded-md ${
                  timeRange === 'month'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Mês
              </button>
              <button
                onClick={() => setTimeRange('all')}
                className={`px-3 py-1 rounded-md ${
                  timeRange === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tudo
              </button>
            </div>
          </div>
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registros Recentes</h2>
          <div className="space-y-4">
            {moodEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{getMoodEmoji(entry.mood_level)}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-gray-600 text-sm">{entry.notes}</p>
                )}
              </div>
            ))}
            {moodEntries.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Nenhum registro de humor ainda. Comece a acompanhar seu humor!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}