// src/models/Task.ts

export interface Subtask {
    id: number;
    description: string;
    isComplete: boolean;
  }
  
  export interface Task {
    id: number;
    description: string;
    dueDate: string; // We'll store dates as strings for simplicity
    category: string;
    isComplete: boolean;
    subtasks: Subtask[];
  }
  