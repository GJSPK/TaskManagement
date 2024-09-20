// src/utils/localStorageUtil.ts

import { Task } from '../models/Task';
import { Category } from '../models/Category';

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getCategories = (): Category[] => {
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : [];
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};
