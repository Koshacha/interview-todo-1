import React, { useState } from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTask,
  removeTask,
  toggleTaskStatus,
  selectTasks,
} from './todoSlice';
import { TodoTask } from './TodoTask';

type ListStatus = 'ALL' | 'COMPLETED' | 'UNCOMPLETED';

type StateButton = {
  text: string,
  code: ListStatus,
  style: string,
};

export function Todo() {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');
  const [currentList, setCurrentList] = useState<ListStatus>('ALL');

  const newTaskText = text.trim();

  const buttonClasses = "py-2 px-4 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700";
  const activeButtonClasses = "text-blue-700 bg-blue-100";

  const buttons: StateButton[] = [
    {
      text: 'Все',
      code: 'ALL',
      style: "rounded-l-lg border"
    },
    {
      text: 'Выполненные',
      code: 'COMPLETED',
      style: "border-t border-b"
    },
    {
      text: 'Текущие',
      code: 'UNCOMPLETED',
      style: "rounded-r-md border"
    },
  ];

  return (
    <div className="w-full h-screen bg-slate-300 flex items-center justify-center font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-black text-2xl font-semibold">Todo List</h1>
          <div className="flex mt-4 items-center">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-slate-700" placeholder="Добавить задачу" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="flex items-center w-8 h-8 p-2 text-2xl font-bold border-2 rounded-full text-white border-blue-500 bg-blue-500 hover:text-blue-500 hover:bg-white" onClick={() => {
              if(newTaskText.length > 0) {
                dispatch(addTask(newTaskText));
                setText('');
              }
            }}>↓</button>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-md shadow-sm my-4" role="group">
          {
            buttons.map(o => (
              <button key={o.code} type="button" className={cn(buttonClasses, o.style, {
                [activeButtonClasses]: currentList === o.code
              })} onClick={() => setCurrentList(o.code)}>
                {o.text}
              </button>
            ))
          }
        </div>
        <div>
          {
            tasks
            .filter(o => {
              switch(currentList) {
                case 'COMPLETED': return o.completed === true;
                case 'UNCOMPLETED': return o.completed === false;
                default: return true;
              }
            })
            .map(o => (
              <TodoTask 
                key={o.id}
                id={o.id}
                text={o.text}
                completed={o.completed}
                onClick={() => dispatch(removeTask(o.id))}
                onToggle={() => dispatch(toggleTaskStatus(o.id))}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
