import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Sun, Moon, CloudRain } from 'lucide-react';

const motivationalQuotes = [
  "Todo dia é um novo começo. Respire fundo e recomece.",
  "Você é mais forte que imagina e mais corajoso do que acredita.",
  "Pequenos passos à frente ainda são passos na direção correta.",
  "Sua saúde mental é uma prioridade. Sua felicidade importa.",
  "Seja paciente com você mesmo. Você está fazendo o melhor que pode."
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sua jornada de bem-estar</h2>
          <p className="text-gray-600 mb-4">
          Acompanhe seu humor e receba recomendações personalizadas para melhorar seu bem-estar mental.
          </p>
          <button
            onClick={() => navigate('/mood-check')}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Faça o check-in agora.
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Atividades recentes</h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Sun className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Meditação matinal</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Moon className="h-5 w-5 mr-2 text-blue-500" />
              <span>Reflexão noturna</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CloudRain className="h-5 w-5 mr-2 text-gray-500" />
              <span>Exercícios de respiração.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}