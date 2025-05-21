import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Frown, Meh, Heart, Sun, Coffee, Book, Music, Wallet as Walk } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

const moodActivities = {
  happy: [
    { icon: Sun, text: "Pratique o diário de gratidão", description: "Escreva 3 coisas pelas quais você é grato" },
    { icon: Heart, text: "Espalhe positividade", description: "Entre em contato com um amigo ou familiar" },
    { icon: Music, text: "Crie uma playlist feliz", description: "Ouça músicas animadas" }
  ],
  sad: [
    { icon: Walk, text: "Faça uma caminhada na natureza", description: "Passe 15 minutos ao ar livre" },
    { icon: Coffee, text: "Pratique autocuidado", description: "Prepare sua bebida quente favorita" },
    { icon: Book, text: "Leia algo inspirador", description: "Escolha um livro ou artigo inspirador" }
  ],
  neutral: [
    { icon: Sun, text: "Respiração consciente", description: "5 minutos de respiração profunda" },
    { icon: Walk, text: "Exercício leve", description: "10 minutos de alongamento" },
    { icon: Music, text: "Ouça música relaxante", description: "Crie uma atmosfera tranquila" }
  ]
};

const moodLevels = {
  happy: 5,
  neutral: 3,
  sad: 1
};

export default function MoodCheck() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');
  const [showActivities, setShowActivities] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (!session) {
          navigate('/login');
          return;
        }
        setUser(session.user);
      } catch (error: any) {
        console.error('Erro ao obter sessão:', error);
        setError(error.message);
      }
    };
    getUser();
  }, [navigate]);

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    setShowActivities(true);
  };

  const saveMoodEntry = async () => {
    if (!user) {
      setError('Você precisa estar logado para salvar seu humor.');
      navigate('/login');
      return;
    }

    setIsSaving(true);
    setError(null);
    
    try {
      console.log('Tentando salvar entrada com:', {
        user_id: user.id,
        mood_level: moodLevels[selectedMood as keyof typeof moodLevels],
        notes: notes
      });

      const { data, error: insertError } = await supabase
        .from('mood_entries')
        .insert([
          {
            user_id: user.id,
            mood_level: moodLevels[selectedMood as keyof typeof moodLevels],
            notes: notes,
          },
        ])
        .select();

      if (insertError) {
        console.error('Erro detalhado do Supabase:', insertError);
        throw insertError;
      }

      console.log('Entrada salva com sucesso:', data);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro completo ao salvar entrada de humor:', error);
      setError(`Erro ao salvar: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!showActivities ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Como você está se sentindo hoje?</h2>
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => handleMoodSelection('happy')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Smile className="h-16 w-16 text-yellow-500" />
              <span className="mt-2 text-gray-700">Feliz</span>
            </button>
            <button
              onClick={() => handleMoodSelection('neutral')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Meh className="h-16 w-16 text-gray-500" />
              <span className="mt-2 text-gray-700">Neutro</span>
            </button>
            <button
              onClick={() => handleMoodSelection('sad')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Frown className="h-16 w-16 text-blue-500" />
              <span className="mt-2 text-gray-700">Triste</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Atividades Recomendadas para Você
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Adicionar Notas (Opcional)</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como você está se sentindo? O que está pensando?"
              className="w-full p-3 border rounded-md mb-4"
              rows={4}
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowActivities(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                disabled={isSaving}
              >
                Voltar
              </button>
              <button
                onClick={saveMoodEntry}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
                disabled={isSaving}
              >
                {isSaving ? 'Salvando...' : 'Salvar e Continuar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}