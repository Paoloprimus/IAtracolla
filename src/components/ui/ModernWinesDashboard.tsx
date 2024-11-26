'use client';

import React, { useState } from 'react';

interface WineItem {
  name: string;
  image: string;
  description: string;
  producer: string;
  contactInfo: string;
}

interface WineCategory {
  id: string;
  title: string;
  icon: string;
  items: WineItem[];
}

const ModernWinesDashboard = ({ onSelectWine }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const wineCategories: WineCategory[] = [
    {
      id: 'tech',
      title: 'Vini Tecnologici',
      icon: "🍷",
      items: [
        { name: 'Viticoltura di precisione con AI e droni', image: 'url1', description: 'Tecniche innovative per monitorare il vigneto.', producer: 'Cantina Tech', contactInfo: 'info@cantinatech.com' },
        { name: 'Fermentazione con lieviti selezionati', image: 'url2', description: 'Processo di fermentazione avanzato.', producer: 'Cantina Bio', contactInfo: 'info@cantinabio.com' },
        { name: 'Progetti sperimentali idroponici', image: 'url3', description: 'Tecniche innovative per monitorare il vigneto.', producer: 'Cantina Tech', contactInfo: 'info@cantinatech.com' },
        { name: 'Monitoraggio digitale della vinificazione', image: 'url4', description: 'Processo di fermentazione avanzato.', producer: 'Cantina Bio', contactInfo: 'info@cantinabio.com' }

        // 'Viticoltura di precisione con AI e droni',
        // 'Fermentazione con lieviti selezionati',
        // 'Progetti sperimentali idroponici',
        // 'Monitoraggio digitale della vinificazione'  
    ]
    },
    {
      id: 'dealc',
      title: 'Dealcolizzati e Low-Alcohol',
      icon: "🍇",
      items: [
        { name: 'Zero alcol', image: 'url3', description: 'Vino senza alcol.', producer: 'Cantina Zero', contactInfo: 'info@cantinazero.com' }
      ]
    },
    {
      id: 'sustainable',
      title: 'Vini Sostenibili',
      icon: "🌱",
      items: [
        { name: 'Biologici certificati', image: 'url4', description: 'Prodotto con metodi biologici.', producer: 'Cantina Verde', contactInfo: 'info@cantinaverde.com' }
      ]
    },
    {
        id: 'regions',
        title: 'Nuove Regioni',
        icon: "🌍",
        items: [
          'Vini nordici',
          'Vitivinicoltura d\'altura',
          'Nuove DOC emergenti',
          'Vini tropicali'
        ]
      },
      {
        id: 'climate',
        title: 'Adattati al Clima',
        icon: "🌡️",
        items: [
          'Vitigni resistenti alla siccità',
          'Varietà PIWI',
          'Vigneti urbani',
          'Vigneti verticali'
        ]
      },
      {
        id: 'trending',
        title: 'Tendenze',
        icon: "📊",
        items: [
          'Orange wines',
          'Pet Nat',
          'Co-fermentazioni innovative',
          'Packaging alternativo'
        ]
      },
      // Nuove card aggiuntive
      {
        id: 'addWine',
        title: 'Aggiungi Vino',
        icon: "➕",
        items: [
          'Proponi nuovi vini da aggiungere alla lista.'
        ]
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: "💬",
        items: [
          'Entra nella chat dedicata e moderata dall’AI.'
        ]
      },
      {
        id: 'contacts',
        title: 'Contatti',
        icon: "📞",
        items: [
          'Trova modi per contattarci o lasciare feedback.'
        ]
      }
    // Aggiungere ulteriori categorie e vini secondo necessità
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-center">🍷🫦🍾🎅🏾 🥂✌️</h1>
        <h1 className="text-2xl font-bold text-center">cheeky.vin</h1>
        <h1 className="text-lg font-bold text-center">XXI century vins</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wineCategories.map((category) => (
          <div 
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg
              ${expandedCategory === category.id ? 'ring-2 ring-purple-500' : ''} bg-white rounded-lg p-4`}
            onClick={() => toggleCategory(category.id)}
          >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-lg font-bold flex items-center gap-2">
                <span>{category.icon}</span>
                {category.title}
              </div>
              <span className="w-4 h-4">
                {expandedCategory === category.id ? "➖" : "➕"}
              </span>
            </div>
            <div>
              {expandedCategory === category.id ? (
                <ul className="list-disc list-inside space-y-2">
                  {category.items.map((item, index) => (
                    <li 
                      key={index} 
                      className="text-sm text-gray-600 cursor-pointer"
                      onClick={() => onSelectWine(item)}  // Gestione selezione vino
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  Clicca per vedere i dettagli...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernWinesDashboard;
