'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log('Stored tasks:', storedTasks);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (e) {
      }
    }
  }, []);

  useEffect(() => {
    const tasksString = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksString);
  }, [tasks]);

  const handleAddTask = () => {
    if (taskText.trim()) {
      const task = {
        id: new Date().getTime(),
        text: taskText,
        completed: false,
      };
      setTasks((existingTasks) => existingTasks.concat(task));
      setTaskText('');
      console.info('Task added:', task);
    }
  };

  const handleToggleTask = (id) => {
    setTasks((tasksList) => 
      tasksList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((taskArray) => taskArray.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList tasks={tasks} filter={filter} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.filter((task) => !task.completed).length} items left</span>
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>
              All
            </button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>
              Active
            </button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>
              Completed
            </button>
          </div>
          <button
            onClick={() => setTasks(tasks.filter((task) => !task.completed))}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}



