// src/components/WineCard.tsx

'use client';

import React from 'react';

interface WineCardProps {
  name: string;
  description: string;
  producer: string;
  contactInfo: string;
}

const WineCard: React.FC<WineCardProps> = ({ name, description, producer, contactInfo }) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white p-6">
      <div className="py-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{name}</h2>
      </div>
      
      <p className="text-gray-700 text-base mb-4">
        {description}
      </p>
      
      <div className="py-2">
        <h3 className="text-lg font-semibold text-gray-800">Produttore:</h3>
        <p className="text-gray-700">{producer}</p>
      </div>

      <div className="py-2">
        <h3 className="text-lg font-semibold text-gray-800">Contatti:</h3>
        <p className="text-gray-700">{contactInfo}</p>
      </div>
    </div>
  );
};

export default WineCard;
