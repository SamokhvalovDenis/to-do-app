import React, { useState } from 'react';
import { ToDoList } from '../models/ToDoList';
import { Task } from '../models/Task';
import { TaskItem } from './TaskItem';

type Props = {
  list: ToDoList;
  onDelete: (id: string) => void;
  onUpdate: (updatedList: ToDoList) => void;
};

export const ToDoListItem: React.FC<Props> = ({ list, onDelete, onUpdate }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditingListTitle, setIsEditingListTitle] = useState(false);
  const [editedListTitle, setEditedListTitle] = useState(list.title);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newList = new ToDoList(list.id, list.title);
    newList.tasks = [...list.tasks];
    newList.addTask(new Task(crypto.randomUUID(), newTitle, newDesc));
    onUpdate(newList);
    setNewTitle('');
    setNewDesc('');
  };

  const handleToggle = (id: string) => {
    const newList = new ToDoList(list.id, list.title);
    newList.tasks = [...list.tasks];
    newList.toggleTask(id);
    onUpdate(newList);
  };

  const handleDeleteTask = (id: string) => {
    const newList = new ToDoList(list.id, list.title);
    newList.tasks = [...list.tasks];
    newList.deleteTask(id);
    onUpdate(newList);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(new Task(task.id, task.title, task.description, task.completed));
  };

  const handleSaveEdit = () => {
    if (editingTask) {
      const newList = new ToDoList(list.id, list.title);
      newList.tasks = [...list.tasks];
      newList.updateTask(editingTask);
      onUpdate(newList);
      setEditingTask(null);
    }
  };

  const handleEditListTitle = () => {
    setIsEditingListTitle(true);
  };

  const handleSaveListTitle = () => {
    if (editedListTitle.trim()) {
      const newList = new ToDoList(list.id, editedListTitle);
      newList.tasks = [...list.tasks];
      onUpdate(newList);
    }
    setIsEditingListTitle(false);
  };

  const handleCancelEditListTitle = () => {
    setEditedListTitle(list.title);
    setIsEditingListTitle(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {isEditingListTitle ? (
          <div className="flex gap-2 items-center">
            <input
              value={editedListTitle}
              onChange={e => setEditedListTitle(e.target.value)}
              className="p-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
            />
            <button
              onClick={handleSaveListTitle}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Зберегти
            </button>
            <button
              onClick={handleCancelEditListTitle}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Скасувати
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-indigo-900">{list.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={handleEditListTitle}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                Редагувати
              </button>
              <button
                onClick={() => onDelete(list.id)}
                className="text-red-600 text-3xl font-bold hover:text-red-800 transition"
                aria-label="Видалити список"
              >
                ×
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mb-6 max-w-xl mx-auto">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Назва завдання"
          className="w-full mb-3 p-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
        />
        <input
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
          placeholder="Опис"
          className="w-full mb-3 p-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
        />
        <button
          onClick={handleAdd}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Додати завдання
        </button>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        {list.tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {editingTask && (
        <div className="mt-8 p-6 max-w-xl mx-auto border-2 border-indigo-400 rounded-lg bg-indigo-50">
          <input
            value={editingTask.title}
            onChange={e =>
              setEditingTask(
                new Task(editingTask.id, e.target.value, editingTask.description, editingTask.completed)
              )
            }
            className="w-full mb-4 p-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
          />
          <input
            value={editingTask.description}
            onChange={e =>
              setEditingTask(
                new Task(editingTask.id, editingTask.title, e.target.value, editingTask.completed)
              )
            }
            className="w-full mb-4 p-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
            >
              Зберегти
            </button>
            <button
              onClick={() => setEditingTask(null)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
            >
              Скасувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
};