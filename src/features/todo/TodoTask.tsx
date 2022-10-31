import React from 'react';
import cn from 'classnames';

interface ITodoTaskProps {
  id: number;
  text: string;
  completed: boolean;
  onClick: () => void;
  onToggle: () => void;
}

export function TodoTask({id, text, completed, onClick, onToggle}: ITodoTaskProps) {
  return (
    <div className="flex mb-4 items-center">
      <div className="flex items-center mr-4 w-full">
        <label className={cn("flex items-center w-full text-sm text-slate-700", {
          'line-through text-slate-500': completed
        })}>
          <input type="checkbox" checked={completed} onChange={onToggle} className="w-4 h-4 mr-3 text-teal-600 bg-gray-100 rounded border-gray-300 focus:ring-teal-500 focus:ring-2" />
          {text}
        </label>
      </div>
      <button className="ml-2 px-1.5 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500" onClick={onClick} >&times;</button>
    </div>
  );
}
