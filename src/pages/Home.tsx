import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sun, Moon, CloudRain } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Seja bem-vindo ao <span className="text-purple-600">MentalWell</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600">
          Sua companhia no bem-estar mental. Acompanhe seu humor, receba recomendações personalizadas 
          e cuide da sua saúde mental. 
        </p>
        <div className="mt-10">
          <Link
            to="/register"
            className="bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-purple-700"
          >
            Comece agora
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <Heart className="h-12 w-12 text-purple-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">Acompanhe o seu humor</h3>
          <p className="mt-2 text-gray-600 text-center">
            Registre suas emoções diárias e acompanhe seu bem-estar mental ao longo do tempo.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <Sun className="h-12 w-12 text-yellow-500" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">Receba atividades personalizadas</h3>
          <p className="mt-2 text-gray-600 text-center">
            Receba recomendações personalizadas com base no seu humor e nas suas necessidades.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <Moon className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">Inspiração diária</h3>
          <p className="mt-2 text-gray-600 text-center">
            Comece cada dia com mensagens motivacionais e lembretes de atenção plena.
          </p>
        </div>
      </div>
    </div>
  );
}