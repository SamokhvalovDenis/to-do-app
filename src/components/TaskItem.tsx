import React from 'react';
import { Task } from '../models/Task';

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete, onToggle }) => (
  <div
    className={`flex justify-between items-center p-4 rounded-lg shadow-md transition ${
      task.completed ? 'bg-green-200 text-green-900 line-through' : 'bg-white text-gray-900'
    }`}
  >
    <div className="flex items-center gap-3">
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p>{task.description}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(task)}
        className="text-blue-600 hover:text-blue-800 transition"
      >
        Редагувати
      </button>
      <button onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-800 transition">
        ×
      </button>
    </div>
  </div>
);