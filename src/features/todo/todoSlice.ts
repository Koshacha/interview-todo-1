import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const { tasks } = state;
      const id = Math.max(0, ...tasks.map(o => o.id)) + 1;
      state.tasks = [...tasks, {
        id,
        text: action.payload,
        completed: false
      }];
    },
    removeTask: (state, action: PayloadAction<number>) => {
      const { tasks } = state;
      state.tasks = tasks.filter(o => o.id != action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const { tasks } = state;
      state.tasks = tasks.map(o => {
        if (o.id !== action.payload) return o;
        return {...o, completed: !o.completed}
      });
    },
  }
});

export const { addTask, removeTask, toggleTaskStatus } = todoSlice.actions;

export const selectTasks = (state: RootState) => state.todo.tasks;

export default todoSlice.reducer;
