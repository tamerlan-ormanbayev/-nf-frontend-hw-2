import Image from 'next/image';

import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
      <div className="flex items-center">
        <button
          className="w-6 h-6 my-auto mr-6"
          onClick={() => onToggle(task.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-circle ${
              task.completed ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </button>
        <span
          className={`ml-2 ${
            task.completed ? 'line-through text-gray-500' : 'text-white'
          }`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
};

export default TaskItem;

