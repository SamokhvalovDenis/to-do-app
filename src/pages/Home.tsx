import React, { useState } from 'react';
import { ToDoList } from '../models/ToDoList';
import { ToDoListItem } from '../components/ToDoListItem';

export const Home: React.FC = () => {
  const [lists, setLists] = useState<ToDoList[]>([]);
  const [title, setTitle] = useState('');

  const handleAddList = () => {
    if (!title.trim()) return;
    setLists([...lists, new ToDoList(crypto.randomUUID(), title)]);
    setTitle('');
  };

  const handleDeleteList = (id: string) => {
    setLists(lists.filter(l => l.id !== id));
  };

  const handleUpdateList = (updatedList: ToDoList) => {
    setLists(lists.map(l => (l.id === updatedList.id ? updatedList : l)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 p-8">
      <h1 className="text-5xl font-extrabold mb-10 text-white text-center drop-shadow-lg">
        ToDo Додаток
      </h1>

      <div className="mb-10 max-w-lg mx-auto flex gap-3">
        <input
          type="text"
          placeholder="Назва списку"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddList()}
          className="flex-grow p-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
        />
        <button
          onClick={handleAddList}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 rounded-lg font-semibold shadow-lg transition"
        >
          Додати список
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {lists.map((list) => (
          <ToDoListItem
            key={list.id}
            list={list}
            onDelete={handleDeleteList}
            onUpdate={handleUpdateList}
          />
        ))}
      </div>
    </div>
  );
};