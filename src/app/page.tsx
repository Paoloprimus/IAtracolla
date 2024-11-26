"use client";

import { useState } from 'react';
import ModernWinesDashboard from '@/components/ui/ModernWinesDashboard';
import WineCard from '@/components/WineCard';

export default function Home() {
  const [selectedWine, setSelectedWine] = useState(null);

  // Funzione di gestione per la selezione di un vino
  const handleSelectWine = (wine) => {
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
