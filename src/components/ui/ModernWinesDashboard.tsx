"use client";

import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  url: string;
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

const Dashboard: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const [showAddItemForm, setShowAddItemForm] = useState<string | null>(null); // Gestisce la visibilità del modulo di aggiunta
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'scrivere',
      title: 'Scrivere',
      icon: "🤖",
      subcategories: [
        {
          id: 'per-scrivere',
          title: 'Per scrivere',
          items: [
            { id: 1, name: 'ChatGpt-LLM fondazionale', url: 'https://chat.openai.com' },
          ],
        },
        {
          id: 'per-migliorare',
          title: 'Per migliorare la scrittura',
          items: [
            { id: 2, name: 'Grammarly-Strumenti di scrittura avanzati.', url: 'https://www.grammarly.com' },
          ],
        },
      ],
    },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === categoryId ? null : categoryId));
    setExpandedSubcategory(null);
    setShowAddItemForm(null); // Chiude il form se si cambia categoria
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategory((prevSubcategory) => (prevSubcategory === subcategoryId ? null : subcategoryId));
    setShowAddItemForm(null); // Chiude il form se si cambia sottocategoria
  };

  const toggleAddItemForm = (subcategoryId: string) => {
    setShowAddItemForm((prevForm) => (prevForm === subcategoryId ? null : subcategoryId));
  };

  const addItem = () => {
    if (!newItemName || !newItemUrl || !showAddItemForm) return;

    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        subcategories: category.subcategories.map((subcategory) => {
          if (subcategory.id === showAddItemForm) {
            return {
              ...subcategory,
              items: [
                ...subcategory.items,
                { id: Date.now(), name: newItemName, url: newItemUrl },
              ],
            };
          }
          return subcategory;
        }),
      }))
    );

    setNewItemName('');
    setNewItemUrl('');
    setShowAddItemForm(null);
  };

  const deleteItem = (subcategoryId: string, itemId: number) => {
    const confirmed = window.confirm("Sei sicuro di voler rimuovere questo elemento?");
    if (!confirmed) return;

    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        subcategories: category.subcategories.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
            return {
              ...subcategory,
              items: subcategory.items.filter((item) => item.id !== itemId),
            };
          }
          return subcategory;
        }),
      }))
    );
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-center">🤖📚🌱</h1>
        <h1 className="text-2xl font-bold text-center">L'IA tascabile</h1>
        <h1 className="text-lg font-bold text-center">Rubrica a tracolla</h1>
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
                        className="font-sm text-gray-800 cursor-pointer flex items-center justify-between"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubcategory(subcategory.id);
                        }}
                      >
                        <span>{subcategory.title}</span>
                        <span className="ml-2">
                          {expandedSubcategory === subcategory.id ? "➖" : "➕"}
                        </span>
                      </div>
                      {expandedSubcategory === subcategory.id && (
                        <>
                          <ul className="ml-4 space-y-2">
                            {subcategory.items.map((item) => (
                              <li
                                key={item.id}
                                className="text-sm text-gray-600 cursor-pointer flex justify-between"
                              >
                                <a
                                  href={item.url}
                                  className="font-bold text-blue-500 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.name}
                                </a>
                                <button
                                  className="text-red-500 hover:underline ml-4"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteItem(subcategory.id, item.id);
                                  }}
                                >
                                  Rimuovi
                                </button>
                              </li>
                            ))}
                          </ul>
                          <div className="flex justify-end items-center mb-2">
                            <button
                              className="text-green-500 text-sm hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAddItemForm(subcategory.id);
                              }}
                            >
                              Aggiungi
                            </button>
                          </div>
                          {showAddItemForm === subcategory.id && (
                            <div
                              className="mt-4 p-4 border rounded bg-gray-100"
                              onClick={(e) => e.stopPropagation()} // Previene la chiusura
                            >
                              <h3 className="text-lg font-bold mb-2">Aggiungi un nuovo elemento</h3>
                              <input
                                type="text"
                                placeholder="Nome dell'item"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="border p-2 mb-2 w-full"
                              />
                              <input
                                type="text"
                                placeholder="URL dell'item"
                                value={newItemUrl}
                                onChange={(e) => setNewItemUrl(e.target.value)}
                                className="border p-2 mb-2 w-full"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Evita che il clic sul bottone chiuda la scheda
                                  addItem();
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                                Aggiungi
                              </button>
                            </div>
                          )}
                        </>
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
