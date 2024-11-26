"use client";

import { useState } from 'react';
import ModernWinesDashboard from '@/components/ui/ModernWinesDashboard';
import Image from 'next/image';

interface Wine {
  id: number;
  name: string;
  image: string;
  description: string;
  producer: string;
}

export default function Home() {
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);

  const handleSelectWine = (wine: Wine) => {
    setSelectedWine(wine);
  };

  return (
    <div className="min-h-screen p-8 sm:p-20">
      {selectedWine === null ? (
        <ModernWinesDashboard onSelectWine={handleSelectWine} />
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <Image 
            src={selectedWine.image || "/default-image.jpg"} // Fallback per immagine
            alt={selectedWine.name || "Nome non disponibile"}
            width={300}
            height={200}
            className="mb-4"
          />
          <h3 className="text-2xl font-bold">{selectedWine.name || "Nome non disponibile"}</h3>
          <p>{selectedWine.description || "Descrizione non disponibile"}</p>
          <p className="mt-2 text-gray-600">
            Produttore: {selectedWine.producer || "Informazione non disponibile"}
          </p>
        </div>
      )}
    </div>
  );
}
