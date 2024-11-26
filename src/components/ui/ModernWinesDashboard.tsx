'use client';

import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
  url: string; // Aggiunto campo URL
}

interface Subcategory {
  id: string;
  title: string;
  items: Item[];
}

interface Category {
  id: string;
  title: string;
  icon: string;
  subcategories: Subcategory[];
}

interface DashboardProps {
  onSelectItem: (item: Item) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectItem }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'scrivere',
      title: 'Scrivere',
      icon: "🤖",
      subcategories: [
        {
          id: 'per-scrivere',
          title: 'Per scrivere',
          items: [
            { id: 1, name: 'ChatGpt-LLM fondazionale', description: 'Per tutte le necessità testuali, sia creative che tecniche. Competenze in linguistica, narratologia e traduzione multilingue.', url: 'https://chat.openai.com' },
          ],
        },
        {
          id: 'per-migliorare',
          title: 'Per migliorare la scrittura',
          items: [
            { id: 2, name: 'Grammarly-Strumenti di scrittura avanzati.', url: 'https://www.grammarly.com' },
          ],
        },
        // Altre sottocategorie mantenute invariate
      ],
    },
    // Altre categorie mantenute invariate
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prevCategory => (prevCategory === categoryId ? null : categoryId));
    setExpandedSubcategory(null); // Mantieni chiuse tutte le sottocategorie
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategory(prevSubcategory => (prevSubcategory === subcategoryId ? null : subcategoryId));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-center">🤖📚🌱</h1>
        <h1 className="text-2xl font-bold text-center">L'IA a tracolla</h1>
        <h1 className="text-lg font-bold text-center">Liste da viaggio</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              expandedCategory === category.id ? 'ring-2 ring-purple-500' : ''
            } bg-white rounded-lg p-4`}
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
              {expandedCategory === category.id && (
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <div 
                        className="font-sm text-gray-800 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Previeni la chiusura della categoria principale
                          toggleSubcategory(subcategory.id);
                        }}
                      >
                        {subcategory.title}
                        <span className="ml-2">
                          {expandedSubcategory === subcategory.id ? "➖" : "➕"}
                        </span>
                      </div>
                      {expandedSubcategory === subcategory.id && (
                        <ul className="ml-4 space-y-2">
                          {subcategory.items.map((item) => (
                            <li 
                              key={item.id} 
                              className="text-sm text-gray-600 cursor-pointer"
                              onClick={() => onSelectItem(item)}
                            >
                              <a
                                href={item.url} // Utilizza l'URL dal dato
                                className="font-bold text-blue-500 hover:underline"
                                target="_blank" // Apri in una nuova scheda
                                rel="noopener noreferrer" // Migliora la sicurezza
                              >
                                {item.name}
                              </a>
                              <p>{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
