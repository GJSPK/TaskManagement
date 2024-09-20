// src/components/TaskForm.tsx

import React, { useState } from 'react';
import { Task } from '../models/Task';
import { Category } from '../models/Category';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface TaskFormProps {
  categories: Category[];
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ categories, addTask }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form Validation
    if (description.trim() === '') {
      alert('Task Description must not be empty.');
      return;
    }
    if (description.length > 100) {
      alert('Task Description must be less than 100 characters.');
      return;
    }
    if (!dueDate) {
      alert('Please select a due date.');
      return;
    }
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    selectedDate.setHours(0, 0, 0, 0); // Set selected date time to midnight
  
    if (selectedDate < today) {
      alert('Due Date must not be in the past.');
      return;
    }
    if (!category) {
      alert('Please select a category.');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      description,
      dueDate,
      category,
      isComplete: false,
      subtasks: [],
    };

    addTask(newTask);
    setDescription('');
    setDueDate('');
    setCategory('');
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              inputProps={{ maxLength: 100 }}
              margin="normal"
            />
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TaskForm;
