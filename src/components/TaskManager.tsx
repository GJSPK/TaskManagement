// src/components/TaskManager.tsx

import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { Category } from '../models/Category';
import {
  getTasks,
  saveTasks,
  getCategories,
  saveCategories,
} from '../utils/localStorageUtil';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Filter from './Filter';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [initialized, setInitialized] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);

    const storedCategories = getCategories();
    if (storedCategories.length === 0) {
      const defaultCategories = [
        { id: 1, name: 'Work' },
        { id: 2, name: 'Personal' },
        { id: 3, name: 'Urgent' },
      ];
      setCategories(defaultCategories);
      saveCategories(defaultCategories);
    } else {
      setCategories(storedCategories);
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveTasks(tasks);
    }
  }, [tasks, initialized]);

  useEffect(() => {
    if (initialized) {
      saveCategories(categories);
    }
  }, [categories, initialized]);

  // Task CRUD operations
  const addTask = (task: Task) => setTasks([...tasks, task]);

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filtering tasks
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === 'all'
        ? true
        : statusFilter === 'complete'
        ? task.isComplete
        : !task.isComplete;
    const categoryMatch =
      categoryFilter === 'all' ? true : task.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  return (
    <Box mt={4}>
      <Button variant="contained" color="secondary" onClick={() => navigate('/categories')}>
        Manage Categories
      </Button>
      <Box mt={2}>
        <TaskForm categories={categories} addTask={addTask} />
      </Box>
      <Box mt={2}>
        <Filter
          categories={categories}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </Box>
      <Box mt={2}>
        <TaskList
          tasks={filteredTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          categories={categories}
        />
      </Box>
    </Box>
  );
};

export default TaskManager;
