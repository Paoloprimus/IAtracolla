"use client";

import { useState } from 'react';
import ModernWinesDashboard from '@/components/ui/ModernWinesDashboard';
import WineCard from '@/components/WineCard';

// Definizione del tipo Wine
interface Wine {
  id: number;
  name: string;
  image: string;
  description: string;
  producer: string;
  contactInfo?: string; // Campo opzionale
}

export default function Home() {
  // Stato per il vino selezionato, con tipo Wine o null
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);

  // Funzione di gestione per la selezione di un vino
  const handleSelectWine = (wine: Wine) => {
    setSelectedWine(wine);
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Dashboard dei Vini */}
      {selectedWine === null ? (
        <ModernWinesDashboard onSelectWine={handleSelectWine} />
      ) : (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Scheda Vino</h2>
          <WineCard
            image={selectedWine.image}
            name={selectedWine.name}
            description={selectedWine.description}
            producer={selectedWine.producer}
            contactInfo={selectedWine.contactInfo}
          />
        </div>
      )}
    </div>
  );
}
