import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Frown, Meh, Heart, Sun, Coffee, Book, Music, Wallet as Walk } from 'lucide-react';

const moodActivities = {
  feliz: [
    { icon: Sun, text: "Pratique o diário de gratidão.", description: "Escreva 3 coisas pelas quais você é grato." },
    { icon: Heart, text: "Espalhe positividade.", description: "Entre em contato com um amigo ou um membro da família." },
    { icon: Music, text: "Crie uma playlist feliz.", description: "Ouça música animada e edificante." }
  ],
  triste: [
    { icon: Walk, text: "Faça uma caminhada na natureza.", description: "Passe 15 minutos ao ar livre." },
    { icon: Coffee, text: "Pratique o autocuidado.", description: "Prepare a sua bebida quente favorita." },
    { icon: Book, text: "Leia algo edificante e inspirador.", description: "Escolha um livro ou artigo inspirador ." }
  ],
  neutro: [
    { icon: Sun, text: "Respiração consciente", description: "5 minutos de respiração profunda." },
    { icon: Walk, text: "Exercício leve", description: "10 minutos de alongamentos" },
    { icon: Music, text: "Escute músicas relaxantes", description: "Crie uma atmosfera tranquila" }
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Como você está se sentindo hoje?</h2>
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => handleMoodSelection('feliz')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Smile className="h-16 w-16 text-yellow-500" />
              <span className="mt-2 text-gray-700">Feliz</span>
            </button>
            <button
              onClick={() => handleMoodSelection('neutro')}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-purple-50"
            >
              <Meh className="h-16 w-16 text-gray-500" />
              <span className="mt-2 text-gray-700">Neutro</span>
            </button>
            <button
              onClick={() => handleMoodSelection('triste')}
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
            Atividades recomendadas para você
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
              Faça o check-in novamente.
            </button>
          </div>
        </div>
      )}
    </div>
  );
}