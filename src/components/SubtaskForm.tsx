// src/components/SubtaskForm.tsx

import React, { useState } from 'react';
import { Subtask } from '../models/Task';
import { TextField, Button } from '@mui/material';

interface SubtaskFormProps {
  addSubtask: (subtask: Subtask) => void;
}

const SubtaskForm: React.FC<SubtaskFormProps> = ({ addSubtask }) => {
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (description.trim() === '') {
      alert('Subtask Description must not be empty.');
      return;
    }

    const newSubtask: Subtask = {
      id: Date.now(),
      description,
      isComplete: false,
    };

    addSubtask(newSubtask);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Subtask Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="outlined" color="primary">
        Add Subtask
      </Button>
    </form>
  );
};

export default SubtaskForm;
