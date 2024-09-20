// src/components/TaskItem.tsx

import React, { useState } from 'react';
import { Task, Subtask } from '../models/Task';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SubtaskForm from './SubtaskForm';
import SubtaskItem from './SubtaskItem';
import { Category } from '../models/Category';

interface TaskItemProps {
  task: Task;
  editTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  categories: Category[];
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  editTask,
  deleteTask,
  categories,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(task.description);
  const [dueDate, setDueDate] = useState<string>(task.dueDate);
  const [category, setCategory] = useState<string>(task.category);
  const [openSubtaskForm, setOpenSubtaskForm] = useState<boolean>(false);

  // Determine if the task is overdue or due today
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = task.dueDate < today && !task.isComplete;
  const isDueToday = task.dueDate === today && !task.isComplete;

  const handleCompleteChange = () => {
    if (!task.subtasks.every((subtask) => subtask.isComplete)) {
      alert('All subtasks must be completed before marking the task as complete.');
      return;
    }
    editTask({ ...task, isComplete: !task.isComplete });
  };

  const handleSave = () => {
    // Form Validation
    if (description.trim() === '') {
      alert('Task Description must not be empty.');
      return;
    }
    if (description.length > 100) {
      alert('Task Description must be less than 100 characters.');
      return;
    }
    const selectedDate = new Date(dueDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
      alert('Due Date must not be in the past.');
      return;
    }
    if (!category) {
      alert('Please select a category.');
      return;
    }

    editTask({ ...task, description, dueDate, category });
    setIsEditing(false);
  };

  // Subtask operations
  const addSubtask = (subtask: Subtask) => {
    editTask({ ...task, subtasks: [...task.subtasks, subtask] });
  };

  const editSubtask = (updatedSubtask: Subtask) => {
    const updatedSubtasks = task.subtasks.map((subtask) =>
      subtask.id === updatedSubtask.id ? updatedSubtask : subtask
    );
    editTask({ ...task, subtasks: updatedSubtasks });
  };

  const deleteSubtask = (subtaskId: number) => {
    const updatedSubtasks = task.subtasks.filter((subtask) => subtask.id !== subtaskId);
    editTask({ ...task, subtasks: updatedSubtasks });
  };

  return (
    <Card
      style={{
        marginBottom: '20px',
        backgroundColor: isOverdue
          ? '#ffcccc'
          : isDueToday
          ? '#fff0b3'
          : task.isComplete
          ? '#ccffcc'
          : 'white',
      }}
    >
      <CardContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={task.isComplete}
              onChange={handleCompleteChange}
              color="primary"
            />
          }
          label="Complete"
        />
        <Typography variant="h5">{task.description}</Typography>
        <Typography variant="body1">Due Date: {task.dueDate}</Typography>
        <Typography variant="body1">Category: {task.category}</Typography>
        <Button
          onClick={() => setIsEditing(true)}
          variant="contained"
          color="primary"
          style={{ marginRight: '10px' }}
        >
          Edit
        </Button>
        <Button
          onClick={() => deleteTask(task.id)}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
        <Button
          onClick={() => setOpenSubtaskForm(true)}
          variant="outlined"
          color="primary"
          style={{ marginLeft: '10px' }}
        >
          Add Subtask
        </Button>
        <List>
          {task.subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              editSubtask={editSubtask}
              deleteSubtask={deleteSubtask}
            />
          ))}
        </List>

        {/* Subtask Form Dialog */}
        <Dialog open={openSubtaskForm} onClose={() => setOpenSubtaskForm(false)}>
          <DialogTitle>Add Subtask</DialogTitle>
          <SubtaskForm
            addSubtask={(subtask) => {
              addSubtask(subtask);
              setOpenSubtaskForm(false);
            }}
          />
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <DialogTitle>Edit Task</DialogTitle>
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
              <Button onClick={() => setIsEditing(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
